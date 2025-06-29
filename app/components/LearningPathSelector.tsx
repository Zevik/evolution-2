'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ArrowRight, 
  Zap, 
  Rocket, 
  Seedling, 
  Clock,
  Target,
  CheckCircle
} from 'lucide-react'

interface LearningPathSelectorProps {
  onSelect: (path: 'beginner' | 'intermediate' | 'advanced') => void
  onClose: () => void
}

const pathOptions = [
  {
    id: 'beginner',
    title: 'מתחיל',
    subtitle: 'אני חדש לגמרי בנושא',
    description: 'נתחיל מהבסיס עם מושגי יסוד וחזור על כל מה שצריך',
    icon: Seedling,
    color: 'from-green-400 to-blue-500',
    features: [
      'הסברים מפורטים',
      'קצב למידה איטי',
      'תרגול רב',
      'ליווי צמוד'
    ],
    estimatedTime: '2-3 שבועות',
    difficulty: 1
  },
  {
    id: 'intermediate',
    title: 'בינוני',
    subtitle: 'יש לי קצת ידע בסיסי',
    description: 'נבנה על הידע הקיים שלך ונעמיק בנושאים חשובים',
    icon: Rocket,
    color: 'from-blue-400 to-purple-500',
    features: [
      'סקירה מהירה של הבסיס',
      'דגש על תרגול',
      'פרויקטים מעשיים',
      'אתגרים נוספים'
    ],
    estimatedTime: '1-2 שבועות',
    difficulty: 2
  },
  {
    id: 'advanced',
    title: 'מתקדם',
    subtitle: 'אני בקיא בנושא',
    description: 'נתמקד בנושאים מתקדמים ואתגרים מורכבים',
    icon: Zap,
    color: 'from-purple-400 to-pink-500',
    features: [
      'תכנים מתקדמים',
      'פרויקטים מורכבים',
      'למידה עצמאית',
      'חשיבה יצירתית'
    ],
    estimatedTime: '1 שבוע',
    difficulty: 3
  }
]

const assessmentQuestions = [
  {
    id: 1,
    question: 'איך תגדיר את רמת הניסיון שלך בתכנות?',
    options: [
      { text: 'אף פעם לא תכנתתי', value: 'beginner', points: 1 },
      { text: 'יש לי ניסיון בסיסי', value: 'beginner', points: 2 },
      { text: 'אני מכיר מושגים בסיסיים', value: 'intermediate', points: 3 },
      { text: 'יש לי ניסיון מעשי', value: 'intermediate', points: 4 },
      { text: 'אני מפתח מנוסה', value: 'advanced', points: 5 }
    ]
  },
  {
    id: 2,
    question: 'איזה מהמושגים הבאים מוכר לך?',
    options: [
      { text: 'אף אחד מהם', value: 'beginner', points: 1 },
      { text: 'משתנים', value: 'beginner', points: 2 },
      { text: 'לולאות ותנאים', value: 'intermediate', points: 3 },
      { text: 'פונקציות ומחלקות', value: 'intermediate', points: 4 },
      { text: 'אלגוריתמים ומבני נתונים', value: 'advanced', points: 5 }
    ]
  },
  {
    id: 3,
    question: 'כמה זמן אתה מוכן להקדיש ללמידה יומית?',
    options: [
      { text: '15-30 דקות', value: 'beginner', points: 1 },
      { text: '30-45 דקות', value: 'beginner', points: 2 },
      { text: '45-60 דקות', value: 'intermediate', points: 3 },
      { text: '1-2 שעות', value: 'intermediate', points: 4 },
      { text: 'יותר מ-2 שעות', value: 'advanced', points: 5 }
    ]
  }
]

