'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
// Animation removed - using regular components
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}

const toastColors = {
  success: 'border-success-200 bg-success-50 text-success-800',
  error: 'border-error-200 bg-error-50 text-error-800',
  warning: 'border-warning-200 bg-warning-50 text-warning-800',
  info: 'border-primary-200 bg-primary-50 text-primary-800'
}

const iconColors = {
  success: 'text-success-500',
  error: 'text-error-500',
  warning: 'text-warning-500',
  info: 'text-primary-500'
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration || 5000)
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div className="fixed top-4 left-4 z-50 max-w-md w-full space-y-2">
        <>
          {toasts.map((toast) => {
            const Icon = toastIcons[toast.type]
            return (
              <div
                key={toast.id}
                className={`rounded-lg border p-4 shadow-lg backdrop-blur-sm ${toastColors[toast.type]}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconColors[toast.type]}`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{toast.title}</h4>
                    {toast.message && (
                      <p className="text-sm opacity-90 mt-1">{toast.message}</p>
                    )}
                    {toast.action && (
                      <button
                        onClick={toast.action.onClick}
                        className="text-sm font-medium underline mt-2 hover:no-underline"
                      >
                        {toast.action.label}
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => hideToast(toast.id)}
                    className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </>
      </div>
    </ToastContext.Provider>
  )
} 

