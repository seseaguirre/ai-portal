import { create } from 'zustand'
import type { AppNotification } from '@/types'
import { seedNotifications } from '@/data/notifications'

interface NotificationState {
  notifications: AppNotification[]
  markAllRead: () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: seedNotifications,
  markAllRead: () =>
    set((prev) => ({
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    })),
}))
