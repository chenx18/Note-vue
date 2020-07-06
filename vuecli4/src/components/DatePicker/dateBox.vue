<template>
  <div class="calendar" v-if="show" @blur="$emit('dateBlur')" @mousedown="$emit('dateMD')">
    <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
    <div class="calendar__header">
      <div class="header__pre" @click="handlePreMonth"></div>
      <div class="header__title">
        {{Year}}/{{Month.toString().padStart(2,"0")}}/{{Day.toString().padStart(2,"0")}}
      </div>
      <div class="header__next" @click="handleNextMonth"></div>
    </div>

    <!-- 日历 -->
    <DatePanel v-if="dateType===1" :Year="Year" :Day="Day" :Month="Month" @handleDay="handleDay"/>

    <!-- 时钟 -->
    <TimePanel v-else @getHHmm="getHHmm" :HHMM="[Hour,Minute]"/>

    <!-- 确定 -->
    <div class="ymdhmsave" >
      <a @click="dateType=1">{{Year}}-{{Month.toString().padStart(2,"0")}}-{{Day.toString().padStart(2,"0")}}</a>
      <a @click="dateType=4">{{Hour.toString().padStart(2,"0")}}:{{Minute.toString().padStart(2,"0")}}</a>
      <a @click="mmClick(1)">确定</a>
    </div>
  </div>
</template>

<script>
  import DatePanel from './datePanel'
	import TimePanel from './timePanel'
	export default {
		name: 'DateBox',
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
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
			initData(val){
				if(val){
					const {year, month, day, hour, minute } = this.date_sort(val);
					this.Year = year
					this.Month = month
					this.Day = day
					this.Hour = hour
					this.Minute = minute
				}else{
					const date = new Date();
					this.Year = date.getFullYear();
					this.Month = date.getMonth()+1;
					this.Day = date.getDate();
					this.Hour = date.getHours();
					this.Minute = date.getMinutes();
					// console.log(this.Year,this.Month,this.Day,this.Hour,this.Minute)
				}
			},

			// 时间处理 {year: 2020, month: 7, day: 6, hour: 15, minute: 30, …}
			date_sort(date){
				var time={};
				var f = date.split(' ', 2);//过滤空格
				if(f[0].search("/") != -1){//判断是否包含-
						var d = (f[0] ? f[0] : '').split('/', 3);//过滤-
				}else {
						var d = (f[0] ? f[0] : '').split('-', 3);//过滤-
				}
				time.year=parseInt(d[0]);//转换成整数形式的原因是 过滤掉 月份和时分秒的首位补零的情况
				time.month=parseInt(d[1]);
				time.day=parseInt(d[2]);
				var t = (f[1] ? f[1] : '').split(':', 3);//过滤:
				time.hour=parseInt(t[0]);
				time.minute=parseInt(t[1]);
				time.second=parseInt(t[2]);
				return time;
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
				this.dateType = 4;
				this.mmClick()
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
				let value = Year+'-'+Month.toString().padStart(2,"0")+'-'+Day.toString().padStart(2,"0")+' '+Hour.toString().padStart(2,"0")+':'+Minute.toString().padStart(2,"0");
				if( type && type=== 1 ) this.dateType = 1;
				this.$emit('submint',value, type)
				
			},
			
		},
		components:{
      DatePanel,
			TimePanel
		},
		watch:{
			value: {
				handler(newval,oldval){
					// console.log(newval)
					this.initData(newval);
				},
				immediate: true
			}
		}
	};
</script>

<style lang="scss" scope>
	.date_box {
		// display: flex;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.input_box{
		position: relative;
		font-size: 14px;
		display: inline-block;
		&:after{
			content: "";
			clear: both;
    }
		.input__prefix{
			height: 100%;
			text-align: center;
			position: absolute;
			left: 5px;
			top: 0;
			color: #c0c4cc;
			transition: all .3s;
			i{
				display: inline-block;
				line-height: 28px;
				text-align: center;
			}
		}
		input{
			-webkit-appearance: none;
			background-color: #fff;
			background-image: none;
			border-radius: 4px;
			border: 1px solid;
			border-color: #67c23a;
			box-sizing: border-box;
			color: #606266;
			display: inline-block;
			font-size: inherit;
			height: 28px;
			line-height: 40px;
			outline: none;
			padding: 0 15px 0 30px;
			transition: border-color .2s cubic-bezier(.645,.045,.355,1);
			width: 100%;
		}
		
	}
	
	.calendar {
		width: 100%;
		height: 100%;
		color: #606266;
		border: 1px solid #e4e7ed;
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
		background-color: #fff;
		margin: 5px 0;
		.calendar__header {
			margin: 12px;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: space-between;
			line-height: 22px;

			.header__title {
				font-size: 16px;
				letter-spacing: 1px;
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
		.calendar__main {
			width: 292px;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			position: relative;
			margin: 15px;
			.main_block-head {
				width: 100%;
				height: 40px;
				margin-bottom: 15px;
				display: flex;
				justify-content: center;
				font-size: 12px;

				.block_head_item {
					height: 30px;
					width: 30px;
					line-height: 30px;
					text-align: center;
					padding: 5px;
					color: #606266;
					font-weight: 400;
					border-bottom: solid 1px #EBEEF5;
				}
			}

			.main_date {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;

				.date_item {
					height: 31px;
					width: 41px;
					padding: 4px 0;
					box-sizing: border-box;
					text-align: center;
					cursor: pointer;
					position: relative;

					span {
						width: 24px;
						height: 24px;
						display: block;
						margin: 0 auto;
						line-height: 24px;
						position: absolute;
						left: 50%;
						-webkit-transform: translateX(-50%);
						transform: translateX(-50%);
					}
				}

				.date_item_not {
					color: #7f8fa4;
				}

				.date_item_today {
					border-radius: 50%;
					transition: 0.5s all;
					color: #FFF;
					background-color: #409EFF;
					box-shadow: 0 2px 6px rgba(171, 171, 171, 0.5);
				}
			}


		}
		.ymdhmsave{
			height: 41px;
			border-top: 1px solid #bbb;
			line-height: 40px;
			display: flex;
			justify-content: space-around;
			a {
				padding: 0 10px;
				&:nth-child(2) {
					margin-right: 20px;
				}
			}
		}
		.popper__arrow{
			position: absolute;
			top: 19px;
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
				border-bottom: 10px #e4e7ed solid;
			}
			&:after{
				top: 1px; /*覆盖并错开1px*/
				border-bottom: 10px #fff solid;
			}
		}
	}
</style>