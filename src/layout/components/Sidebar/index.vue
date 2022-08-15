<template>
  <div :class="{'has-logo': showLogo}">
    <!-- <SidebarLogo
      v-if="showLogo"
      :collapse="isCollapse"
    />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar> -->
  </div>
</template>

<script setup lang="ts" name="SideBar">
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'

const store = useStore()
const router = useRouter()

const sidebar = reactive(store.state.app.sidebar)
console.log(sidebar)
const routes = ref(store.state.permission.routes)
const showLogo = ref(store.state.settings.showLogo)
const menuActiveTextColor = ref(store.state.settings.sidebarTextTheme ? store.state.settings.theme : '#409EFF')
const activeMenu = ref(router.currentRoute.value.meta && router.currentRoute.value.meta.activeMenu ? router.currentRoute.value.meta.activeMenu : '')
const isCollapse = ref(!sidebar.opened)
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
