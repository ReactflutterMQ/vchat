import { messageStore } from './messageStore'
import type { ToastOption } from './messageStore'

type MsgOpt = string | Pick<ToastOption, 'message' | 'duration'>

function normalize(opt: MsgOpt, type: ToastOption['type']) {
  const o = typeof opt === 'string' ? { message: opt } : opt
  messageStore.addToast({ ...o, type })
}

export const useMessage = () => ({
  success: (o: MsgOpt) => normalize(o, 'success'),
  warning: (o: MsgOpt) => normalize(o, 'warning'),
  error:   (o: MsgOpt) => normalize(o, 'error'),
  info:    (o: MsgOpt) => normalize(o, 'info'),
})