<template>
  <div class="calendar" :class="dateType===4?'timepan':''" v-if="show" @mousedown="$emit('dateMD')" >
    <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
    <div class="calendar__header">
      <div class="header__pre" @click="handlePreMonth"></div>
      <div class="header__title">
				<a @click="dateType=1">
					{{Year}}-{{Month.toString().padStart(2,"0")}}-{{Day.toString().padStart(2,"0")}}
				</a>
				<a v-if="types ==='datetime'" @click="dateType=4">
					{{Hour.toString().padStart(2,"0")}}:{{Minute.toString().padStart(2,"0")}}
				</a>
      </div>
      <div class="header__next" @click="handleNextMonth"></div>
    </div>

    <!-- 日历 -->
    <DatePanel v-if="dateType===1" :YMD="{Year,Month,Day}" @handleDay="handleDay" v-bind="$attrs"/>

    <!-- 时钟 -->
    <TimePanel v-else-if="dateType!==1&&types==='datetime'" @getHHmm="getHHmm" :HHMM="[Hour,Minute]" v-bind="$attrs"/>

    <!-- 确定 -->
    <div class="ymdhmsave" >
			<div class="ymdhm">
				<!-- <a @click="dateType=1">
					{{Year}}-{{Month.toString().padStart(2,"0")}}-{{Day.toString().padStart(2,"0")}}
				</a>
				<a v-if="types ==='datetime'" @click="dateType=4">
					{{Hour.toString().padStart(2,"0")}}:{{Minute.toString().padStart(2,"0")}}
				</a> -->
			</div>
			<div class="btm" > 
				<span @click="mmClick(1)">确定</span>
			</div>
    </div>
  </div>
</template>

<script>
  import DatePanel from './datePanel'
	import TimePanel from './timePanel'
	export default {
		name: 'DateBox',
		inheritAttrs: false,
    props: {
      value: {
        type: String,
        default: ''
      },
			show:{
				type: Boolean,
			}
    },
		data() {
			return {
				calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
				Year: '',
				Month: '',
				Day: '',
				Hour:	'',
				Minute: '',
				dateType: 1,	/*dateType 1:年月日，2：年月，3：年，4：时-分，5：年月日时分*/
			};
		},
		mounted(){
		},

		methods: {
			// 初始化时间
			initData(val){
				let time = Date.parse(val);
				if(time) {
					let {Year,Month,Day,Hour,Minute} = this.timestampToTime(time)
					this.Year = Year;
					this.Month = Month;
					this.Day = Day;
					this.Hour = Hour;
					this.Minute = Minute;
				}else{
					const date = new Date();
					this.Year = date.getFullYear();
					this.Month = date.getMonth()+1;
					this.Day = date.getDate();
					this.Hour = date.getHours();
					this.Minute = date.getMinutes();
				}
			},

			// 时间搓转日期格式
			timestampToTime (timestamp){
				let date = new Date(timestamp);
				let Year = date.getFullYear();
				let Month = (date.getMonth()+1);
				let Day = date.getDate();
				let Hour = date.getHours();
				let Minute = date.getMinutes();
				let obj = {Year,Month,Day,Hour,Minute}
				return obj
			},

			// 上一个月
			handlePreMonth() {
				if (this.Month === 0) {
					this.Year = this.Year - 1
					this.Month = 11
					// this.Day = 1
				} else {
					this.Month = this.Month - 1
					// this.Day = 1
				}
				this.mmClick()
			},

			// 下一个月
			handleNextMonth() {
				if (this.Month === 11) {
					this.Year = this.Year + 1
					this.Month = 0
					// this.Day = 1
				} else {
					this.Month = this.Month + 1
					// this.Day = 1
				}
				this.mmClick()
			},

			// 选择日
			handleDay(val) {
				this.Day = val;
				if(this.types === 'datetime'){
					this.dateType = 4;
					this.mmClick()
				}else{
					this.Hour = 0;
					this.Minute = 0;
					this.mmClick(1)
				}
				
			},

			// 选择时分
			getHHmm(val,type){
				this.Hour=val[0];
				this.Minute=val[1];
				this.dateType=type;
				this.mmClick(type);
			},

			// 确定
			mmClick(type){
				const {Year,Month,Day,Hour,Minute}=this;
				let value = Year + '-'
					+ Month.toString().padStart(2,"0") + '-'
					+ Day.toString().padStart(2,"0") + ' '
					+ Hour.toString().padStart(2,"0") + ':'
					+ Minute.toString().padStart(2,"0");
				this.dateType = type&&type===1? 1 : this.dateType;
				this.$emit('submint',value, type)
				// console.log(value)
				// console.log(this.dateType)
			},
		},
		computed: {
			// 组件类型: 日历+时间（datetime） or 日历（date）
			types() {
				return this.$attrs&&this.$attrs.types || 'datetime'
			}
		},
		watch:{
			value: {
				handler(newval,oldval){
					// console.log(newval)
					this.initData(newval);
				},
				immediate: true
			}
		},
		components:{
      DatePanel,
			TimePanel
		},
	};
</script>

<style lang="scss" scope>
	.calendar {
		position: absolute;
		width: 326px;
		color: #606266;
		border: 1px solid #e4e7ed;
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		background-color: #fff;
		margin: 7px 0;
		z-index: 99999;
		&.timepan{
			width: 255px;
		}
		.calendar__header {
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

			.header__pre {
				height: 12px;
				width: 12px;
				position: relative;

				&:after {
					content: " ";
					display: inline-block;
					height: 9px;
					width: 9px;
					border-width: 2px 2px 0 0;
					border-color: #c8c8cd;
					border-style: solid;
					transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0) rotate(180deg);
					position: absolute;
					top: 50%;
					margin-top: -4px;
					right: 2px;
				}
			}

			.header__next {
				height: 12px;
				width: 12px;
				position: relative;

				&:after {
					content: " ";
					display: inline-block;
					height: 9px;
					width: 9px;
					border-width: 2px 2px 0 0;
					border-color: #c8c8cd;
					border-style: solid;
					transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
					position: absolute;
					top: 50%;
					margin-top: -4px;
					right: 2px;
				}
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