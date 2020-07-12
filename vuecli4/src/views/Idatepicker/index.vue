<template>
  <div>
      <p>日期组件</p>
      <br>
      <vk-date-picker type="datetime" v-model="startTime" placeholder="请选择开始时间"/>
      <br>
      <vk-date-picker type="date" v-model="endTime" placeholder="请选择结束时间"/>
  </div>
</template>

<script>
  export default {
    name: "datepicker",
    data() {
      return {
        startTime: '',
        endTime: '1399-04-19 15:30'
      };
    },
    mounted() {},
    methods: {},
    computed: {},
    watch: {
    },
  };
</script>
<style lang="scss" scoped>

</style>