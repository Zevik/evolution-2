'use client'

import React from 'react'
import { ToastProvider } from './components/ui/Toast'
import { AudioProvider } from './components/providers/AudioProvider'
import { ProgressProvider } from './components/providers/ProgressProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AudioProvider>
        <ProgressProvider>
          {children}
        </ProgressProvider>
      </AudioProvider>
    </ToastProvider>
  )
} 