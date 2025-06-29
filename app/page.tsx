'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Play, 
  ArrowLeft, 
  Sparkles,
  Brain,
  Gamepad2,
  Users
} from 'lucide-react'
import { useLearningStore } from './store/learningStore'
import { useProgress } from './components/providers/ProgressProvider'
import { useAudio } from './components/providers/AudioProvider'
import WelcomeModal from './components/WelcomeModal'
import LearningPathSelector from './components/LearningPathSelector'
import ProgressDashboard from './components/ProgressDashboard'
import ModuleCard from './components/ModuleCard'
import AchievementsList from './components/AchievementsList'

const demoModules = [
  {
    id: 1,
    title: 'מבוא לתכנות',
    description: 'למד את היסודות של תכנות בצורה אינטראקטיבית ומהנה',
    difficulty: 'beginner' as const,
    estimatedTime: 45,
    prerequisites: [],
    lessons: [
      {
        id: 'intro-1',
        moduleId: 1,
        title: 'מה זה תכנות?',
        type: 'interactive' as const,
        content: {},
        completed: false,
        timeSpent: 0
      },
      {
        id: 'intro-2',
        moduleId: 1,
        title: 'המשתנים הראשונים שלך',
        type: 'practice' as const,
        content: {},
        completed: false,
        timeSpent: 0
      }
    ],
    isUnlocked: true,
    progress: 0
  },
  {
    id: 2,
    title: 'מבני נתונים',
    description: 'חקור מבני נתונים בסיסיים ותלמד איך להשתמש בהם',
    difficulty: 'intermediate' as const,
    estimatedTime: 60,
    prerequisites: [1],
    lessons: [],
    isUnlocked: false,
    progress: 0
  },
  {
    id: 3,
    title: 'אלגוריתמים מתקדמים',
    description: 'פתח כישורי פתרון בעיות עם אלגוריתמים מתחמים',
    difficulty: 'advanced' as const,
    estimatedTime: 90,
    prerequisites: [1, 2],
    lessons: [],
    isUnlocked: false,
    progress: 0
  }
]

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [showPathSelector, setShowPathSelector] = useState(false)
  const [selectedModule, setSelectedModule] = useState<number | null>(null)
  
  const { 
    userProgress, 
    currentPath, 
    setCurrentPath,
    completedLessons 
  } = useLearningStore()
  
  const { trackEvent } = useProgress()
  const { playClick, playSuccess } = useAudio()

  // Check if this is the first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited')
    if (!hasVisited) {
      setShowWelcome(true)
      localStorage.setItem('hasVisited', 'true')
    }
  }, [])

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    setShowPathSelector(true)
    trackEvent('welcome_completed')
  }

  const handlePathSelected = (path: 'beginner' | 'intermediate' | 'advanced') => {
    setCurrentPath(path)
    setShowPathSelector(false)
    playSuccess()
    trackEvent('path_selected', { path })
  }

  const handleModuleClick = (moduleId: number) => {
    const learningModule = demoModules.find(m => m.id === moduleId)
    if (!learningModule?.isUnlocked) return
    
    playClick()
    setSelectedModule(moduleId)
    trackEvent('module_clicked', { moduleId })
  }

  const getModulesForPath = () => {
    switch (currentPath) {
      case 'beginner':
        return demoModules.filter(m => m.difficulty === 'beginner')
      case 'intermediate':
        return demoModules.filter(m => ['beginner', 'intermediate'].includes(m.difficulty))
      case 'advanced':
        return demoModules
      default:
        return demoModules.filter(m => m.difficulty === 'beginner')
    }
  }

  const pathInfo = {
    beginner: {
      title: 'מסלול מתחילים',
      description: 'התחל מההתחלה עם מושגי יסוד',
      icon: '🌱',
      color: 'from-green-400 to-blue-500'
    },
    intermediate: {
      title: 'מסלול בינוני',
      description: 'בנה על הידע הקיים שלך',
      icon: '🚀',
      color: 'from-blue-400 to-purple-500'
    },
    advanced: {
      title: 'מסלול מתקדם',
      description: 'אתגרים מורכבים למומחים',
      icon: '⚡',
      color: 'from-purple-400 to-pink-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">פלטפורמת למידה אינטראקטיבית</h1>
                  <p className="text-sm text-gray-600">למד, תרגל והתקדם בקצב שלך</p>
                </div>
              </div>
              
              {currentPath && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowPathSelector(true)}
                    className="btn-secondary text-sm"
                  >
                    החלף מסלול
                  </button>
                  <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${pathInfo[currentPath].color} text-white font-medium`}>
                    {pathInfo[currentPath].icon} {pathInfo[currentPath].title}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 pb-12">
          {!currentPath ? (
            <div className="text-center py-20">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-16 h-16 mx-auto text-blue-500 mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">ברוכים הבאים!</h2>
                <p className="text-lg text-gray-600 mb-8">בחר את מסלול הלמידה המתאים לך כדי להתחיל</p>
                <button
                  onClick={() => setShowPathSelector(true)}
                  className="btn-primary text-lg px-8 py-4"
                >
                  התחל ללמוד <Play className="w-5 h-5 mr-2" />
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Progress Dashboard */}
              <ProgressDashboard />

              {/* Learning Modules */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-800">מודולי למידה</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {getModulesForPath().map((module, index) => (
                      <motion.div
                        key={module.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <ModuleCard
                          module={module}
                          onClick={() => handleModuleClick(module.id)}
                          completed={completedLessons.filter(id => id.startsWith(`${module.id}-`)).length}
                          total={module.lessons.length || 2}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </section>

              {/* Achievements */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  <h2 className="text-2xl font-bold text-gray-800">הישגים</h2>
                </div>
                <AchievementsList />
              </section>

              {/* Quick Actions */}
              <section className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="learning-card text-center"
                  >
                    <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">תרגול יומי</h3>
                    <p className="text-gray-600 mb-4">פתור אתגרים קצרים לחיזוק הידע</p>
                    <button className="btn-secondary w-full">התחל תרגול</button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="learning-card text-center"
                  >
                    <Gamepad2 className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">משחקי למידה</h3>
                    <p className="text-gray-600 mb-4">למד דרך משחקים אינטראקטיביים</p>
                    <button className="btn-secondary w-full">שחק עכשיו</button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="learning-card text-center"
                  >
                    <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">קהילת למידה</h3>
                    <p className="text-gray-600 mb-4">התחבר ללומדים אחרים</p>
                    <button className="btn-secondary w-full">הצטרף לקהילה</button>
                  </motion.div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeModal onComplete={handleWelcomeComplete} />
        )}
        
        {showPathSelector && (
          <LearningPathSelector 
            onSelect={handlePathSelected}
            onClose={() => setShowPathSelector(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
} 