<template>
  <div>
      <p>国内：</p>
      <!-- <vk-date-picker v-model="startDate" types="datetime" placeholder="请选择开始时间" /> -->
      <br/>
      <p>Irag</p>
      <irag-date-picker v-model="startDate2" types="datetime" placeholder="请选择开始时间" />
  </div>
</template>

<script>
  export default {
    name: "Idatepicker",
    data() {
      return {
        startDate: '',
        startDate2: '1399-04-19 15:30'
      };
    },
    mounted() {},
    methods: {},
    computed: {},
    watch: {
      startDate(val) {
        console.log(val)
      }
    },
  };
</script>
<style lang="scss" scoped>

</style>