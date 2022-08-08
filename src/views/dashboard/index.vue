<script setup lang="ts" name="Dashboard">
import AdminDashboard from './admin/index.vue'
import EditorDashboard from './editor/index.vue'

const currentRole = 'admin-dashboard'
</script>

<template>
  <AdminDashboard v-if="currentRole === 'admin-dashboard'" />
  <EditorDashboard v-if="currentRole === 'editor-dashboard'" />
</template>