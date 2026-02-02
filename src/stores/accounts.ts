import { defineStore } from 'pinia'
import type { Account } from '../types/accounts'

type AccountsState = {
  accounts: Account[]
}

function createEmptyAccount(): Account {
  return {
    id: crypto.randomUUID(),
    labels: [],
    type: 'LOCAL',
    login: '',
    password: '',
  }
}

const STORAGE_KEY = 'accounts-form-data'

function loadAccounts(): Account[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveAccounts(accounts: Account[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
}

export const useAccountsStore = defineStore('accounts', {
  state: (): AccountsState => ({
    accounts: loadAccounts(),
  }),

  actions: {
    addedAccount() {
      this.accounts.push(createEmptyAccount())
      saveAccounts(this.accounts)
    },

    removedAccount(id: string) {
      this.accounts = this.accounts.filter((account) => account.id !== id)
      saveAccounts(this.accounts)
    },

    updateAccount(id: string, patch: Partial<Account>) {
      const account = this.accounts.find((item) => item.id === id)
      if (!account) return

      Object.assign(account, patch)
      saveAccounts(this.accounts)
    },
  },
})
