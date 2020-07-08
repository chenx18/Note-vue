<template>
  <!-- 日历 -->
  <div class="calendar__main" >
    <ul class="main_block-head">
      <li class="block_head_item" v-for="(item, index) in calendarHeader" :key="index">{{item}}</li>
    </ul>
    <ul class="main_date">
      <li class="date_item" @click="handleDayClick(item)"
        v-for="(item, index) in displayDaysPerMonthT(YMD.Year)[YMD.Month-1]" :key="item.type + item.content + `${index}`">
        <span :class="` ${(item.type === 'pre' || item.type === 'next') ? 'date_item_not' : ''} ${(item.content === YMD.Day && item.type === 'normal') && 'date_item_today'}`">
          {{item.content}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
	export default {
		name: 'DatePanel',
		// inject:['inputThis'],
    props: {
      YMD: Object,
    },
		data() {
			return {
				calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
			};
		},
		mounted(){
			console.info('datePanel',this.$attrs);
			// console.log('provide/inject使用测试',this.inputThis)
		},

		methods: {
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
          let day = Number(item.content)
          this.$emit('handleDay', day)
				}
			},
		},
		components:{
		}
	};
</script>

<style lang="scss" scope>
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
</style>