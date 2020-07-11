<template>
	<div class="date_box">
		<div class="input_box" style="width: 100%">
			<span class="input__prefix"><i class="el-input__icon el-icon-time"></i></span>
			<input type="text" :value="displayVal" @input="onInput" v-bind="$attrs" @focus="inputFocus" >
			<span v-if="displayVal" class="input__suffix"><i class="el-input__icon el-icon-circle-close" @click="cleanTime"></i></span>
		</div>
	</div>
</template>

<script>
  import create from './create'
  import {formatDate} from '@/utils/date'
  import Popup from './dateBox'
	export default {
		name: 'input',
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
        offset:{},
        popup: null
			};
		},
		mounted(){
		},

		methods: {
			onInput(e){
				this.$emit('input', e.target.value)
      },

      // 输入框获得焦点时
			inputFocus(e){
        console.log(this.popup);
        if(this.popup) this.popup.hide();
        const {x, y, width, height, top, right, bottom, left} = e.target.getBoundingClientRect()
        this.offset ={ x, y, width, height, right, bottom, left, top: top + height};
        this.createPopup()
      },

      //创建日历
      createPopup(){
        const _this = this;
        this.popup = create(Popup, {
          value: this.displayVal,
          offset: this.offset,
          submit: (val) => _this.setValue(val)
        })
        this.popup.show()
      },

      // 设置value
      setValue(value) {
				const value_format = this.$attrs['value-format'] || 'yyyy-MM-dd hh:mm';
				const format = this.$attrs['format'] || 'yyyy-MM-dd hh:mm';
				if (value === this.displayVal) return;     
				this.displayVal = formatDate(value, format);
				let modelVal = formatDate(value, value_format);
				let dateUTC = new Date(modelVal).toISOString();
				this.$emit('input', dateUTC)
      },
      
			// 清除
			cleanTime(){
				this.displayVal = '';
				this.$emit('input', '')
			}
			
		},
		components:{
		},
		computed: {
		},
		watch:{
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