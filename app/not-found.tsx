import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowRight, BookOpen, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Illustration */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4"
            >
              404
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
            >
              <Search className="w-12 h-12 text-white" />
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              הדף לא נמצא
            </h1>
            <p className="text-gray-600 mb-6">
              נראה שהדף שחיפשת לא קיים או שהוא עבר למקום אחר. אל תדאג, בוא נמצא לך משהו מעניין ללמוד!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <Link href="/" className="block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full btn-primary text-lg py-3 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                חזור לדף הבית
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-800">או שמא תרצה להתחיל ללמוד?</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                בחר מסלול למידה והתחל את המסע שלך עוד היום
              </p>
              <Link href="/?start=true">
                <button className="btn-secondary w-full">
                  התחל ללמוד עכשיו
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Fun Learning Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200"
          >
            <p className="text-sm text-blue-700">
              <strong>עובדה מעניינת:</strong> גם הטעות הזו יכולה להיות הזדמנות למידה! 
              שגיאות 404 מלמדות אותנו על חשיבות הניווט הטוב ובדיקת קישורים.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
} 