<template>
  <div class="content flexContainer">
    <SideLeft :List="nodeArr" @selectItem="selectItem" />
    <!-- <div ref='md' class="markdown main" v-html="htmlMD"></div> -->
    <div ref='md' class="markdown main" v-html="htmlMD"></div>
    <SideRight :List="nodeArr"></SideRight>
  </div>
</template>

<script>
  import Api from '@/api/git';
  import { restHtml } from '@/utils/reptile'
  import SideRight from './sideRight';
  import SideLeft from './sideLeft';
  export default {
    name: "Note",
    components: {
      SideRight,
      SideLeft
    },
    data() {
      return {
        htmlMD: '',
        nodeArr: []
      };
    },
    mounted() {
      this.content()
      this.$nextTick(()=>{
        if (this.$refs.md) {
         this.nodeArr = this.createTree(this.$refs.md, []);
        }
      })
    },
    methods: {
      // 创建目录
      createTree(els, nodeArr) {
        nodeArr = []
        for (let i = 0;i < els.childNodes.length;i++) {
          const node = els.childNodes[i];
          // 过滤 text 节点、script 节点
          if ((node.nodeType != 3) && (node.nodeName != 'SCRIPT')) {
            let ar = ['h1','h2','h3','h4','h5','h6','a'];
            let name = node.nodeName.toLowerCase();
            let index = ar.findIndex(item => name === item);
            if(index !== -1) {
              let obj = {label: node.id, value: index};
              nodeArr.push(obj);
            }
            this.createTree(node);
          }
        }
        return nodeArr
      },

      selectItem(val){
        console.log(val)
        Api.getContent('javaScripts/02-String.md').then((res)=>{
          if(res.status===200){
            let html = res.data;
            let reg = '<article([\\s\\S]*)</article>';
            this.htmlMD = html.match(reg)[0] || '';
            console.log(this.htmlMD);
          }
        }).catch((err)=>{
          console.log(err);
        })
      },

      content(){
        Api.GetContent().then(res=>{
          console.log(res);
        })
      }
    },
    computed: {

    }
  };

</script>

<style lang='scss' scoped>
  .content {
    width: 100%;
    height: calc(100% - 55px);
    overflow: hidden;
    .main {
      padding: 10px 300px 10px 10px;
      overflow: auto;
      flex: 1 auto;
    }
  }

</style>
