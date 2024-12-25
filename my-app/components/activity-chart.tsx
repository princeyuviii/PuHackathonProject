"use client"

import { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Chart from 'chart.js/auto'
import { motion } from "framer-motion"

export function ActivityChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current?.getContext('2d')
    if (!ctx) return

    const gradient1 = ctx.createLinearGradient(0, 0, 0, 200)
    gradient1.addColorStop(0, 'rgba(234, 179, 8, 0.2)')
    gradient1.addColorStop(1, 'rgba(234, 179, 8, 0)')

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 200)
    gradient2.addColorStop(0, 'rgba(59, 130, 246, 0.2)')
    gradient2.addColorStop(1, 'rgba(59, 130, 246, 0)')

    const gradient3 = ctx.createLinearGradient(0, 0, 0, 200)
    gradient3.addColorStop(0, 'rgba(16, 185, 129, 0.2)')
    gradient3.addColorStop(1, 'rgba(16, 185, 129, 0)')

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        datasets: [
          {
            label: 'Activity 1',
            data: [400, 300, 200, 278, 189, 239, 349],
            borderColor: 'rgb(234, 179, 8)',
            backgroundColor: gradient1,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointStyle: false
          },
          {
            label: 'Activity 2',
            data: [240, 139, 980, 390, 480, 380, 430],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: gradient2,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointStyle: false
          },
          {
            label: 'Activity 3',
            data: [300, 200, 400, 200, 300, 250, 450],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: gradient3,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointStyle: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'white',
            titleColor: 'black',
            bodyColor: 'black',
            borderColor: 'rgb(229, 231, 235)',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              title: () => '25%',
              label: () => '625Kcal'
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false
            }
          },
          y: {
            display: false,
            grid: {
              display: false
            }
          }
        }
      }
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-[#2A2F33] border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-lg font-normal">Daily activity</CardTitle>
          <div className="text-2xl font-semibold text-white">625Kcal</div>
        </CardHeader>
        <CardContent>
          <div className="h-[180px]">
            <canvas ref={chartRef} />
          </div>
          <div className="mt-2 text-gray-400 text-sm text-right">19:00pm</div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

