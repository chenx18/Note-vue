<template>
  <div class="editor-box">
    <mavon-editor v-model="value"
      ref="md"
      defaultOpen="edit"
      :toolbars="toolbarsValue"
      @imgAdd="$imgAdd"
      @change="changeMavon" 
      @save="saveMavon"/>
  </div>
</template>

<script>
  import {mavonEditor} from "mavon-editor";
  import "mavon-editor/dist/css/index.css";
  export default {
    name: "Editor",
    data() {
      return {
        value:'',
        toolbarsValue: {}
      };
    },
    mounted() {
     this.init();
    },
    methods: {
      init() {
        this.toolbarsValue = {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        }
      },
      //changeMavon
      changeMavon(){

      },
      //富文本保存的方法
      saveMavon(value,render){   
        console.log("this is render"+render);
        console.log("this is value"+value);
      },
      // 绑定@imgAdd event
      $imgAdd(pos, $file){
        console.log("触发图片上传");
        console.log(pos);
        console.log($file);
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('file', $file);
        console.log(formdata);
        imgeApi(formdata).then(res=>{
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
          console.log(res.data);
          let url="/server/"+res.data.data;
          this.$refs.md.$img2Url(pos, url);              //相应的md格式的文件内容就是它绑定的变量
            //得到相应的html/文件
          console.log(this.$refs.md.d_render);
        });
      },
    },
    components: {
      mavonEditor
    },
    
  };

</script>

<style lang='scss' scoped>
.editor-box {
  width: 100%;
  height: 100%;
  padding:20px 300px 10px;
  box-sizing: border-box;
}
</style>
  