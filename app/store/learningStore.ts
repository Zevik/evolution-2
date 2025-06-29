import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: Date
  category: 'progress' | 'streak' | 'score' | 'special'
}

export interface UserProgress {
  currentModule: number
  completedModules: number[]
  currentLesson: number
  completedLessons: string[]
  totalScore: number
  level: number
  xp: number
  streak: number
  lastActiveDate: string
}

export interface LearningModule {
  id: number
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: number
  prerequisites: number[]
  lessons: Lesson[]
  isUnlocked: boolean
  progress: number
}

export interface Lesson {
  id: string
  moduleId: number
  title: string
  type: 'video' | 'interactive' | 'quiz' | 'practice' | 'assessment'
  content: any
  completed: boolean
  score?: number
  timeSpent: number
}

export interface QuizQuestion {
  id: string
  type: 'multiple-choice' | 'true-false' | 'drag-drop' | 'fill-blank' | 'matching'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  difficulty: 1 | 2 | 3
  tags: string[]
}

interface LearningState {
  // User data
  userProgress: UserProgress
  achievements: Achievement[]
  unlockedAchievements: string[]
  
  // Learning content
  modules: LearningModule[]
  currentPath: 'beginner' | 'intermediate' | 'advanced'
  
  // Session state
  isLoading: boolean
  currentActivity: string | null
  sessionStartTime: Date | null
  sessionScore: number
  
  // Settings
  soundEnabled: boolean
  animationsEnabled: boolean
  feedbackLevel: 'minimal' | 'standard' | 'detailed'
  
  // Actions
  updateProgress: (moduleId: number, lessonId: string, score?: number) => void
  completeLesson: (moduleId: number, lessonId: string, score: number, timeSpent: number) => void
  unlockAchievement: (achievementId: string) => void
  updateStreak: () => void
  setCurrentPath: (path: 'beginner' | 'intermediate' | 'advanced') => void
  startSession: (activityId: string) => void
  endSession: () => void
  addSessionScore: (points: number) => void
  resetProgress: () => void
  updateSettings: (settings: Partial<Pick<LearningState, 'soundEnabled' | 'animationsEnabled' | 'feedbackLevel'>>) => void
}

const initialAchievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'השלב הראשון',
    description: 'השלמת השיעור הראשון',
    icon: '🎯',
    category: 'progress'
  },
  {
    id: 'streak-3',
    title: 'רצף למידה',
    description: 'למידה 3 ימים ברצף',
    icon: '🔥',
    category: 'streak'
  },
  {
    id: 'perfect-score',
    title: 'ציון מושלם',
    description: 'השגת 100% בפעילות',
    icon: '⭐',
    category: 'score'
  },
  {
    id: 'speed-learner',
    title: 'לומד מהיר',
    description: 'השלמת מודול ב-30 דקות',
    icon: '⚡',
    category: 'special'
  },
  {
    id: 'persistent',
    title: 'מתמיד',
    description: 'השלמת 10 שיעורים',
    icon: '💪',
    category: 'progress'
  }
]

const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 1000) + 1
}

const calculateXPForLevel = (level: number): number => {
  return (level - 1) * 1000
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      // Initial state
      userProgress: {
        currentModule: 1,
        completedModules: [],
        currentLesson: 0,
        completedLessons: [],
        totalScore: 0,
        level: 1,
        xp: 0,
        streak: 0,
        lastActiveDate: new Date().toISOString().split('T')[0]
      },
      
      achievements: initialAchievements,
      unlockedAchievements: [],
      modules: [],
      currentPath: 'beginner',
      isLoading: false,
      currentActivity: null,
      sessionStartTime: null,
      sessionScore: 0,
      soundEnabled: true,
      animationsEnabled: true,
      feedbackLevel: 'standard',

      // Actions
      updateProgress: (moduleId: number, lessonId: string, score = 0) => {
        set((state) => {
          const newCompletedLessons = [...state.userProgress.completedLessons]
          if (!newCompletedLessons.includes(lessonId)) {
            newCompletedLessons.push(lessonId)
          }

          const newXP = state.userProgress.xp + score
          const newLevel = calculateLevel(newXP)
          
          return {
            userProgress: {
              ...state.userProgress,
              completedLessons: newCompletedLessons,
              totalScore: state.userProgress.totalScore + score,
              xp: newXP,
              level: newLevel
            }
          }
        })
      },

      completeLesson: (moduleId: number, lessonId: string, score: number, timeSpent: number) => {
        const { updateProgress, unlockAchievement } = get()
        
        updateProgress(moduleId, lessonId, score)
        
        // Check for achievements
        const state = get()
        if (state.userProgress.completedLessons.length === 1) {
          unlockAchievement('first-lesson')
        }
        if (state.userProgress.completedLessons.length === 10) {
          unlockAchievement('persistent')
        }
        if (score >= 100) {
          unlockAchievement('perfect-score')
        }
        if (timeSpent <= 30 * 60 * 1000) { // 30 minutes
          unlockAchievement('speed-learner')
        }
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => {
          if (state.unlockedAchievements.includes(achievementId)) {
            return state
          }

          const achievement = state.achievements.find(a => a.id === achievementId)
          if (!achievement) return state

          return {
            unlockedAchievements: [...state.unlockedAchievements, achievementId],
            achievements: state.achievements.map(a => 
              a.id === achievementId 
                ? { ...a, unlockedAt: new Date() }
                : a
            )
          }
        })
      },

      updateStreak: () => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0]
          const lastActive = state.userProgress.lastActiveDate
          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().split('T')[0]

          let newStreak = state.userProgress.streak

          if (lastActive === yesterdayStr) {
            newStreak += 1
          } else if (lastActive !== today) {
            newStreak = 1
          }

          // Check streak achievements
          if (newStreak === 3) {
            get().unlockAchievement('streak-3')
          }

          return {
            userProgress: {
              ...state.userProgress,
              streak: newStreak,
              lastActiveDate: today
            }
          }
        })
      },

      setCurrentPath: (path: 'beginner' | 'intermediate' | 'advanced') => {
        set({ currentPath: path })
      },

      startSession: (activityId: string) => {
        set({
          currentActivity: activityId,
          sessionStartTime: new Date(),
          sessionScore: 0
        })
      },

      endSession: () => {
        set({
          currentActivity: null,
          sessionStartTime: null,
          sessionScore: 0
        })
      },

      addSessionScore: (points: number) => {
        set((state) => ({
          sessionScore: state.sessionScore + points
        }))
      },

      resetProgress: () => {
        set({
          userProgress: {
            currentModule: 1,
            completedModules: [],
            currentLesson: 0,
            completedLessons: [],
            totalScore: 0,
            level: 1,
            xp: 0,
            streak: 0,
            lastActiveDate: new Date().toISOString().split('T')[0]
          },
          unlockedAchievements: [],
          currentPath: 'beginner'
        })
      },

      updateSettings: (settings) => {
        set((state) => ({
          ...state,
          ...settings
        }))
      }
    }),
    {
      name: 'learning-store',
      version: 1
    }
  )
) 