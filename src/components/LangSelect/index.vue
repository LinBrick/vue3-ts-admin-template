<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon
        name="language"
        class="international-icon"
      />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="language==='zh'"
        command="zh"
      >
        中文
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language==='en'"
        command="en"
      >
        English
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language==='es'"
        command="es"
      >
        Español
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language==='ja'"
        command="ja"
      >
        日本語
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language==='ko'"
        command="ko"
      >
        한국어
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language==='it'"
        command="it"
      >
        Italiano
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script setup lang="ts" name="LangSelect">
import { ref } from 'vue'

const language = ref('zh')

const handleSetLanguage = (lang: string)=> {
  
}
</script>
