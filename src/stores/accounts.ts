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

export const useAccountsStore = defineStore('accounts', {
	state: (): AccountsState => ({
		accounts: [],
	}),

	actions: {
		addedAccount() {
			this.accounts.push(createEmptyAccount())
		},

		removedAccount(id: string) {
			this.accounts = this.accounts.filter(account => account.id !== id)
		}
	}
})