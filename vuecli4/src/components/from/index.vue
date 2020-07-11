<template>
  <div>
    <x-form :model="formData" :rules="rules" ref="loginform">
      <x-form-item label="用户名" prop="userName">
        <x-input type="text" v-model="formData.userName" placeholder="请输入用户名"/>
      </x-form-item>
      <x-form-item  prop="userPWD">
        <x-input type="text" v-model="formData.userPWD" placeholder="请输入密码" />
      </x-form-item>
      <x-form-item>
        <button @click="submit"> 登录 </button>
      </x-form-item>
      <x-form-item>
        <button @click="open"> 打开弹窗 </button>
      </x-form-item>
    </x-form>
  </div>
</template>

<script>
import XInput from './XInput';
import XForm from './XForm';
import XFormItem from './XFormItem';
import create from './../Notice/create';
import Notice from './../Notice';
export default {
  name: "Form",
  data() {
    return {
      formData:{
        userName: '',
        userPWD:''
      },
      rules:{
        userName:[{required: true, message: '请输入用户名'}],
        userPWD:[{required: true, message:'请输入密码'}]
      }
    };
  },
  mounted() {},
  methods: {
    submit(){
      this.$refs.loginform.validate(isValif => {
        console.log(isValif)
      })
    },

    open(){
      const notice = create(Notice, {
        title: '弹窗',
        message: '内容'
      })
      notice.show();
    }
  },
  computed: {},
  watch: {},
  components:{
    XForm,
    XFormItem,
    XInput
  }
}
</script>

<style lang="scss" scoped>

</style>