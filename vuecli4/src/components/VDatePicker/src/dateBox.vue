<template>
  <div id="vdatewrapper" ref="vdatewrapper" class="picker_wrapper" :class="dateType===4?'timepan':''" v-if="isShow" 
		:style="{top:offset.top+'px', left: offset.left+'px'}">
    <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
    <div class="picker_wrapper__header" >
      <div class="header__pre" @click="handlePreMonth">
				<i class="vkelico vk-prev"></i>
			</div>
      <div class="header__title">
				<a @click="dateType=1">
					{{Year}}-{{Month.toString().padStart(2,"0")}}-{{Day.toString().padStart(2,"0")}} 
				</a>
				<a v-if="datetype ==='datetime'" @click="dateType=4">
					{{Hour.toString().padStart(2,"0")}}:{{Minute.toString().padStart(2,"0")}}
				</a>
      </div>
      <div class="header__next" @click="handleNextMonth">
				<i class="vkelico vk-next"></i>
			</div>
    </div>

    <!-- 日历 -->
    <DatePanel v-show="dateType===1" :YMD="{Year,Month,Day}" @handleDay="handleDay"/>

    <!-- 时钟 -->
    <TimePanel v-show="dateType!==1&&datetype==='datetime'" @getHHmm="getHHmm" :HHMM="[Hour,Minute]"/>

    <!-- 确定 -->
    <div class="ymdhmsave" >
			<div class="ymdhm">
				<!-- <a @click="dateType=1">
					{{Year}}-{{Month.toString().padStart(2,"0")}}-{{Day.toString().padStart(2,"0")}}
				</a>
				<a v-if="datetype ==='datetime'" @click="dateType=4">
					{{Hour.toString().padStart(2,"0")}}:{{Minute.toString().padStart(2,"0")}}
				</a> -->
			</div>
			<div class="btm" > 
				<span @click="confirm(1)">确定</span>
			</div>
    </div>
  </div>
</template>

<script>
  import DatePanel from './datePanel'
	import TimePanel from './timePanel'
	import {GetTodaypicker_wrapperInPersian} from './calendar'
	export default {
		name: 'DateBox',
    props: {
      value: String,
			offset: Object,
			submit: Function,
			datetype:{
				type: String,
				default: 'datetime'
			}
    },
		data() {
			return {
				isShow:	false,
				Year: '',
				Month: '',
				Day: '',
				Hour:	'',
				Minute: '',
				dateType: 1,	/*dateType 1:年月日，2：年月，3：年，4：时-分，5：年月日时分*/
			};
		},
		created(){
			
		},
		mounted(){
			// 添加全局监听事件，实现点击 非时间日期控件 隐藏
			window.addEventListener('click',this.onContains,false)
		},

		methods: {
			// 全局监听事件，实现点击 非时间日期控件 隐藏
			onContains(e){
				if(!e)return
					let id = e.target.id;
					let el = this.$refs.vdatewrapper;
					if(id!=='date-input' && (el&&!el.contains(e.target))){
						this.hide()
				}
			},
			// 显示
			show(){
				this.isShow = true;
			},
			// 关闭
			hide(){
				window.removeEventListener('click',this.onContains,false);
				this.isShow = false;
			},
			// 初始化时间
			initData(val){
				let time = Date.parse(val);
				// if(this.lang == 'fa-IR'){
				// 	if(time){
				// 		let d = new Date(time);
				// 		this.Year = d.getFullYear();
				// 		this.Month = d.getMonth()+1;
				// 		this.Day = d.getDate();
				// 		this.Hour =	d.getHours();
				// 		this.Minute = d.getMinutes();
				// 	}else{
				// 		let {year,month,day,hour,minute,weekday} = GetTodaypicker_wrapperInPersian(time);
				// 		this.Year = year;
				// 		this.Month = month;
				// 		this.Day = day;
				// 		this.Hour =	hour;
				// 		this.Minute = minute;
				// 	}
				// } else {
					let d = time? new Date(time): new Date();
					this.Year = d.getFullYear();
					this.Month = d.getMonth()+1;
					this.Day = d.getDate();
					this.Hour =	d.getHours();
					this.Minute = d.getMinutes();
				// }
			},

			// 上一个月
			handlePreMonth() {
				if (this.Month === 1) {
					this.Year = this.Year - 1
					this.Month = 12
					// this.Day = 1
				} else {
					this.Month = this.Month - 1
					// this.Day = 1
				}
				this.confirm()
			},

			// 下一个月
			handleNextMonth() {
				if (this.Month === 12) {
					this.Year = this.Year + 1
					this.Month = 1
					// this.Day = 1
				} else {
					this.Month = this.Month + 1
					// this.Day = 1
				}
				this.confirm()
			},

			// 选择日
			handleDay(val) {
				this.Day = val;
				if(this.datetype === 'datetime'){
					this.dateType = 4;
					this.confirm()
				}else{
					this.Hour = 0;
					this.Minute = 0;
					this.confirm(1)
				}
				
			},

			// 选择时分
			getHHmm(val,type){
				this.Hour=val[0];
				this.Minute=val[1];
				this.dateType=type;
				this.confirm(type);
			},

			// 确定
			confirm(type){
				const {Year,Month,Day,Hour,Minute}=this;
				let value = Year + '-'
					+ Month.toString().padStart(2,"0") + '-'
					+ Day.toString().padStart(2,"0") + ' '
					+ Hour.toString().padStart(2,"0") + ':'
					+ Minute.toString().padStart(2,"0");
				this.dateType = type&&type===1? 1 : this.dateType;
				if(type === 1) this.isShow = false;
				this.submit(value)
			},
		},
		computed: {
			// lang() {
			// 	return this.$i18n.locale;
			// }
		},
		watch:{
			value: {
				handler(newval,oldval){
					this.initData(newval,oldval);
				},
				immediate: true
			},
			// lang(val) {
			// 	this.initData(this.value);
			// }
		},
		components:{
      DatePanel,
			TimePanel
		},
	};
