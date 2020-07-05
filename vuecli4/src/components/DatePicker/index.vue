<template>
	<div class="date_box">

		<div class="input_box" style="width: 200px">
			<span class="input__prefix"><i class="">时间</i></span>
			<input  type="text" placeholder="选择日期时间" @focus="inputFocus" @blur="inputBlur" @mousedown="inputMD" v-model="val" readonly/>
		</div>
		
		<div class="calendar" v-if="show" @blur="dateBlur" @mousedown="dateMD">
			<div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
			<div class="calendar__header">
				<div class="header__pre" @click="handlePreMonth"></div>
				<div class="header__title">
					{{Year}}/{{Month + 1}}/{{DD}}
				</div>
				<div class="header__next" @click="handleNextMonth"></div>
			</div>
			<!-- 日历 -->
			<div class="calendar__main" v-if="dateType===1">
				<ul class="main_block-head">
					<li class="block_head_item" v-for="(item, index) in calendarHeader" :key="index">{{item}}</li>
				</ul>
				<ul class="main_date">
					<li class="date_item" @click="handleDayClick(item)"
						v-for="(item, index) in displayDaysPerMonthT(Year)[Month]" :key="item.type + item.content + `${index}`">
						<span :class="` ${(item.type === 'pre' || item.type === 'next') ? 'date_item_not' : ''} ${(item.content === DD && item.type === 'normal') && 'date_item_today'}`">
							{{item.content}}
						</span>
					</li>
				</ul>
			</div>
			<!-- 时钟 -->
			<ClockPanel v-else :dateType="dateType" @getHHmm="getHHmm" :Hour="Hour" :Minute="Minute"/>
			<!-- 确定 -->
			<div class="ymdhmsave" >
				<a @click="dateType=1">{{Year}}-{{Month + 1}}-{{DD.toString().padStart(2,"0")}}</a>
				<a @click="dateType=4">{{Hour}}:{{Minute}}</a>
				<a @click="mmClick">确定</a>
			</div>
		</div>
	</div>
</template>

<script>
	import ClockPanel from './clockPanel'
	export default {
		data() {
			return {
				val:'',
				evTag:'',
				show: false,
				calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
				Year: new Date().getFullYear(),
				Month: new Date().getMonth(),
				DD: new Date().getDate(),
				Hour:	new Date().getHours(),
				Minute: new Date().getMinutes(),
				dateType: 1,	/*dateType 1:年月日，2：年月，3：年，4：时-分，5：年月日时分*/
			};
		},
		mounted(){
		},

		methods: {
			inputFocus(){
				if(this.evTag!="imd")
					this.show = true;
				else
					this.evTag = "";
			},
			inputMD(){
				this.evTag = "imd";
				this.show = !this.show;
			},
			inputBlur(){
				if(this.evTag!="lmd")
					this.show = false;				
			},
			dateMD(){
				this.evTag = "lmd";
			},
			dateBlur(){
				this.show = false;			
			},
			// 计算天数
			displayDaysPerMonthT(year) {
				//定义每个月的天数，如果是闰年第二月改为29天
				let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
					daysInMonth[1] = 29;
				}
				let daysPreMonth = [].concat(daysInMonth);
				daysPreMonth.unshift(daysPreMonth.pop());
				let addDaysFromPreMonth = new Array(12).fill(null).map((item, index) => {
					let day = new Date(year, index, 1).getDay();
					if (day === 0) {
						return 6;
					} else {
						return day - 1;
					}
				});
				let total_calendar_list = new Array(12)
					.fill([])
					.map((month, monthIndex) => {
						let addDays = addDaysFromPreMonth[monthIndex] + 1,
							daysCount = daysInMonth[monthIndex],
							daysCountPre = daysPreMonth[monthIndex],
							monthDate = [];
						if (addDays >= 7) {
							addDays = addDays - 7;
						}
						for (; addDays > 0; addDays--) {
							let obj = {
								content: daysCountPre--,
								type: "pre"
							};
							monthDate.unshift(obj);
						}
						for (let i = 0; i < daysCount;) {
							let obj = {
								content: ++i,
								type: "normal"
							};
							monthDate.push(obj);
						}
						if (monthDate.length > 35) {
							for (let i = 42 - monthDate.length, j = 0; j < i;) {
								let obj = {
									content: ++j,
									type: "next"
								};
								monthDate.push(obj);
							}
						} else {
							for (let i = 35 - monthDate.length, j = 0; j < i;) {
								let obj = {
									content: ++j,
									type: "next"
								};
								monthDate.push(obj);
							}
						}
						return monthDate;
					});
				return total_calendar_list;
			},

			// 选择日期
			handleDayClick(item) {
				if (item.type === 'normal') {
					this.DD = Number(item.content)
					this.dateType=4;
					console.log(this.DD)
					console.log(this.dateType)
				}
			},

			// 上一个月
			handlePreMonth() {
				if (this.Month === 0) {
					this.Year = this.Year - 1
					this.Month = 11
					this.DD = 1
				} else {
					this.Month = this.Month - 1
					this.DD = 1
				}
			},

			// 下一个月
			handleNextMonth() {
				if (this.Month === 11) {
					this.Year = this.Year + 1
					this.Month = 0
					this.DD = 1
				} else {
					this.Month = this.Month + 1
					this.DD = 1
				}
			},
			// 时分
			getHHmm(val,type){
				this.Hour=val[0];
				this.Minute=val[1];
				this.dateType=type;
			},
			// 确定
			mmClick(){
				const {Year,Month,DD,Hour,Minute}=this;
				this.val = Year+'-'+Month.toString().padStart(2,"0")+'-'+DD.toString().padStart(2,"0")+' '+Hour+':'+Minute
				console.log(this.val)
			},
			
		},
		components:{
			ClockPanel
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