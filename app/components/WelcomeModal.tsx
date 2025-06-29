'use client'

import React, { useState } from 'react'
// Animation removed - using regular components
import { 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Target, 
  ArrowRight, 
  Brain,
  Gamepad2,
  Zap
} from 'lucide-react'

interface WelcomeModalProps {
  onComplete: () => void
}

const welcomeSteps = [
  {
    id: 1,
    title: 'ברוכים הבאים לפלטפורמת הלמידה!',
    subtitle: 'התכונן לחוויית למידה אינטראקטיבית ומהנה',
    icon: Sparkles,
    content: [
      'למידה מותאמת אישית לקצב שלך',
      'פעילויות אינטראקטיביות ומרתקות',
      'מעקב התקדמות מתקדם',
      'הישגים ופרסים מעוררי מוטיבציה'
    ],
    color: 'from-blue-400 to-purple-500'
  },
  {
    id: 2,
    title: 'איך זה עובד?',
    subtitle: 'תהליך הלמידה פשוט וחכם',
    icon: Brain,
    content: [
      'בחר את המסלול המתאים לרמתך',
      'למד דרך מודולים אינטראקטיביים',
      'תרגל עם פעילויות מעשיות',
      'קבל משוב מיידי והכוונה'
    ],
    color: 'from-green-400 to-blue-500'
  },
  {
    id: 3,
    title: 'גמיפיקציה ומוטיבציה',
    subtitle: 'הפוך למידה למשחק מהנה',
    icon: Gamepad2,
    content: [
      'צבור נקודות וכדור שחקן',
      'פתח הישגים והצטיין במדרים',
      'התחרה עם לומדים אחרים',
      'בנה רצף למידה יומי'
    ],
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 4,
    title: 'מוכן להתחיל?',
    subtitle: 'בוא נתחיל את המסע שלך!',
    icon: Zap,
    content: [
      'בחר את מסלול הלמידה שלך',
      'התחל עם המודול הראשון',
      'למד בקצב הנוח לך',
      'הגע להישגים חדשים!'
    ],
    color: 'from-orange-400 to-red-500'
  }
]

export default function WelcomeModal({ onComplete }: WelcomeModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleNext = () => {
    if (isAnimating) return
    
    if (currentStep < welcomeSteps.length - 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setIsAnimating(false)
      }, 300)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const currentStepData = welcomeSteps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${currentStepData.color} text-white p-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
                <p className="text-white text-opacity-90">{currentStepData.subtitle}</p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="text-white text-opacity-70 hover:text-opacity-100 text-sm transition-all"
            >
              דלג
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / welcomeSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <>
            <div
              key={currentStep}
              className="space-y-4"
            >
              {currentStepData.content.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`w-8 h-8 bg-gradient-to-r ${currentStepData.color} rounded-full flex items-center justify-center text-white text-sm font-semibold`}>
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {welcomeSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStep 
                      ? 'bg-blue-500 scale-125' 
                      : index < currentStep 
                        ? 'bg-green-500' 
                        : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="btn-secondary"
                  disabled={isAnimating}
                >
                  חזור
                </button>
              )}
              
              <button
                onClick={handleNext}
                className={`btn-primary flex items-center gap-2 ${isAnimating ? 'opacity-50' : ''}`}
                disabled={isAnimating}
              >
                {currentStep === welcomeSteps.length - 1 ? 'בוא נתחיל!' : 'המשך'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 