export default function LearningPathSelector({ onSelect, onClose }: LearningPathSelectorProps) {
  const [selectedPath, setSelectedPath] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null)
  const [showAssessment, setShowAssessment] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [assessmentResult, setAssessmentResult] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null)

  const handlePathSelect = (path: 'beginner' | 'intermediate' | 'advanced') => {
    setSelectedPath(path)
  }

  const handleTakeAssessment = () => {
    setShowAssessment(true)
    setCurrentQuestion(0)
    setAnswers([])
  }

  const handleAnswerSelect = (points: number) => {
    const newAnswers = [...answers, points]
    setAnswers(newAnswers)

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // Calculate result
      const totalPoints = newAnswers.reduce((sum, points) => sum + points, 0)
      const avgPoints = totalPoints / assessmentQuestions.length

      let result: 'beginner' | 'intermediate' | 'advanced'
      if (avgPoints <= 2) {
        result = 'beginner'
      } else if (avgPoints <= 3.5) {
        result = 'intermediate'
      } else {
        result = 'advanced'
      }

      setAssessmentResult(result)
      setSelectedPath(result)
      setShowAssessment(false)
    }
  }

  const handleConfirm = () => {
    if (selectedPath) {
      onSelect(selectedPath)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">בחר את מסלול הלמידה שלך</h2>
              <p className="text-white text-opacity-90">המסלול יותאם לרמתך ולקצב הלמידה שלך</p>
            </div>
            <button
              onClick={onClose}
              className="text-white text-opacity-70 hover:text-opacity-100 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!showAssessment ? (
            <>
              {/* Assessment Suggestion */}
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-800">לא בטוח איזה מסלול מתאים לך?</h3>
                    <p className="text-blue-600 text-sm">עבור מבחן קצר שיעזור לנו להמליץ על המסלול הטוב ביותר</p>
                  </div>
                  <button
                    onClick={handleTakeAssessment}
                    className="btn-primary text-sm"
                  >
                    עבור מבחן
                  </button>
                </div>
              </div>

              {/* Path Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {pathOptions.map((path) => {
                  const Icon = path.icon
                  const isSelected = selectedPath === path.id
                  
                  return (
                    <motion.div
                      key={path.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePathSelect(path.id as any)}
                      className={`
                        relative p-6 rounded-xl border-2 cursor-pointer transition-all
                        ${isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        }
                      `}
                    >
                      {isSelected && (
                        <div className="absolute top-4 left-4">
                          <CheckCircle className="w-6 h-6 text-blue-500" />
                        </div>
                      )}

                      <div className={`w-16 h-16 bg-gradient-to-r ${path.color} rounded-full flex items-center justify-center text-white mb-4 mx-auto`}>
                        <Icon className="w-8 h-8" />
                      </div>

                      <h3 className="text-xl font-bold text-center mb-2">{path.title}</h3>
                      <p className="text-gray-600 text-center text-sm mb-4">{path.subtitle}</p>
                      <p className="text-gray-700 text-sm mb-4">{path.description}</p>

                      <div className="space-y-2 mb-4">
                        {path.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{path.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          <span>רמה {path.difficulty}</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {assessmentResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <h3 className="font-semibold text-green-800 mb-2">תוצאת המבחן</h3>
                  <p className="text-green-600">בהתבסס על התשובות שלך, אנו ממליצים על המסלול: <strong>{pathOptions.find(p => p.id === assessmentResult)?.title}</strong></p>
                </motion.div>
              )}

              {/* Confirm Button */}
              <div className="text-center">
                <button
                  onClick={handleConfirm}
                  disabled={!selectedPath}
                  className={`btn-primary px-8 py-3 text-lg flex items-center gap-2 mx-auto ${
                    !selectedPath ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  התחל במסלול הנבחר
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            /* Assessment */
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">שאלה {currentQuestion + 1} מתוך {assessmentQuestions.length}</h3>
                  <div className="text-sm text-gray-500">{Math.round(((currentQuestion + 1) / assessmentQuestions.length) * 100)}%</div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="text-center mb-8">
                <h4 className="text-lg font-medium mb-6">{assessmentQuestions[currentQuestion].question}</h4>
                
                <div className="space-y-3">
                  {assessmentQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswerSelect(option.points)}
                      className="w-full p-4 text-right bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-all"
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
} 