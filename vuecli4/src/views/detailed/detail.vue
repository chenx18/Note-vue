<template>
  <div class="mark-box" v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)">
    <!-- 内容 -->
    <div ref='md' class="markdown main" v-html="htmlMD"></div>
    <!-- 目录 -->
    <div class="side-right" v-if="nodeArr.length>0">
      <div class="item" v-for="(item,i) in nodeArr" :key="i">
        <span @click="selectItem(item.id)">{{item.label}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Api from '@/api/git'
  export default {
    name: "Details",
    data() {
      return {
        loading: false,
        htmlMD: '',
        nodeArr: []
      };
    },
    mounted() {
      console.log(this.$route.params)
      let {url,path} = this.$route.params;
      if(path) this.loadMarkAsync(path)
      // if(url) this.handleContent(url)
    },
    methods: {
      // 从github仓库中获取笔记内容
      handleContent(path){
        this.loading = true;
        Api.getContent(path).then((res)=>{
          this.loading = false;
          if(res.status===200){
            let data = res.data;
            let reg = '<article([\\s\\S]*)</article>';
            let md = data.match(reg);
                md = md?md[0]:'空白文件 未做笔记'
            this.htmlMD = md;
            this.refMd(); 
          }
        }).catch((err)=>{
          console.log(err);
        })
      },

      // 动态导入本地笔记文件
      loadMarkAsync(val){
        console.log(val);
        import(`${val}`).then(res => {
          console.log(res)
          this.htmlMD = res.default;
          this.refMd();
        })
      },


      refMd(){
        this.$nextTick(()=>{
          if (this.$refs.md) {
            this.nodeArr = this.createTree(this.$refs.md, []);
          }
        })
      },

      // 生成右侧目录
      createTree(els, nodeArr) {
        for (let i = 0;i < els.childNodes.length;i++) {
          const node = els.childNodes[i];
          // 过滤 text 节点、script 节点
          if ((node.nodeType != 3) && (node.nodeName != 'SCRIPT')) {
            let ar = ['h1','h2','h3','h4','h5','h6'];
            let name = node.nodeName.toLowerCase();
            ar.forEach((item) => {
              if(name === item) {
                let ID ='';
                if(node.childNodes && node.childNodes[0].id) ID = node.childNodes[0].id;
                else ID = node.id;
                let obj = {label: node.textContent, value: i, id: ID};
                nodeArr.push(obj);
              }
            });
            this.createTree(node, nodeArr);
          }
        }
        return nodeArr
      },

      selectItem(val){
        let el = document.querySelector(`#${val}`);
        if(el) el.scrollIntoView(true)
      }
    },
    computed: {
      param(){
        return this.$route.params
      }
    },
    watch:{
      param(val) {
        console.log(val)
        // this.handleContent(val.url);
        this.loadMarkAsync(val.path);
      }
    }
  };
</script>

<style lang='scss' scoped>
  .mark-box {
    width: 100%;
    height: 100%;
    overflow: auto;
    .main {
      padding: 10px 300px 10px 10px;
      overflow: auto;
      flex: 1 auto;
    }
    .side-right {
      position: fixed;
      top: 75px;
      right: 50px;
      width: 190px;
      padding: 10px;
      max-height: 80%;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
      z-index: 9999;
      overflow: auto;
      .item {
        span{
          cursor: pointer;
          display: block;
          width: 100%;
          height: 21px;
          font-size: 14px;
          color: #42A8E1;
          overflow: hidden;
          &:hover{
            color: #2a6496;
            text-decoration: underline;
          }
        }
      }
    }
  }

</style>
