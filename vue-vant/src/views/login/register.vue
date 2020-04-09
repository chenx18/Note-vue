<template>
  <div class="container">
    <div class="main">
      <h3 style="color:#fff">注册</h3>
      <div class="item">
        <label for>账号：</label>
        <input type="text" class="form_input" placeholder="设置账号" v-model.trim="username" />
      </div>
      <div class="item">
        <label for>密码 ：</label>
        <input type="text" class="form_input" placeholder="设置密码" v-model.trim="password" />
      </div>
      <div class="item">
        <label for>手机号：</label>
        <input type="text" class="form_input" placeholder="设置手机号" v-model.trim="phone" />
      </div>
      <div class="item-btn">
        <button type="button" @click="registerClick">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
import Api from "./../../utils/api";
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      phone: ""
    };
  },
  mounted() {},
  methods: {
    registerClick() {
      if (this.username && this.password && this.phone) {
        const params = {
          UserName: this.username,
          Password: this.password,
          PhoneNo: this.phone
        };
        Api.Registering(params).then(res => {
          console.log(res.data);
          if (res.data.Code === 1) {
            console.log("注册成功");
            // this.$router.back(-1);
          }
        });
      }
    }
  },
  computed: {},
  watch: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.container {
  width: 100% !important;
  height: 100%;
  overflow: hidden;
  background: url("./../../assets/image/logins/login-bg.jpg") no-repeat right
    20px;
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
          color: #fff;
        }

        &:active {
          background: #3a8ee6;
          border-color: #3a8ee6;
          color: #fff;
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