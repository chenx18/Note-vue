<template>
  <el-container class="content">
    <el-row class="main">
      <vk-date-picker v-model="startDate" types="datetime" placeholder="请选择开始时间" />
    </el-row>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        startDate: ''
      };
    },
    created() {
      
    },
    mounted() {
      
    },
    methods: {},
    computed: {},
    watch: {
      startDate(val) {
        console.log(val)
      }
    },
    components: {
    }
  };
</script>
<style lang="scss" scoped>
  .content {
    width: 100%;
    height: calc(100% - 55px);
    overflow-y: hidden !important;
    overflow-x: auto;
  }
</style>