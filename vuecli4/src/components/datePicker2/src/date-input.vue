<template>
	<div class="date_box">
		<div class="input_box" style="width: 100%">
			<span class="input__prefix"><i class="el-input__icon el-icon-time"></i></span>
			<input type="text" :value="displayVal" @input="onInput" v-bind="$attrs"
        @focus="inputFocus" @blur="inputBlur" @mousedown="inputMD">
			<span v-if="displayVal" class="input__suffix"><i class="el-input__icon el-icon-circle-close" @click="cleanTime"></i></span>
		</div>

		<DateBox ref="childMethod" :value="displayVal" :show="show" v-bind="$attrs" @submint="submint" @dateMD="dateMD" />
	</div>
</template>

<script>
	import DateBox from './dateBox'
	import {formatDate} from '@/utils/date'
	import {GetTodayCalendarInPersian,calcPersian} from './calendar'
	export default {
		name: 'IDatePicker',
		inheritAttrs: false,
    props: {
      value: {
        type:[String, Number, Date],
        default: ''
      },
    },
		data() {
			return {
				displayVal: '',
				evTag:'',
				show: false,
			};
		},
		mounted(){
		},

		methods: {
			setCurrentValue(value) {
				const value_format = this.$attrs['value-format'] || 'yyyy-MM-dd hh:mm';
				const format = this.$attrs['format'] || 'yyyy-MM-dd hh:mm';
				if (value === this.displayVal) return;     
				this.displayVal = formatDate(value, format);
				let modelVal = formatDate(value, value_format);
				let dateUTC = new Date(modelVal).toISOString();
				this.$emit('input', dateUTC)
			},
			onInput(event){
				let value = event.target.value;      
				this.$emit('input', value)
			},
			inputFocus(){
				if(this.evTag!="imd") this.show = true;
				else this.evTag = "";
			},
			inputMD(){
				if(this.evTag === 'lmd') {
					this.$refs.childMethod.dateType = 1;
				}
				this.evTag = "imd";
				this.show = !this.show;
			},
			inputBlur(){
				if(this.evTag!="lmd") this.show = false;			
			},
			dateMD(){
				this.evTag = "lmd";
			},
			submint(val,label){
				this.setCurrentValue(val);
				if(label&&label===1){
					this.show = false;
					this.evTag = "";
				}
			},
			// 清除
			cleanTime(){
				this.displayVal = '';
				this.$emit('input', '')
			}
			
		},
		components:{
			DateBox
		},
		computed: {
			lang() {
				return this.$i18n.locale;
			}
		},
		watch:{
			// value: {
			// 	handler(newval,oldval){
			// 		// this.setCurrentValue(newval);
			// 	},
			// 	immediate: true
			// },
			lang: {
				handler(newval,oldval){
					let inputval= this.value;
					if((newval === 'fa-IR' && oldval === undefined)||(newval === 'fa-IR' && oldval !=='fa-IR')){
						// console.log('公历转波斯历', inputval)
						const {year,month,day,hour,minute,weekday} = GetTodayCalendarInPersian(inputval);
						const t = `${year}-${month}-${day} ${hour}:${minute}`
						this.setCurrentValue(t);
					}else if(newval !== 'fa-IR' && oldval ==='fa-IR'){
						// console.log('波斯历转公历', inputval)
						if(inputval){
							let d = new Date(inputval),
								Y = d.getFullYear(),
								M = d.getMonth()+1,
								D = d.getDate(),
								h =	d.getHours(),
								m = d.getMinutes();
							let {year,month,day} = calcPersian(Y, M, D);
							let date = `${year}-${month}-${day} ${h}:${m}`;
							this.setCurrentValue(date);
						}
					}else{
						this.setCurrentValue(inputval);
					}
				},
				immediate: true
			}
		}
	};
</script>

<style lang="scss" scope>
	.date_box {
		width: 100%;
		font-size:12px;
	}
	.input_box{
		position: relative;
		font-size: 14px;
		display: inline-block;
		&:after{
			content: "";
			clear: both;
    }
		&:hover{
			.input__suffix {
				display: inline-block;
			}
		}
		.input__prefix,.input__suffix{
			height: 100%;
			text-align: center;
			position: absolute;
			top: 0;
			color: #c0c4cc;
			transition: all .3s;
			i{
				display: inline-block;
				line-height: 28px;
				text-align: center;
			}
		}
		.input__prefix{
			left: 5px;
		}
		.input__suffix{
			display: none;
			right: 5px;
		}
		input{
			cursor: pointer;
			-webkit-appearance: none;
			background-color: #fff;
			background-image: none;
			border-radius: 4px;
			border: 1px solid #ccc;
			box-sizing: border-box;
			color: #606266;
			display: inline-block;
			font-size: 12px;
			height: 28px;
			line-height: 40px;
			outline: none;
			padding: 0 30px;
			transition: border-color .2s cubic-bezier(.645,.045,.355,1);
			width: 100%;
		}
		
	}
	
</style>