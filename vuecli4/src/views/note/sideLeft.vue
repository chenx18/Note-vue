<template>
  <div class="side-left">
    <div class="box">
      <h2 class="title">
        Javascript
      </h2>
      <!-- <div class="item" v-for="(item,i) in List" :key="i">
        <a :href="'#'+item.label">{{item.label}}</a>
      </div> -->
      <div class="item" >
        <el-tree :data="treeList"  :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </div>
      
    </div>
  </div>

</template>

<script>
  import Api from '@/api/git'
  import jsons from '@/utils/tree.json'
  export default {
    name: "SideLeft",
    props: {
      List: Array
    },
    components: {},
    data() {
      return {
        treeList:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    mounted() {
      console.log(this.treeList)
      this.treeList = jsons || [];
      this.getTree();
    },
    methods: {
      getTree() {
        Api.getMenJson().then(res => {
          console.log(res)
          if(res.status === 200) {
            let data = res.data;
            let html = data.match('<table([\\s\\S]*)</table>')[0];  // 截取部分htnl
                html = html.replace(/\s*/g, "");     //去掉空格
                html = html.replace(/<[^>]+>/g, "");   //去掉所有的html标记
                html = html.replace(/↵/g, "");       //去掉所有的↵符号
                html = html.replace(/[\r\n]/g, "")  //去掉回车换行
                html = html.replace(/&quot;/g, "")  //去掉&quot;

            let jsonStr = html.replace("{", "{\"");
            jsonStr = jsonStr.replace(":", "\":\"");
            jsonStr = jsonStr.replace(",", "\",\"");
            jsonStr = jsonStr.replace("}", "\"}");
            console.log(jsonStr)
           
            // console.log(JSON.parse(JSON.stringify(res3)))
          }
        })
      },
      matchReg(str){
        let reg=/<\/?.+?\/?>/g;
        console.log(str.replace(reg,''));
      },
      handleNodeClick(data) {
        console.log(data);
        if(data.value) this.$emit('selectItem', data.value)
      }
    },
    computed: {}
  };

</script>

<style lang='scss' scoped>
  .side-left {
    padding: 20px;
    box-sizing: border-box;
    .box {
      min-width: 200px;
      max-width: 280px;
      max-height: 80%;
      background: #fff;
      border-radius: 5px;
      border: 1px solid #3C8DBC;
      box-shadow: 0 3px 8px 0 rgba(60, 141, 188, 0.2), 0 0 0 1px rgba(60, 141, 188, 0.08);
      overflow: auto;

      .title {
        margin: 0;
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background: #3c8dbc;
      }
      .item {
        a {
          font-size: 14px;
          margin: 6px 0;
          padding: 0 15px;
          display: block;
          text-decoration: none;
          cursor: pointer;
          color: #42A8E1;
          &:hover {
            color: #2a6496;
            text-decoration: underline;
          }
        }
      }
    }

  }

</style>
