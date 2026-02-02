<template>
  <div class="page">
    <div class="container">
      <AccountsHeader @add="handleAdd" />

      <section class="content">
        <!-- TODO: добавить подсказку по меткам -->
        <!-- TODO: добавить список учетных записей -->
        <div class="meta">
          Всего записей: <strong>{{ accountsStore.accounts.length }}</strong>
        </div>

        <AccountsList
          :accounts="accountsStore.accounts"
          @remove="handleRemove"
          @update="handleUpdate"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountsHeader from '../components/accounts/AccountHeader.vue'
import AccountsList from '@/components/accounts/AccountsList.vue'
import type { Account } from '../types/accounts'
import { useAccountsStore } from '../stores/accounts'

const accountsStore = useAccountsStore()

function handleAdd() {
  accountsStore.addedAccount()
}

function handleRemove(id: string) {
  accountsStore.removedAccount(id)
}

function handleUpdate(id: string, patch: Partial<Account>) {
  accountsStore.updateAccount(id, patch)
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 24px;
  background: #f5f7fa;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.content {
  margin-top: 16px;
  padding: 16px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #ebeef5;
}
.meta {
  margin-bottom: 12px;
  font-size: 13px;
  color: #606266;
}
</style>
