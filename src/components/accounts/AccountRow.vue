<template>
  <div class="row">
    <div class="info">
      <div class="label">
        Запись
        <span class="id">#{{ shortId }}</span>
      </div>
      <div class="meta">
        Тип: <strong>{{ account.type }}</strong>
      </div>
    </div>
    <el-button type="danger" text @click="emit('remove', account.id)"> Удалить </el-button>
  </div>
</template>

<script setup lang="ts">
import type { Account } from '../../types/accounts'

type Props = {
  account: Account
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'remove', id: string): void
}>()

const shortId = props.account.id.slice(0, 6)
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 14px 16px;
  border: 1px solid #ebeef5;
  border-radius: 12px;
  background: #fff;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-size: 14px;
  color: #303133;
}

.id {
  margin-left: 6px;
  color: #909399;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.meta {
  font-size: 12px;
  color: #606266;
}
</style>
