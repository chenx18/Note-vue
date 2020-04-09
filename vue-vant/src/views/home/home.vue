<template>
  <div class="home">
    <!-- 轮播 -->
    <van-row class="swiper-area">
      <van-col span="24">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img v-lazy="item" style="width:100%;height:160px;"/>
        </van-swipe-item>
      </van-swipe>
      </van-col>
    </van-row>
    
    <!-- tab -->
    <!-- <van-row class="tabs">
      <van-tabs type="card">
        <van-tab title="标签 1">内容 1</van-tab>
        <van-tab title="标签 2">内容 2</van-tab>
        <van-tab title="标签 3">内容 3</van-tab>
      </van-tabs>
    </van-row> -->
  </div>
</template>

<script>
export default {
  name: "home",
  
  data() {
    return{
      images: [
        "https://a2.vimage1.com/upload/flow/2018/06/12/50/15287856410421.jpg",
        "https://a3.vimage1.com/upload/flow/2018/06/06/29/15282588215380.jpg",
        "https://a2.vimage1.com/upload/flow/2018/06/11/129/15287110698394.jpg",
        "https://a3.vimage1.com/upload/flow/2018/06/11/79/15286841592012.jpg"
      ]
      
    }
  },
  mounted() {

  },
  components: {
  }
};
</script>

<style lang="scss" scoped>


</style>

