<template>
  <div class="row">
    <div class="cell cell--labels">
      <div class="label">Метки</div>
      <el-input v-model="labelsInput" placeholder="Введите метку" @blur="saveLabels" />
    </div>

    <div class="cell cell--type">
      <div class="label">Тип записи</div>
      <el-select v-model="typeValue" @change="handleTypeChange">
        <el-option label="LDAP" value="LDAP" />
        <el-option label="LOCAL" value="LOCAL" />
      </el-select>
    </div>

    <div class="cell cell--login">
      <div class="label">Логин</div>
      <el-input v-model='loginValue' placeholder='Введите логин' @blur='saveLogin' />
    </div>

    <div class="cell cell--password">
      <div class="label">Пароль</div>

      <el-input
        v-if="typeValue === 'LOCAL'"
        v-model="passwordValue"
        type="password"
        show-password
        placeholder="Введите пароль"
        @blur="savePassword"
      />

      <el-input v-else disabled placeholder="Для LDAP пароль не требуется" />
    </div>

    <div class="cell cell--actions">
      <div class="label label--hidden">Действия</div>
      <el-button type="danger" text @click="emit('remove', account.id)">Удалить</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Account, AccountType } from '../../types/accounts'

type Props = {
  account: Account
  onUpdate: (id: string, patch: Partial<Account>) => void
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'remove', id: string): void
}>()

const labelsInput = ref('')
const typeValue = ref<AccountType>('LOCAL')
const loginValue = ref('')
const passwordValue = ref('')

function syncFromProps() {
  // TODO: сделать преобразование labels[] -> string

  labelsInput.value = ''
  typeValue.value = props.account.type
  loginValue.value = props.account.login
  passwordValue.value = props.account.password ?? ''
}

watch(
  () => props.account,
  () => syncFromProps(),
  { immediate: true }
)

function saveLabels() {
  // TODO: сделать парсинг строки в [{ text }] 
  
  props.onUpdate(props.account.id, {
    labels: []
  })
}

function saveLogin() {
  props.onUpdate(props.account.id, {
    login: loginValue.value
  })
}

function savePassword() {
  props.onUpdate(props.account.id, {
    password: passwordValue.value
  })
}

function handleTypeChange(value: AccountType) {
  if (value === 'LDAP') {
    passwordValue.value = ''
    props.onUpdate(props.account.id, { type: value, password: null })
    return
  }
  
  props.onUpdate(props.account.id, { type: value, password: '' })
}
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 2.2fr 1.2fr 1.6fr 1.6fr 0.7fr;
  gap: 12px;
  align-items: end;

  padding: 14px 16px;
  border: 1px solid #ebeef5;
  border-radius: 12px;
  background: #fff;
}

.cell {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 12px;
  color: #909399;
}

.label--hidden {
  visibility: hidden;
}

.cell--actions {
  align-items: flex-end;
}
</style>
