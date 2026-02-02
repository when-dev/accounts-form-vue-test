<template>
  <div class="list">
    <AccountRow
      v-for="account in accounts"
      :key="account.id"
      :account="account"
      :onUpdate='handleUpdate'
      @remove="handleRemove"
    />
  </div>
</template>

<script setup lang="ts">
import AccountRow from './AccountRow.vue'
import type { Account } from '../../types/accounts'

type Props = {
  accounts: Account[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'remove', id: string): void
  (e: 'update', id: string, patch: Partial<Account>): void
}>()

function handleRemove(id: string) {
  emit('remove', id)
}

function handleUpdate(id: string, patch: Partial<Account>) {
  emit('update', id, patch)
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
