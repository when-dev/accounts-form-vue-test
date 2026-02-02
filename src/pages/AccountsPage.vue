<template>
  <div class="page">
    <div class="container">
      <AccountsHeader @add="handleAdd" />

      <!-- TODO: добавить подсказку по меткам -->
      <!-- TODO: добавить список учетных записей -->
      <section class="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AccountsHeader from '../components/accounts/AccountHeader.vue'

function handleAdd() {
  // TODO: подключить store и реализовать добавление учетной записи
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
</style>
