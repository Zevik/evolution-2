'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft, 
  Home, 
  BookOpen, 
  CheckCircle, 
  Play,
  Pause,
  RotateCcw,
  Star,
  Clock
} from 'lucide-react'
import Link from 'next/link'
import { useLearningStore } from '../../store/learningStore'
import { useProgress } from '../../components/providers/ProgressProvider'
import { useAudio } from '../../components/providers/AudioProvider'

interface ModulePageProps {
  params: {
    id: string
  }
}

const sampleContent = {
  introduction: {
    title: 'מבוא לתכנות - שיעור 1',
    content: `
      <h2>מה זה תכנות?</h2>
      <p>תכנות הוא תהליך יצירת הוראות למחשב באמצעות שפת תכנות מיוחדת. המחשב יודע לבצע הוראות פשוטות מאוד, ואנחנו צריכים לפרק בעיות מורכבות לשלבים קטנים.</p>
      
      <h3>למה חשוב ללמוד תכנות?</h3>
      <ul>
        <li>פיתוח חשיבה לוגית ופתרון בעיות</li>
        <li>יצירת פתרונות טכנולוגיים לבעיות יומיומיות</li>
        <li>הזדמנויות תעסוקה רבות ומגוונות</li>
        <li>יכולת להבין טוב יותר את העולם הדיגיטלי</li>
      </ul>
      
      <h3>מושגי יסוד</h3>
      <p>בשיעור זה נכיר את מושגי היסוד הבסיסיים:</p>
      <ol>
        <li><strong>אלגוריתם</strong> - רצף הוראות לפתרון בעיה</li>
        <li><strong>משתנה</strong> - מקום בזיכרון לשמירת מידע</li>
        <li><strong>פונקציה</strong> - קטע קוד שמבצע משימה מסוימת</li>
      </ol>
    `
  },
  interactive: {
    title: 'תרגיל אינטראקטיבי',
    description: 'בוא נתרגל את מה שלמדנו!'
  },
  quiz: {
    title: 'חידון',
    questions: [
      {
        question: 'מה זה אלגוריתם?',
        options: [
          'תוכנת מחשב',
          'רצף הוראות לפתרון בעיה',
          'שפת תכנות',
          'משתנה במחשב'
        ],
        correct: 1
      },
      {
        question: 'למה חשוב ללמוד תכנות?',
        options: [
          'רק למטרות תעסוקה',
          'כדי להכין מחשבים',
          'לפתח חשיבה לוגית ופתרון בעיות',
          'כדי לתקן מחשבים'
        ],
        correct: 2
      }
    ]
  }
}

export default function ModulePage({ params }: ModulePageProps) {
  const moduleId = parseInt(params.id)
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)

  const { completeLesson, addXP } = useLearningStore()
  const { trackEvent } = useProgress()
  const { playSuccess, playError } = useAudio()

  const sections = ['introduction', 'interactive', 'quiz']
  const sectionTitles = {
    introduction: 'תוכן השיעור',
    interactive: 'תרגיל אינטראקטיבי', 
    quiz: 'חידון'
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers]
    newAnswers[questionIndex] = answerIndex
    setQuizAnswers(newAnswers)
  }

  const submitQuiz = () => {
    const correct = quizAnswers.reduce((acc, answer, index) => {
      return acc + (answer === sampleContent.quiz.questions[index].correct ? 1 : 0)
    }, 0)
    
    const percentage = (correct / sampleContent.quiz.questions.length) * 100
    setScore(percentage)
    setQuizCompleted(true)
    
    if (percentage >= 70) {
      playSuccess()
      completeLesson(moduleId, `module-${moduleId}-lesson-1`, percentage, 0)
      addXP(100)
      trackEvent('lesson_completed', { moduleId, score: percentage })
    } else {
      playError()
    }
  }

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1)
      trackEvent('section_progress', { moduleId, section: currentSection + 1 })
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="btn-secondary">
                <Home className="w-4 h-4" />
                דף הבית
              </Link>
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen className="w-4 h-4" />
                <span>מודול {moduleId}</span>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center gap-2">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index === currentSection 
                      ? 'bg-blue-500 text-white' 
                      : index < currentSection 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < currentSection ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="learning-card mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {sectionTitles[sections[currentSection] as keyof typeof sectionTitles]}
          </h1>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Section Content */}
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="learning-card"
        >
          {sections[currentSection] === 'introduction' && (
            <div 
              className="prose prose-lg max-w-none rtl"
              dangerouslySetInnerHTML={{ __html: sampleContent.introduction.content }}
            />
          )}

          {sections[currentSection] === 'interactive' && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6">
                🧩
              </div>
              <h3 className="text-xl font-semibold mb-4">{sampleContent.interactive.title}</h3>
              <p className="text-gray-600 mb-8">{sampleContent.interactive.description}</p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h4 className="font-semibold mb-4">משימה: כתוב אלגוריתם להכנת תה</h4>
                <p className="text-sm text-gray-600 mb-4">רשום רצף של הוראות פשוטות להכנת כוס תה</p>
                <textarea
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none"
                  placeholder="1. הרתח מים&#10;2. שים תה בכוס&#10;3. ..."
                  dir="rtl"
                />
                <button className="btn-primary mt-4">
                  <CheckCircle className="w-4 h-4" />
                  שלח תשובה
                </button>
              </div>
            </div>
          )}

          {sections[currentSection] === 'quiz' && (
            <div className="space-y-6">
              {!quizCompleted ? (
                <>
                  <div className="text-center mb-8">
                    <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">חידון סיכום</h3>
                    <p className="text-gray-600">ענה על השאלות כדי לסיים את השיעור</p>
                  </div>

                  {sampleContent.quiz.questions.map((question, qIndex) => (
                    <div key={qIndex} className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">שאלה {qIndex + 1}: {question.question}</h4>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <label key={oIndex} className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              value={oIndex}
                              onChange={() => handleQuizAnswer(qIndex, oIndex)}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="text-center">
                    <button
                      onClick={submitQuiz}
                      disabled={quizAnswers.length < sampleContent.quiz.questions.length}
                      className="btn-primary px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-5 h-5" />
                      שלח תשובות
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 ${
                    score >= 70 ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}>
                    {score >= 70 ? '🎉' : '😔'}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">
                    {score >= 70 ? 'כל הכבוד!' : 'כמעט הגעת!'}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-4">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span>הציון שלך: {score}%</span>
                  </div>
                  
                  <p className="text-gray-600 mb-8">
                    {score >= 70 
                      ? 'השיעור הושלם בהצלחה! זכית ב-100 נקודות XP' 
                      : 'נסה שוב להגיע לציון של לפחות 70%'}
                  </p>
                  
                  <div className="flex gap-4 justify-center">
                    <Link href="/" className="btn-primary">
                      <Home className="w-4 h-4" />
                      חזור לדף הבית
                    </Link>
                    {score < 70 && (
                      <button 
                        onClick={() => {
                          setQuizCompleted(false)
                          setQuizAnswers([])
                          setScore(0)
                        }}
                        className="btn-secondary"
                      >
                        <RotateCcw className="w-4 h-4" />
                        נסה שוב
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        {!quizCompleted && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevSection}
              disabled={currentSection === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4 h-4" />
              הקודם
            </button>
            
            <button
              onClick={nextSection}
              disabled={currentSection === sections.length - 1}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              הבא
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 