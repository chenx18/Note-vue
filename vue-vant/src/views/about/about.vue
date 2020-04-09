<template>
  <div class="container">
    <van-row class="head">
      <p class="title">{{title}}</p>
      <van-col span="6" >
        <div class="user-icon">
          <img :src="this.infoData.Icon" alt="">
        </div>
      </van-col>
      <van-col span="10" class="user-name">
        <p>{{this.infoData.Name}}</p>
        <p>{{this.infoData.phone}}</p>
      </van-col>
      <van-col span="8" class="link-info">
        资料管理<van-icon name="arrow" />
      </van-col>
    </van-row>
    <van-row class="loader">
      <van-col span=12>
        <van-uploader :after-read="upUserIcon">
          <p><van-icon name="photograph" /></p>
          <p>头像上传</p>
        </van-uploader>
      </van-col>
      <van-col span=12>
        <div @click="downloadIcon">
          <p><van-icon name="printer" /></p>
          <p>头像下载</p>
        </div>
      </van-col>
    </van-row>

    <van-row class="user-row">
      <van-col span="24">
        <van-icon name="todo-list" class="pull-left padding-r orange"/>
        <p class="pull-left">待办</p>
        <van-icon name="arrow" class="pull-right padding-r"/>
      </van-col>
    </van-row>

    <van-row class="user-row">
      <van-col span="24" class="border-b">
        <van-icon name="service" class="pull-left padding-r blue"/>
        <p class="pull-left">音乐</p>
        <van-icon name="arrow" class="pull-right padding-r"/>
      </van-col>
       <van-col span="24" class="border-b">
        <van-icon name="like" class="pull-left padding-r red"/>
        <p class="pull-left">喜欢</p>
        <van-icon name="arrow" class="pull-right padding-r"/>
      </van-col>
       <van-col span="24" class="border-b">
        <van-icon name="star" class="pull-left padding-r green"/>
        <p class="pull-left">收藏</p>
        <van-icon name="arrow" class="pull-right padding-r"/>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Api from './../../utils/api.js';
import fileDownload from './../../utils/download.js'
import { Uploader  } from 'vant';
export default {
  name: 'about',
  data() {
    return {
      title: '我的',
      infoData: {}
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    // 查询
    getInfo() {
      Api.GetUserInfo().then(res => {
        console.log(res);
        if(res.data.Code === 1) {
          this.infoData = res.data.Data[0];
          console.log(this.infoData);
        }
      })
    },
    // 上传
    async upUserIcon(val) {
      if(val) {
        let formdata = new FormData();
        formdata.append("file", val.file)
        console.log(val);
        await Api.UpUserICON(formdata).then(res => {
          console.log(res);
          if(res.data.Code === 1) {
            this.getInfo();
          }
        })
      }
      

    },

    // 下载
    downloadIcon() {
      let name = this.infoData.Icon.substring(22);
      let params = {name};
      Api.DownloadIcon(params).then(res => {
        console.log(res);
        if(res && res.data) {
          fileDownload.downloadImg(res, params.name)
        }
      })
    }
  },
  components: {  
    [Uploader.name]: Uploader,
  },
}
</script>


<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  .head {
    // height: 200px;
    padding: 10px 0 30px;
    color: #fff;
    background: -webkit-linear-gradient(left,#ff3c5e, #ff9474); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(left,#ff3c5e, #ff9474); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(left,#ff3c5e, #ff9474); /* Firefox 3.6 - 15 */
    background: linear-gradient(left,#ff3c5e, #ff9474); /* 标准的语法 */
    .title {
      font-size: 16px;
      padding: 0 0 10px 0;
      margin: 0;
      line-height: 45px;
    }
    .user-icon {
      width: 45px;
      height: 45px;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;
      img{
        height: 100%;
      }
    }
    .user-name {
      text-align: left;
      font-size: 14px;
      p{
        line-height: 22px;
        padding: 0;
        margin: 0;
      }
    }
    .link-info {
      line-height: 45px;
      padding-right: 15px;
      text-align: right;
    }
  }
  .loader {
    background: #fff;
    padding: 8px 0; 
    font-size: 12px;
  }
  .user-row {
    margin: 15px 0;
    padding-left: 15px;
    background: #fff;
    .van-col {
      font-size: 14px;
      line-height: 40px;
      .van-icon {
        line-height: 40px;
      }
      .padding-r {
        padding-right: 10px; 
      }
      .blue {
        color: #009AFE;
      }
      .green {
        color: #11CD6E;
      }
      .orange {
        color: #EF6C00;;
      }
      .red {
        color: #F44336;
      }
    }
    .border-b {
      border-bottom: 1px solid #f7f7f7;
    }
  }
 
}
</style>