</script>

<style lang="scss" scope>
	.picker_wrapper {
		// width: 326px;
		margin: 7px 0;
		position: fixed;
		z-index: 99999;
		color: #606266;
		border: 1px solid #e4e7ed;
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		background-color: #fff;
		// &.timepan{
		// 	width: 255px;
		// }
		.picker_wrapper__header {
			margin: 12px;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: space-between;
			line-height: 22px;

			.header__title {
				font-size: 16px;
				font-weight: 500;
				padding: 0 5px;
				line-height: 22px;
				text-align: center;
				cursor: pointer;
    		color: #606266;
			}

			.header__pre,.header__next {
				cursor: pointer;
			}
		}
		.ymdhmsave{
			width: 100%;
			height: 41px;
			border-top: 1px solid #bbb;
			line-height: 40px;
			display: flex;
			justify-content: space-around;
			.ymdhm{
				width: 70%;
				text-align: center;
				overflow: hidden;
				a {
					cursor: pointer;
					padding: 10px;
				}
			}
			
			.btm{
				width: 30%;
				text-align: center;
				overflow: hidden;
				span {
					cursor: pointer;
					display: inline-block;
					font-size: 12px;
					padding: 7px 15px;
					line-height: 1;
					text-align: center;
					border: 1px solid #DCDFE6;
					border-radius: 4px;
					color: #606266;
					background: #FFF;
					box-sizing: border-box;
					white-space: nowrap;
					outline: 0;
					&:hover {
						background: #FFF;
						border-color: #409EFF;
						color: #409EFF;
					}
				}
				
			}
		}
		.popper__arrow{
			position: absolute;
			top: -16px;
			left: 50px;
			&:after,&:before{
				position: absolute;
				content: '';
				border-top: 10px transparent dashed;
				border-left: 10px transparent dashed;
				border-right: 10px transparent dashed;
				border-bottom: 10px #fff solid;
			}
			&:before{
				border-bottom: 6px #e4e7ed solid;
			}
			&:after{
				top: 1px; /*覆盖并错开1px*/
				border-bottom: 6px #fff solid;
			}
		}
	}
</style>