'use client'

import React from 'react'
// Animation removed - using regular components
import { 
  Clock, 
  Target, 
  PlayCircle, 
  Lock, 
  CheckCircle, 
  Star,
  BookOpen,
  TrendingUp
} from 'lucide-react'
import { LearningModule } from '../store/learningStore'

interface ModuleCardProps {
  module: LearningModule
  onClick: () => void
  completed: number
  total: number
}

const difficultyConfig = {
  beginner: {
    label: 'מתחיל',
    color: 'bg-green-100 text-green-700',
    icon: '🌱'
  },
  intermediate: {
    label: 'בינוני',
    color: 'bg-blue-100 text-blue-700',
    icon: '🚀'
  },
  advanced: {
    label: 'מתקדם',
    color: 'bg-purple-100 text-purple-700',
    icon: '⚡'
  }
}

export default function ModuleCard({ module, onClick, completed, total }: ModuleCardProps) {
  const progressPercentage = total > 0 ? (completed / total) * 100 : 0
  const isCompleted = completed === total && total > 0
  const difficulty = difficultyConfig[module.difficulty]

  return (
    <div
      onClick={module.isUnlocked ? onClick : undefined}
      className={`
        learning-card relative overflow-hidden transition-all duration-300
        ${module.isUnlocked 
          ? 'cursor-pointer hover:shadow-xl' 
          : 'opacity-60 cursor-not-allowed bg-gray-50'}
        ${isCompleted ? 'ring-2 ring-green-400' : ''}
      `}
    >
      {/* Completion Badge */}
      {isCompleted && (
        <div
          className="absolute top-3 left-3 z-10"
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        </div>
      )}

      {/* Lock Icon for Locked Modules */}
      {!module.isUnlocked && (
        <div className="absolute top-3 left-3 z-10">
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            <Lock className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      {/* Difficulty Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficulty.color}`}>
          {difficulty.icon} {difficulty.label}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {module.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {module.description}
          </p>
        </div>

        {/* Progress Bar */}
        {total > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">התקדמות</span>
              <span className="font-medium">{completed}/{total}</span>
            </div>
            <div className="progress-bar h-2">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(progressPercentage)}% הושלם
            </div>
          </div>
        )}

        {/* Module Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{module.estimatedTime} דק׳</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{total} שיעורים</span>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        {module.prerequisites.length > 0 && !module.isUnlocked && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-yellow-700 text-sm">
              <Target className="w-4 h-4" />
              <span className="font-medium">דרישות קדם:</span>
            </div>
            <p className="text-yellow-600 text-xs mt-1">
              השלם מודולים {module.prerequisites.join(', ')} כדי לפתוח מודול זה
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {module.isUnlocked ? (
            <button
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
                isCompleted
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : completed > 0
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  סקור שוב
                </>
              ) : completed > 0 ? (
                <>
                  <TrendingUp className="w-4 h-4" />
                  המשך למידה
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4" />
                  התחל ללמוד
                </>
              )}
            </button>
          ) : (
            <button
              disabled
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium bg-gray-200 text-gray-500 cursor-not-allowed"
            >
              <Lock className="w-4 h-4" />
              נעול
            </button>
          )}
        </div>

        {/* Achievement Indicator */}
        {isCompleted && (
          <div
            className="flex items-center justify-center gap-2 text-yellow-600 text-sm font-medium"
          >
            <Star className="w-4 h-4 fill-current" />
            מודול הושלם בהצלחה!
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      {module.isUnlocked && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  )
} 

