'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Lock, Calendar, Star, Medal, Award, Target, Flame, Zap, CheckCircle } from 'lucide-react'
import { useLearningStore } from '../store/learningStore'

export default function AchievementsList() {
  const { achievements, unlockedAchievements } = useLearningStore()
  
  const unlockedList = achievements.filter(a => unlockedAchievements.includes(a.id))
  const lockedList = achievements.filter(a => !unlockedAchievements.includes(a.id))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-white">
          <Trophy className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{unlockedList.length}</div>
          <div className="text-sm opacity-90">הישגים פתוחים</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl text-white">
          <Lock className="w-8 h-8 mx-auto mb-2" />
          <div className="text-2xl font-bold">{lockedList.length}</div>
          <div className="text-sm opacity-90">הישגים נעולים</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id)
          return (
            <motion.div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 ${
                isUnlocked ? 'bg-white border-yellow-300' : 'bg-gray-50 border-gray-200 opacity-70'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  isUnlocked ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-500'
                }`}>
                  {isUnlocked ? achievement.icon : <Lock className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
} 