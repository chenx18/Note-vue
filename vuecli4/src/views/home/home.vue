<template>
  <el-container class="content">
    <el-row class="main">
      <DatePicker/>
    </el-row>
  </el-container>
</template>

<script>
  import DatePicker from '@/components/DatePicker'
  export default {
    name: "Home",
    data() {
      return {};
    },
    created() {
    
    },
    mounted() {
      
    },
    methods: {},
    computed: {},
    watch: {},
    components: {
      DatePicker
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