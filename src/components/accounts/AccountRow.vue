<template>
  <div class="row" :class="{ 'row--ldap': isLdap }">
    <div class="cell cell--labels">
      <div class="label">Метки</div>
      <el-input
        v-model="labelsInput"
        placeholder="Введите метку"
        :validate-status="errors.labels ? 'error' : ''"
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

    <div class="cell cell--login" :class="{ 'cell--login-wide': isLdap }">
      <div class="label">Логин</div>
      <el-input
        v-model="loginValue"
        placeholder="Введите логин"
        :validate-status="errors.login ? 'error' : ''"
        @blur="saveLogin"
      />
      <div v-if="errors.login" class="error">{{ errors.login }}</div>
    </div>

    <div v-if="!isLdap" class="cell cell--password">
      <div class="label">Пароль</div>
      <el-input
        v-model="passwordValue"
        type="password"
        show-password
        placeholder="Введите пароль"
        :validate-status="errors.password ? 'error' : ''"
        @blur="savePassword"
      />
      <div v-if="errors.password" class="error">{{ errors.password }}</div>
    </div>

    <div class="cell cell--actions">
      <div class="label label--hidden">Действия</div>
      <el-button class="delete-btn" type="danger" @click="emit('remove', account.id)">
        Удалить
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'
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
const isLdap = computed(() => typeValue.value === 'LDAP')
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
  if (typeValue.value === 'LDAP') {
    return
  }

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

  // Для Local пароль обязателен
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
  min-height: 72px;
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

.row--ldap {
  grid-template-columns: 2.2fr 1.2fr 3.2fr 0.7fr;
}

.row--login-wide {
  grid-column: span 2;
}

.delete-btn:hover {
  background-color: #e45656;
  color: #ffffff;
}


@media (max-width: 900px) {
  .row {
    grid-template-columns: 1.6fr 1fr 1.6fr;
  }

  .cell--password {
    grid-column: 1 / -1;
  }

  .cell--actions {
    grid-column: 1 / -1;
    align-items: flex-start;
    width: 100%;
  }

  :deep(.delete-btn.el-button.is-text:hover),
  :deep(.delete-btn.el-button.is-text:focus) {
    background-color: #e45656 !important;
    color: #fff !important;
    opacity: 1 !important;
  }

  .delete-btn {
    width: 100%;
    justify-content: center;
    padding: 12px 0;

    background-color: #f56c6c;
    color: white;
    border: none;

    transition: all 0.2s ease;
  }
  
  .delete-btn:active {
    background-color: #d64545;
    transform: scale(0.98);
  }
}

@media (max-width: 600px) {
  .row {
    grid-template-columns: 1fr;
    align-items: stretch;
  }

  .cell--actions {
    align-items: flex-start;
  }

  .cell--actions :deep(.el-button) {
    padding-left: 0;
  }

  .delete-btn {
    font-weight: 500;
    letter-spacing: 0.2px;
  }
}
</style>
