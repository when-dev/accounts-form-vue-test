<template>
  <div class="page">
    <div class="container">
      <AccountsHeader @add="handleAdd" />

      <section class="content">
        <div class="hint">
          <span class="hint-icon">?</span>
          <span
            >Для указания нескольких меток для одной пары логин/пароль используйте разделитель
            ;</span
          >
        </div>
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

.hint {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: nowrap;

  padding: 10px 14px;
  margin-bottom: 16px;

  background: #f5f7fa;
  border-radius: 10px;

  font-size: 15px;
  font-weight: 400;
  color: #606266;
}

.hint-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 18px;
  height: 18px;

  min-width: 18px;
  flex-shrink: 0;

  border-radius: 50%;
  border: 2px solid #c0c4cc;

  font-size: 15px;
  font-weight: 600;
  color: #909399;
}

@media (max-width: 600px) {
  .page {
    padding: 12px;
  }

  .content {
    padding: 12px;
  }
  
  .hint {
    align-items: flex-start;
  }
}
</style>
