<template>
  <div>
    <x-from>
      <x-from-item>
        <x-input type="text" v-model="userName" placeholder="用户名" v-bind="$attrs"/>
      </x-from-item>
    </x-from>
  </div>
</template>

<script>
import XInput from './XInput';
import XFrom from './XFrom';
import XFromItem from './XFromItem'
export default {
  name: "From",
  data() {
    return {
      userName:""
    };
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
  components:{
    XFrom,
    XFromItem,
    XInput
  }
}
</script>

<style lang="scss" scoped>

</style>