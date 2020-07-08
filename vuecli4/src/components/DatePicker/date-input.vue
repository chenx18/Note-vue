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
	import {formatDate} from '@/utils/date'
	import {getJulianDay,calendarToPersian,persianToGregorian} from '@/utils/Calendar'
	import DateBox from './dateBox'
	export default {
		name: 'IDatePicker',
		inheritAttrs: false,
    props: {
      value: {
        type:[String, Number],
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
		// provide() {
		// 	return {inputThis: this}
		// },
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
				// console.log('onInput', this.evTag||'', this.show)
			},
			inputFocus(){
				// return;
				if(this.evTag!="imd") this.show = true;
				else this.evTag = "";
				// console.log('inputFocus', this.evTag||'', this.show)	
			},
			inputMD(){
				// return;
				// console.log('inputMD',this.evTag)
				if(this.evTag === 'lmd') {
					this.$refs.childMethod.dateType = 1;
					// console.log(this.$refs.childMethod.dateType)
				}
				this.evTag = "imd";
				this.show = !this.show;
				// console.log('inputMD', this.evTag||'', this.show)	
			},
			inputBlur(){
				// console.log('inputBlur')
				if(this.evTag!="lmd") this.show = false;	
				// console.log('inputBlur', this.evTag||'', this.show)			
			},
			dateMD(){
				// console.log('dateMD')
				this.evTag = "lmd";
				// console.log('dateMD',this.evTag||'', this.show)
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
		watch:{
			value: {
				handler(newval,oldval){
					console.log('newval:' + newval)
					const da = calendarToPersian(newval)
					// https://cn.calcuworld.com/%E6%B3%A2%E6%96%AF%E6%97%A5%E5%8E%86
					console.log(da)
					console.log(persianToGregorian(da))
					this.setCurrentValue(newval);
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
			padding: 0 15px 0 30px;
			transition: border-color .2s cubic-bezier(.645,.045,.355,1);
			width: 100%;
		}
		
	}
	
</style>