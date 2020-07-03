<template>
  <div class="home">
  </div>
</template>

<script>
export default {
  name: "Auth",
  
  data() {
    return{
      
    }
  },
  created(){
    console.log(this.$route.query.code)
    if(this.$route.query.code){
      let obj = {};
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

