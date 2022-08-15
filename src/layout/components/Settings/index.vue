<template>
  <div class="drawer-container">
    <!-- <div>
      <h3 class="drawer-title">
        系统登录
      </h3>

      <div class="drawer-item">
        <span>主题色</span>
        <theme-picker
          style="float: right;height: 26px;margin: -3px 8px 0 0;"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>显示 Tags-View</span>
        <el-switch
          v-model="showTagsView"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>显示侧边栏 Logo</span>
        <el-switch
          v-model="showSidebarLogo"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch
          v-model="fixedHeader"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>侧边栏文字主题色</span>
        <el-switch
          v-model="sidebarTextTheme"
          class="drawer-switch"
        />
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
