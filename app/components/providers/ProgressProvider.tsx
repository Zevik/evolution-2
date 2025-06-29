'use client'

import React, { createContext, useContext, useEffect, useCallback } from 'react'
import { useLearningStore } from '../../store/learningStore'
import { useToast } from '../ui/Toast'
import { useAudio } from './AudioProvider'

interface ProgressContextType {
  trackEvent: (event: string, data?: any) => void
  recordTimeSpent: (activityId: string, timeMs: number) => void
  checkForAchievements: () => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast()
  const { playAchievement, playLevelUp } = useAudio()
  const {
    userProgress,
    unlockedAchievements,
    achievements,
    unlockAchievement,
    updateStreak
  } = useLearningStore()

  // Track events for analytics
  const trackEvent = useCallback((event: string, data?: any) => {
    if (typeof window !== 'undefined') {
      // In a real app, you'd send this to your analytics service
      console.log('Analytics Event:', event, data)
      
      // Store in localStorage for demo purposes
      const analytics = JSON.parse(localStorage.getItem('learning-analytics') || '[]')
      analytics.push({
        event,
        data,
        timestamp: new Date().toISOString(),
        userId: 'demo-user'
      })
      localStorage.setItem('learning-analytics', JSON.stringify(analytics.slice(-100))) // Keep last 100 events
    }
  }, [])

  // Record time spent on activities
  const recordTimeSpent = useCallback((activityId: string, timeMs: number) => {
    trackEvent('time_spent', { activityId, timeMs })
    
    // Award XP based on time spent (1 XP per minute, max 50 XP per activity)
    const xpAwarded = Math.min(Math.floor(timeMs / 60000), 50)
    if (xpAwarded > 0) {
      useLearningStore.getState().updateProgress(0, activityId, xpAwarded)
    }
  }, [trackEvent])

  // Check for new achievements
  const checkForAchievements = useCallback(() => {
    const state = useLearningStore.getState()
    
    // Check all achievement conditions
    achievements.forEach(achievement => {
      if (unlockedAchievements.includes(achievement.id)) return

      let shouldUnlock = false

      switch (achievement.id) {
        case 'first-lesson':
          shouldUnlock = state.userProgress.completedLessons.length >= 1
          break
        case 'streak-3':
          shouldUnlock = state.userProgress.streak >= 3
          break
        case 'perfect-score':
          // This is checked in individual activities
          break
        case 'speed-learner':
          // This is checked in individual activities
          break
        case 'persistent':
          shouldUnlock = state.userProgress.completedLessons.length >= 10
          break
      }

      if (shouldUnlock) {
        unlockAchievement(achievement.id)
        
        // Show achievement notification
        showToast({
          type: 'success',
          title: 'הישג חדש! 🎉',
          message: `${achievement.icon} ${achievement.title}`,
          duration: 6000
        })
        
        playAchievement()
        trackEvent('achievement_unlocked', { achievementId: achievement.id })
      }
    })
  }, [achievements, unlockedAchievements, unlockAchievement, showToast, playAchievement, trackEvent])

  // Check for level up
  useEffect(() => {
    const previousLevel = useLearningStore.getState().userProgress.level
    const currentLevel = userProgress.level
    
    if (currentLevel > previousLevel) {
      showToast({
        type: 'success',
        title: 'עליית רמה! ⭐',
        message: `הגעת לרמה ${currentLevel}!`,
        duration: 6000
      })
      
      playLevelUp()
      trackEvent('level_up', { newLevel: currentLevel, previousLevel })
    }
  }, [userProgress.level, showToast, playLevelUp, trackEvent])

  // Update streak on mount
  useEffect(() => {
    updateStreak()
    trackEvent('session_start')
    
    return () => {
      trackEvent('session_end')
    }
  }, [updateStreak, trackEvent])

  // Check achievements periodically
  useEffect(() => {
    const interval = setInterval(checkForAchievements, 2000)
    return () => clearInterval(interval)
  }, [checkForAchievements])

  return (
    <ProgressContext.Provider value={{
      trackEvent,
      recordTimeSpent,
      checkForAchievements
    }}>
      {children}
    </ProgressContext.Provider>
  )
} 