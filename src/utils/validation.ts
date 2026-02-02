import type { AccountType } from '../types/accounts'

export type FieldErrors = {
  labels?: string
  login?: string
  password?: string
}

type ValidationError = string | undefined

export function validateLabels(input: string): ValidationError {
  if (input.length === 0) return undefined
  if (input.length > 50) return 'Максимум 50 символов'
  return undefined
}

export function validateLogin(input: string): ValidationError {
  if (input.trim().length === 0) return 'Пароль обязателен'
  if (input.length > 100) return 'Максимум 100 символов'
  return undefined
}

export function validatePassword(input: string, type: AccountType): ValidationError {
  if (type === 'LDAP') return undefined
  if (input.trim().length === 0) return 'Пароль обязателен'
  if (input.length > 100) return 'Максимум 100 символов'
  return undefined
}
