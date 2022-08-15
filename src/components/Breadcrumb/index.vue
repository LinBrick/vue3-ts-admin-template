<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import pathToRegexp from 'path-to-regexp'

const router = useRouter()
const levelList = ref(null)

const isDashboard = (route) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const pathCompile = (path: string) => {
  const { params } = router.currentRoute.value
  return params
  // const toPath = pathToRegexp.compile(path)
  // return toPath(params)
}

const handleLink = (item: any) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}

const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched = router.currentRoute.value.matched.filter((item: any) => item.meta && item.meta.title)
  const first = matched[0]

  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
  }

  levelList.value = matched.filter((item: any) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

watch(() => router.currentRoute.value.path, (newValue, oldValue)=> {
  if (router.currentRoute.value.path.startsWith('/redirect/')) {
    return
  }
  getBreadcrumb()
}, { immediate: true })

onMounted(()=> {
  getBreadcrumb()
})
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>