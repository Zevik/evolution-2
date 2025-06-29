'use client'

import React, { createContext, useContext, useCallback } from 'react'
import { useLearningStore } from '../../store/learningStore'

interface AudioContextType {
  playSuccess: () => void
  playError: () => void
  playClick: () => void
  playLevelUp: () => void
  playAchievement: () => void
  playNotification: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

// Audio frequencies for different sounds (using Web Audio API)
const createBeep = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  if (typeof window === 'undefined') return

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = frequency
  oscillator.type = type
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

const createComplexSound = (notes: { freq: number; duration: number; delay: number }[]) => {
  if (typeof window === 'undefined') return

  notes.forEach(({ freq, duration, delay }) => {
    setTimeout(() => createBeep(freq, duration), delay)
  })
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const soundEnabled = useLearningStore(state => state.soundEnabled)

  const playSuccess = useCallback(() => {
    if (!soundEnabled) return
    // Happy ascending chord
    createComplexSound([
      { freq: 523.25, duration: 0.2, delay: 0 },    // C5
      { freq: 659.25, duration: 0.2, delay: 100 },  // E5
      { freq: 783.99, duration: 0.3, delay: 200 }   // G5
    ])
  }, [soundEnabled])

  const playError = useCallback(() => {
    if (!soundEnabled) return
    // Descending disappointed sound
    createComplexSound([
      { freq: 400, duration: 0.2, delay: 0 },
      { freq: 300, duration: 0.3, delay: 150 }
    ])
  }, [soundEnabled])

  const playClick = useCallback(() => {
    if (!soundEnabled) return
    createBeep(800, 0.1, 'square')
  }, [soundEnabled])

  const playLevelUp = useCallback(() => {
    if (!soundEnabled) return
    // Triumphant fanfare
    createComplexSound([
      { freq: 523.25, duration: 0.15, delay: 0 },   // C5
      { freq: 659.25, duration: 0.15, delay: 50 },  // E5
      { freq: 783.99, duration: 0.15, delay: 100 }, // G5
      { freq: 1046.5, duration: 0.4, delay: 150 }   // C6
    ])
  }, [soundEnabled])

  const playAchievement = useCallback(() => {
    if (!soundEnabled) return
    // Special achievement chime
    createComplexSound([
      { freq: 880, duration: 0.2, delay: 0 },     // A5
      { freq: 1108.73, duration: 0.2, delay: 100 }, // C#6
      { freq: 1318.51, duration: 0.3, delay: 200 }  // E6
    ])
  }, [soundEnabled])

  const playNotification = useCallback(() => {
    if (!soundEnabled) return
    createComplexSound([
      { freq: 600, duration: 0.1, delay: 0 },
      { freq: 900, duration: 0.15, delay: 80 }
    ])
  }, [soundEnabled])

  return (
    <AudioContext.Provider value={{
      playSuccess,
      playError,
      playClick,
      playLevelUp,
      playAchievement,
      playNotification
    }}>
      {children}
    </AudioContext.Provider>
  )
} 

