<template>
  <div class="login-wrapper">
    <el-card class="box-card" shadow="never">
      <div class="logo">
        <img alt="logo" :src="require('@/assets/logo.svg')">
        <span>FastAdmin</span>
      </div>
      <div class="site-title">基于Element UI实现的后台管理系统模板</div>
      <div class="input-group">
        <span>用户名</span>
        <el-input v-model="loginForm.username" placeholder="请输入用户名"><i slot="prefix" class="el-input__icon el-icon-user" /></el-input>
      </div>
      <div class="input-group">
        <span>密码</span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          name="password"
          tabindex="2"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        ><i slot="prefix" class="el-input__icon el-icon-lock" /><el-button @click="showPwd" slot="append"><svg-icon
          :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
        /></el-button></el-input>
      </div>
      <div class="input-group">
        <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
      </div>
      <div class="input-group">
        <el-button type="primary" @click="handleLogin()">立即登陆</el-button>
      </div>
      <div class="other">
        <div>
          忘记密码?
        </div>
        <div>
          <el-button icon="el-icon-search" size="small" circle />
          <el-button type="primary" icon="el-icon-edit" size="mini" circle />
          <el-button type="success" icon="el-icon-check" size="mini" circle />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
}

.logo{
  font-size: 28px;
  display: flex;
  align-items: center;
  height: 45px;
  font-weight: bold;
}

.logo img{
  width: 45px;
  height: 45px;
  margin-right: 10px;
}

.site-title{
  margin-top: 7px;
  font-size: 14px;
  color:#5a5e66;
  margin-bottom: 25px;
}

.box-card{
  width: 25rem;
  margin: 0 auto;
  padding: 15px;
  border-radius: 4px;
}

.input-group {
  display: flex;
  align-items: flex-start;
  margin-bottom: 18px;
  flex-direction: column;
}

.input-group span {
  margin-bottom: 10px;
  font-size: 14px;
  color:#5a5e66;
}

.input-group .el-button {
  width: 100%;
}

.other{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  font-size: 14px;
}
@media (max-width: 768px) {
  .login-wrapper {
    padding-top: 0;
  }
  .box-card{
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 15px;
    border-radius: 0;
  }
}
</style>
