import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from "@/components/ui/card"

export function Calendar() {
  const days: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const dates: number[] = [24, 25, 26, 27, 28, 29, 30]

  return (
    <Card className="bg-white rounded-2xl border-0 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium">December</h3>
        <div className="flex gap-1">
          <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day) => (
          <div key={day} className="text-sm text-gray-500 py-2">
            {day}
          </div>
        ))}
        {dates.map((date) => (
          <button
            key={date}
            className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm ${
              date === 28 
                ? "bg-[#2A2F33] text-white" 
                : "hover:bg-gray-100"
            }`}
          >
            {date}
          </button>
        ))}
      </div>
    </Card>
  )
}

