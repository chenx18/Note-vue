<template>
  <div>
    <div class="hhmm" >
      <div class="hh" v-if="!show">
        <a v-for="a in 24" :style="hhPst(a)" :key="a"
          :class="{active:a == (parseInt(hhmm[0])===0?24:parseInt(hhmm[0]))}" @click="hhClick(a)">
          <span :style="hhtRt(a)">{{a==24?"00":a}}</span>
        </a>
        <span class="a-line" :style="hhlPst"></span>
      </div>
      <div class="mm" v-if="show">
        <a v-for="a in 59" :style="mmPst(a)" :key="a"
          :class="{active:a==parseInt(hhmm[1])}" @click="mmClick(a)">
          <span :style="mmtRt(a)">{{a < 10 ? "0"+a : a}}</span>
        </a>
        <a :style="mmPst(0)" 
          :class="{active:hhmm[1]=='00'}" @click="mmClick(0)">
          <span :style="mmtRt(0)">00</span>
        </a>
        <span class="a-line" :style="mmlPst"></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TimePanel',
    props:{
      HHMM: Array,
    },
    data() {
      return {
        show: false,
        hhmm: []
      };
    },
    mounted(){
    },
    methods: {
      hhPst(i) {
        let h12 = i < 13 ? i : i - 12,
          rt = h12 * 30 - 90,
          tx = i < 13 ? 92 : 62;
        return {
          transform: "rotate(" + rt + "deg) translate(" + tx + "px)"
        }
      },
      hhtRt(i) {
        let h12 = i < 13 ? i : i - 12,
          rt = 60 - (h12 - 1) * 30;
        return {
          transform: "rotate(" + rt + "deg)"
        }
      },
      mmPst(i) {
        let rt = i * 6 - 90;
        return {
          transform: "rotate(" + rt + "deg) translate(82px)"
        }
      },
      mmtRt(i) {
        let rt = 90 - i * 6;
        return {
          transform: "rotate(" + rt + "deg)"
        }
      },
      // 时 选择
      hhClick(val) {
        this.show = true;
        let h = val===24? 0 :(val < 10 ? "0" + val : val)
        // let m = new Date().getMinutes().toString().padStart(2,'0');
        // this.hhmm = [h,m];
        this.hhmm[0] = h;
        this.$emit('getHHmm',this.hhmm, 4)
      },
      // 分钟 选择
      mmClick(val) {
        // if (val > 0)
        this.hhmm[1] = val < 10 ? "0" + val : val
        this.show = false;
        this.$emit('getHHmm',this.hhmm, 1)
        this.$emit('close')
      },
      
    },
    computed:{
      hhlPst(){
        let hh = parseInt(this.hhmm[0]);
        let h12 = hh<13 ? hh : hh-12;
        let rt = (h12-1)*30-60;
        let w = hh<13 ? 78 : 48;
        return {
          transform:"rotate("+rt+"deg)",
          width:w+"px"
        }
      },
      mmlPst(){
        let mm = parseInt(this.hhmm[1]);
        let rt = mm*6-90;
        return {
          transform:"rotate("+rt+"deg)"
        }
      }
    },
    watch: {
      HHMM:{
        handler(val){
          this.hhmm = val;
				},
				immediate: true
      }
    }

  };
</script>

<style lang="scss" scope>
.hhmm {
	width: 220px;
	height: 220px;
	position: relative;
	background: #ebebeb;
	border-radius: 120px;
	margin: 7px auto 11px
}
.hh, .mm {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -15px;
	margin-top: -15px;
}
.hh>a, .mm>a {
  cursor: Default;
	position: absolute;
	width: 30px;
	height: 30px;
	border-radius: 15px;
	transform-origin: center center;
}
.hh>a> span, .mm>a span {
	width: 30px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	position: absolute;
	transform-origin: center center;
}
.hh>a:nth-child(n+13) {
	font-size: 12px;
	color: #888;
}
.hh>a:hover {
	background: #ddd;
}
.hh:after, .mm:after {
	content: "";
	height: 8px;
	width: 8px;
	background: #04bbb7;
	border-radius: 4px;
	position: absolute;
	top: 11px;
	left: 11px;
}
.hh>a.active {
	background: #04bbb7;
	color: #fff;
}
.a-line {
	position: absolute;
	height: 1px;
	transform-origin: left top;
	background: #04bbb7;
	top: 15px;
	left: 15px;
}
.mm {
	margin-top: -5px;
	margin-left: -14px;
}
.mm>a, .mm>a span {
	height: 10px;
	width: 28px;
	line-height: 10px;
}
.mm>a {
	font-size: 0;
}
.mm>a:nth-child(5n) {
	font-size: 14px;
}
.mm>a>span {
	pointer-events: none;
	z-index: 19;
	margin-left: 14px;
}
.mm:after {
	left: 10px;
	top: 1px;
}
.mm>a:before {
	content: "";
	position: absolute;
	width: 4px;
	height: 4px;
	border-radius: 2px;
	top: 3px;
	left: 12px;
	pointer-events: none;
	background: #ddd;
	z-index: 20;
}
.mm>a:nth-child(5n):before {
	width: 8px;
}
.mm>a:after {
	content: "";
	position: absolute;
	width: 28px;
	height: 28px;
	border-radius: 14px;
	top: -9px;
	left: 0;
	pointer-events: none;
	z-index: -1;
}
.mm>a:hover {
	z-index: 17;
}
.mm>a:hover:after {
	z-index: 1;
	background: rgba(0,0,0,0.1);
}
.mm>a:hover:before {
	background: #04bbb7;
}
.mm>a.active, .mm>a.active:hover {
	color: #04bbb7;
}
.mm>a.active:before, .mm>a.active:hover:before {
	background: #04bbb7;
}
.mm .a-line {
	width: 82px;
	top: 5px;
	left: 14px;
}
</style>