<template>
  <el-container class="content">
    <el-row class="main">
      <DatePicker type="datetime" placeholder="请选择开始时间66" v-model="startDate"  />
    </el-row>
  </el-container>
</template>

<script>
  import DatePicker from '@/components/DatePicker'
  export default {
    name: "Home",
    data() {
      return {
        startDate:'2012-07-06 02:03'
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