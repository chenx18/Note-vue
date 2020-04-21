<template>
  <div class="content flexContainer">
    <!-- 菜单 -->
    <div class="side-left">
      <div class="box">
        <h2 class="title">
          Web
        </h2>
        <div class="menu-list" >
          <el-tree :data="treeList"  :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
  import jsons from '@/utils/tree.json'
  export default {
    name: "Note",
    components: {
    },
    data() {
      return {
        isRouterAlive: true,
        treeList:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    mounted() {
      this.treeList = jsons || [];    // 本地菜单json
    },
    methods: {

      // 从github中获取菜单json
      getTree() {
        Api.getMenJson().then(res => {
          if(res.status === 200) {
            let data = res.data;
            let html = data.match('<table([\\s\\S]*)</table>')[0];  // 截取部分htnl
              html = html.replace(/\s*/g, "");        //去掉空格
              html = html.replace(/<[^>]+>/g, "");    //去掉所有的html标记
              html = html.replace(/↵/g, "");          //去掉所有的↵符号
              html = html.replace(/[\r\n]/g, "")      //去掉回车换行
              html = html.replace(/&quot;/g, '"')     //转义&quot;
            console.log(typeof(JSON.parse(html)))
            this.treeList = JSON.parse(html)
          }
        })
      },

      // 选择菜单项
      handleNodeClick(data) {
        if(data.url) {
          if(data.size){
            // this.$router.push({path:`/detail${data.url}`});
            data.path = data.path.replace(/\\/g,'/');
            this.$router.push({name:`detail`,params:{url: data.url, path:data.path}});
            this.reload();
          } else {
            this.$message({type: 'info', message: '该文档为空白文档！'})
          }
        }
      },

      // 更新视图
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(()=> {
          this.isRouterAlive = true;
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
    height: calc(100%  - 55px);
    overflow: hidden;
    .side-left {
      padding: 20px;
      box-sizing: border-box;
      .box {
        width: 280px;
        height: 80%;
        background: #fff;
        border-radius: 5px;
        border: 1px solid #3C8DBC;
        box-shadow: 0 3px 8px 0 rgba(60, 141, 188, 0.2), 0 0 0 1px rgba(60, 141, 188, 0.08);
        overflow: hidden;

        .title {
          margin: 0;
          padding: 0 15px;
          height: 40px;
          line-height: 40px;
          color: #fff;
          background: #3c8dbc;
        }
        .menu-list {
          overflow: auto;
          height: calc(100% - 40px);
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
  }

</style>
