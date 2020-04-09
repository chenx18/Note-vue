<template>
  <div class="container">
    <div class="main">
      <div class="logo">
        <img src="@/assets/image/logins/logo-feed.jpg" />
      </div>
      <div class="item">
        <label for="">账号：</label>
        <input type="text" class="form_input" placeholder="请输入姓名" v-model.trim="username" />
      </div>
      <div class="item">
        <label for="">密码：</label>
        <input type="text" class="form_input" placeholder="请输入密码" v-model.trim="password" />
      </div>
      <div class="item-btn">
        <button type="button" @click="login">登录</button>
      </div>
      <div class="register" @click="goRegister">注册新用户</div>
    </div>
  </div>
</template>

<script>
  import Api from './../../utils/api'
  export default {
    name: 'Login',
    data() {
      return {
        username: 'test',
        password: '123456'
      }
    },
    mounted() {},
    methods: {
      // 注册
      goRegister() {
        this.$router.push({path: '/register'})
      },
      // 登录
      login(){
        if(this.username&&this.password){
          const params = {
            UserName: this.username,
            Password: this.password
          }
          Api.Loging(params).then(res => {
            let data = res.data.Data;
            if(res.data.Code === 1) {
              const user = {
                Id: data.UserId,
                name: data.NickName,
                account: data.UserAccount,
                phone: data.PhoneNo,
                icon: data.NickImg,
              }
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('token', data.token);
              this.$router.push({path: '/index'})
            }
          })
        }
      }
    },
    computed: {},
    watch: {},
    components: {}
  }
</script>

<style lang="scss" scoped>
  .container {
    width: 100% !important;
    height: 100%;
    overflow: hidden;
    background: url('./../../assets/image/logins/login-bg.jpg') no-repeat right 20px;
    background-size: auto 100%;
    position: relative;

    .main {
      width: 70%;
      padding: 10px;
      margin: auto;
      position: absolute;
      box-sizing: border-box;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      -webkit-transform: translateX(-50%) translateY(-50%);

      .logo {
        width: 60px;
        height: 60px;
        border-radius: 100%;
        overflow: hidden;
        margin: 0 auto 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .item {
        margin-bottom: 15px;
        border-bottom: 1px solid #ccc;
        color: #fff;

        label {
          width: 20%;
        }

        input {
          width: 80%;
          border: none;
          padding-left: 10px;
          height: 40px;
          border-radius: 5px;
          border: none;
          background: none;
          cursor: pointer;
          box-sizing: border-box;
        }

        input:focus {
          outline: none;
          border: none;
        }

        :-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: rgb(236, 236, 236);
        }

        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: rgb(236, 236, 236);
        }

        input:-ms-input-placeholder,
        textarea:-ms-input-placeholder {
          color: rgb(236, 236, 236);
        }

        input::-webkit-input-placeholder,
        textarea::-webkit-input-placeholder {
          color: rgb(236, 236, 236);
        }

      }

      .item-btn {
        button {
          width: 100%;
          border: none;
          color: #fff;
          background: #66b1ff;
          padding: 10px;
          border-radius: 20px;

          &:hover {
            background: #66b1ff;
            border-color: #66b1ff;
            color: #FFF;
          }

          &:active {
            background: #3a8ee6;
            border-color: #3a8ee6;
            color: #FFF;
          }
        }
      }

      .register {
        color: #fff;
        margin: 10px;
        padding: 10px;
        text-align: center;

        &:active {
          color: #66b1ff;
        }
      }

    }
  }
</style>