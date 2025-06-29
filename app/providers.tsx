'use client'

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { ToastProvider } from './components/ui/Toast'
import { AudioProvider } from './components/providers/AudioProvider'
import { ProgressProvider } from './components/providers/ProgressProvider'

// Detect if device supports touch
const isMobile = () => {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

export function Providers({ children }: { children: React.ReactNode }) {
  const backend = isMobile() ? TouchBackend : HTML5Backend
  
  return (
    <DndProvider backend={backend}>
      <ToastProvider>
        <AudioProvider>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </AudioProvider>
      </ToastProvider>
    </DndProvider>
  )
} 