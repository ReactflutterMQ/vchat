import { reactive } from 'vue'

export interface ToastOption {
  id: number
  type: 'success' | 'warning' | 'error' | 'info'
  message: string
  duration?: number
}

const toasts: ToastOption[] = reactive([])
let seed = 0

export function addToast(opt: Omit<ToastOption, 'id'>) {
  const id = ++seed
  toasts.push({ ...opt, id })
  setTimeout(() => removeToast(id), opt.duration ?? 3000)
}

export function removeToast(id: number) {
  const idx = toasts.findIndex(t => t.id === id)
  if (idx > -1) toasts.splice(idx, 1)
}

export const messageStore = { toasts, addToast, removeToast }