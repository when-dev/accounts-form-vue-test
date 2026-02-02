import type { LabelItem } from '../types/accounts'

export function parseLabels(input: string): LabelItem[] {
	return input
		.split(';')
		.map(part => part.trim())
		.filter(part => part.length > 0)
		.map(text => ({ text }))
}

export function serializeLabels(labels: LabelItem[]): string {
	return labels.map(l => l.text).join('; ')
}