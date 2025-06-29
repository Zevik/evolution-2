'use client'

import React from 'react'
// Animation removed - using regular components
import { 
  User, 
  Trophy, 
  Target, 
  Flame, 
  Clock, 
  TrendingUp,
  Award,
  Calendar,
  Zap
} from 'lucide-react'
import { useLearningStore } from '../store/learningStore'

export default function ProgressDashboard() {
  const { userProgress, unlockedAchievements } = useLearningStore()

  const stats = [
    {
      icon: Trophy,
      label: 'נקודות',
      value: userProgress.totalScore,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      icon: Target,
      label: 'רמה',
      value: userProgress.level,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Flame,
      label: 'רצף ימים',
      value: userProgress.streak,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      icon: Award,
      label: 'הישגים',
      value: unlockedAchievements.length,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ]

  const xpForNextLevel = userProgress.level * 1000
  const currentLevelXp = (userProgress.level - 1) * 1000
  const progressToNextLevel = ((userProgress.xp - currentLevelXp) / (xpForNextLevel - currentLevelXp)) * 100

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="learning-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">שלום, לומד! 👋</h2>
              <p className="text-gray-600">בוא נמשיך את המסע הלמידה שלך</p>
            </div>
          </div>
          
          <div className="text-left">
            <div className="text-sm text-gray-500">המחלקה שלך</div>
            <div className="level-indicator">
              <Zap className="w-4 h-4" />
              רמה {userProgress.level}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-4 text-center`}
            >
              <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          )
        })}
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* XP Progress */}
        <div className="learning-card">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">התקדמות ברמה</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>רמה {userProgress.level}</span>
              <span>רמה {userProgress.level + 1}</span>
            </div>
            
            <div className="progress-bar">
              <div
                className="progress-fill transition-all duration-500"
                style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>{userProgress.xp - currentLevelXp} XP</span>
              <span>{xpForNextLevel - currentLevelXp} XP</span>
            </div>
            
            <p className="text-sm text-gray-600">
              עוד {xpForNextLevel - userProgress.xp} נקודות לרמה הבאה!
            </p>
          </div>
        </div>

        {/* Learning Streak */}
        <div className="learning-card">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold">רצף למידה</h3>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {userProgress.streak}
            </div>
            <div className="text-gray-600 mb-4">ימים ברצף</div>
            
            <div className="flex justify-center gap-2 mb-4">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    i < userProgress.streak
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            
            <p className="text-sm text-gray-600">
              {userProgress.streak > 0 
                ? 'כל הכבוד! המשך כך 🔥' 
                : 'התחל רצף למידה חדש!'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="learning-card">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold">סטטיסטיקות מהירות</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{userProgress.completedLessons.length}</div>
            <div className="text-sm text-gray-600">שיעורים הושלמו</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-green-600">{userProgress.completedModules.length}</div>
            <div className="text-sm text-gray-600">מודולים הושלמו</div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((userProgress.totalScore / Math.max(userProgress.completedLessons.length, 1)) * 10) / 10}
            </div>
            <div className="text-sm text-gray-600">ציון ממוצע</div>
          </div>
        </div>
      </div>
    </div>
  )
} 

