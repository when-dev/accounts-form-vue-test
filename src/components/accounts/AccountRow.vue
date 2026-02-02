<template>
  <div class="row">
    <div class="cell cell--labels">
      <div class="label">Метки</div>
      <el-input
        v-model="labelsInput"
        placeholder="Введите метку"
        :valiadate-status="errors.labels ? 'error' : ''"
        @blur="saveLabels"
      />
      <div v-if="errors.labels" class="error">{{ errors.labels }}</div>
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
      <el-input
        v-model="loginValue"
        placeholder="Введите логин"
        :validate-status="errors.login ? 'error' : ''"
        @blur="saveLogin"
      />
      <div v-if="errors.login" class="error">{{ errors.login }}</div>
    </div>

    <div class="cell cell--password">
      <div class="label">Пароль</div>

      <el-input
        v-if="typeValue === 'LOCAL'"
        v-model="passwordValue"
        type="password"
        show-password
        placeholder="Введите пароль"
        :validate-status="errors.password ? 'error' : ''"
        @blur="savePassword"
      />
      <div v-if="typeValue === 'LOCAL' && errors.password" class="error">
        {{ errors.password }}
      </div>

      <el-input v-else disabled placeholder="Для LDAP пароль не требуется" />
    </div>

    <div class="cell cell--actions">
      <div class="label label--hidden">Действия</div>
      <el-button type="danger" text @click="emit('remove', account.id)">Удалить</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import type { Account, AccountType } from '../../types/accounts'
import { parseLabels, serializeLabels } from '../../utils/labels'
import { validateLabels, validateLogin, validatePassword } from '../../utils/validation'

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
const errors = reactive({
  labels: '',
  login: '',
  password: '',
})

function syncFromProps() {
  labelsInput.value = serializeLabels(props.account.labels)
  typeValue.value = props.account.type
  loginValue.value = props.account.login
  passwordValue.value = props.account.password ?? ''
}

watch(
  () => props.account,
  () => syncFromProps(),
  { immediate: true },
)

function saveLabels() {
  const error = validateLabels(labelsInput.value)
  errors.labels = error ?? ''

  if (errors.labels) {
    return
  }

  const labels = parseLabels(labelsInput.value)
  props.onUpdate(props.account.id, {
    labels,
  })
}

function saveLogin() {
  const error = validateLogin(loginValue.value)
  errors.login = error ?? ''

  if (errors.login) {
    return
  }

  props.onUpdate(props.account.id, {
    login: loginValue.value,
  })
}

function savePassword() {
  const error = validatePassword(passwordValue.value, typeValue.value)
  errors.password = error ?? ''

  if (errors.password) {
    return
  }

  props.onUpdate(props.account.id, {
    password: passwordValue.value,
  })
}

function handleTypeChange(value: AccountType) {
  typeValue.value = value

  if (value === 'LDAP') {
    errors.password = ''
    passwordValue.value = ''
    props.onUpdate(props.account.id, { type: value, password: null })
    return
  }
  // Для Local пароль обязателен, но пока user не ввёл - будет пустая строка
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
.error {
  font-size: 12px;
  color: #f56c6c;
  line-height: 1.2;
}
</style>
