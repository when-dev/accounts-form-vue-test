<template>
  <div class="list">
    <AccountRow
      v-for="account in accounts"
      :key="account.id"
      :account="account"
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
}>()

function handleRemove(id: string) {
  emit('remove', id)
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
