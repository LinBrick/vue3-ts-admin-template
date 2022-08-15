<template>
  <div class="navbar">
    <Hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <Breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <HeaderSearch class="right-menu-item" />
        <ErrorLog class="errLog-container right-menu-item hover-effect" />
        <Screenfull class="right-menu-item hover-effect" />
        <el-tooltip
          :content="$t('navbar.size')"
          effect="dark"
          placement="bottom"
        >
          <SizeSelect class="right-menu-item hover-effect" />
        </el-tooltip> -->
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            :src="avatar+'?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/">
            <el-dropdown-item>
              个人中心
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a
            target="_blank"
            href="https://github.com/LinBrick/vue3-ts-admin-template/"
          >
            <el-dropdown-item>
              项目地址
            </el-dropdown-item>
          </a>
          <a
            target="_blank"
            href="https://armour.github.io/vue-typescript-admin-docs/"
          >
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display:block;">
              退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts" name="Navbar">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
// import ErrorLog from '@/components/ErrorLog/index.vue'
import Hamburger from '@/components/Hamburger/index.vue'
// import HeaderSearch from '@/components/HeaderSearch/index.vue'
// import Screenfull from '@/components/Screenfull/index.vue'
// import SizeSelect from '@/components/SizeSelect/index.vue'

const store = useStore()
const router = useRouter()

const sidebar = ref(store.state.app.sidebar)
const device = ref(store.state.app.device.toString())
const avatar = ref(store.state.user.avatar)

const toggleSideBar = () => {
  store.dispatch('ToggleSideBar', false)
}

const logout = async () => {
  await store.dispatch('LogOut')
  router.push(`/login?redirect=${router.currentRoute.value.fullPath}`).catch(err => {
    console.warn(err)
  })
}

</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
