"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export function CaloriesBudget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-normal">Calories Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-square max-w-[240px] mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#E8F3DC"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#B5E5C3"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset="70"
              />
              <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="#E8F3DC"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="#B5E5C3"
                strokeWidth="10"
                strokeDasharray="201"
                strokeDashoffset="50"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center">
                  <span className="text-4xl font-bold">750</span>
                  <span className="text-xl">Kcal</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">🍪 Activity</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <h4 className="text-sm font-medium">My Analytics</h4>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

