<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          系统登录
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <SvgIcon name="user" color="#889aa4" />
        </span>
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          placeholder="账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="svg-container">
            <SvgIcon name="password" color="#889aa4" />
          </span>
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin(loginFormRef)"
          />
          <span
            class="show-pwd"
            @click="showPwd(passwordRef)"
          >
            <SvgIcon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" color="#889aa4" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%; margin-bottom:30px;"
        @click.native.prevent="handleLogin(loginFormRef)"
      >
        登录
      </el-button>

      <div style="position:relative">
        <div class="tips">
          <span>账号 : admin </span>
          <span>密码 : 随便填 </span>
        </div>
        <div class="tips">
          <span>账号 : editor </span>
          <span>密码 : 随便填 </span>
        </div>

        <el-button
          class="thirdparty-button"
          type="primary"
          @click="showDialog=true"
        >
          第三方登录
        </el-button>
      </div>
    </el-form>

    <el-dialog
      title="第三方登录"
      v-model="showDialog"
    >
      本地不能模拟，请结合自己业务进行模拟！！！
      <br>
      <br>
      <br>
      <SocialSign />
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="Login">
import SocialSign from './components/SocialSignin.vue'
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { isValidUsername } from '@/utils/validate'
import { useStore } from 'vuex'

const store = useStore()

const router = useRouter()

const validateUsername = (rule: any, value: string, callback: Function) => {
  if (!isValidUsername(value)) {
    callback(new Error('Please enter the correct user name'))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, value: string, callback: Function) => {
  if (value.length < 6) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}

const loginForm = reactive({
  username: 'admin',
  password: '111111'
})

const loginRules = reactive<FormRules>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
})

const passwordType = ref('password')
const loading = ref(false)
const showDialog = ref(false)
const capsTooltip = ref(false)
const redirect =  ref('')
const otherQuery: any = reactive({})

// 元素的ref
const loginFormRef = ref<FormInstance>()

const onRouteChange = (route: any)=> {
  const query = route.query
  if (query) {
    redirect.value = query.redirect
    otherQuery.value = getOtherQuery(query)
  }
}

const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e
  capsTooltip.value = key !== null && key.length === 1 && (key >= 'A' && key <= 'Z')
}

const showPwd = (passwordRef: FormInstance) => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
}

const handleLogin = (loginFormRef: FormInstance) => {
  loginFormRef.validate(async(valid: boolean) => {
    if (valid) {
      loading.value = true
      await store.dispatch('Login', loginForm)
      router.push({
        path: redirect.value || '/',
        query: otherQuery
      })
      setTimeout(() => {
        loading.value = false
      }, 0.5 * 1000)
    } else {
      return false
    }
  })
}

const getOtherQuery = (query: any)=> {
  return Object.keys(query).reduce((acc: any, cur: any) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}
</script>

<style lang="scss">
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input__wrapper {
    width: 85%;
    background: none;
    border: 0;
    box-shadow: none !important;
    padding: 0;
    input { color: $loginCursorColor; }
    input::first-line { color: $lightGray; }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      width: 100%;
      height: 47px;
      background: none;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;

  .login-form {
    position: relative;
    width: 450px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 9px 5px 6px 15px;
    color: $darkGray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $lightGray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

