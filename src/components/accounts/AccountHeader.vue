<template>
  <header class="header">
    <div class="left">
      <h1 class="title">Учетные записи</h1>
      <p class="subtitle">
        Управление учетными записями пользователей
      </p>
    </div>

    <el-button
      type="primary"
      :icon="Plus"
      circle
      @click="emit('add')"
    />
  </header>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'

const emit = defineEmits<{
  (e: 'add'): void
}>()
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 18px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #ebeef5;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.subtitle {
  margin: 0;
  font-size: 13px;
  color: #909399;
}
</style>
