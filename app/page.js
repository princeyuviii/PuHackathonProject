"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ChallengeCard } from "@/components/challenge-card"
import { ActivityChart } from "@/components/activity-chart"
import { Calendar } from "@/components/calendar"
import { CaloriesBudget } from "@/components/calories-budget"
import { DailyRecap } from "@/components/daily-recap"
import { DailyCalories } from "@/components/daily-calories"
import { WaterTracker } from "@/components/water-tracker"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Sidebar />
      <main className="pl-20">
        <div className="max-w-[1400px] mx-auto p-8">
          <Header />
          <div className="grid grid-cols-12 gap-5">
  <div className="col-span-8">
    <div className="grid grid-cols-2 gap-5">
      <div>
        <ChallengeCard />
      </div>
      <div>
        <ActivityChart />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-5 mt-5">
      <DailyRecap />
      <DailyCalories />
    </div>
  </div>
  <div className="col-span-4 space-y-5">
    <Calendar />
    <CaloriesBudget />
    <WaterTracker />
  </div>
</div>
        </div>
      </main>
    </div>
  )
}

