<template>
  <div class="social-signup-container">
    <div
      class="sign-btn"
      @click="wechatHandleClick('wechat')"
    >
      <span class="wx-svg-container"><SvgIcon
        name="wechat"
        class="icon"
      /></span> 微信
    </div>
    <div
      class="sign-btn"
      @click="tencentHandleClick('tencent')"
    >
      <span class="qq-svg-container"><SvgIcon
        name="qq"
        class="icon"
      /></span> QQ
    </div>
  </div>
</template>

<script setup lang="ts">
const wechatHandleClick = (param: string)=> {
  alert('handle ' + param + ' here')
}

const tencentHandleClick = (param: string)=> {
  alert('handle ' + param + ' here')
}
</script>

<style lang="scss" scoped>
.social-signup-container {
  margin: 20px 0;

  .sign-btn {
    display: inline-block;
    cursor: pointer;
  }

  .icon {
    color: #fff;
    font-size: 24px;
    margin-top: 8px;
  }

  .wx-svg-container,
  .qq-svg-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding-top: 1px;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 5px;
  }

  .wx-svg-container {
    background-color: #24da70;
  }

  .qq-svg-container {
    background-color: #6BA2D6;
    margin-left: 50px;
  }
}
</style>
