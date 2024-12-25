import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Plus } from 'lucide-react'

export function DailyCalories() {
  const meals = [
    {
      name: "Breakfast",
      description: "cold cereal and milk",
      calories: "240 Kcal",
      bgColor: "bg-blue-50",
    },
    {
      name: "Lunch",
      description: "vegetables Salad",
      calories: "240 Kcal",
      bgColor: "bg-[#E8F3DC]",
    },
  ]

  return (
    <Card className="bg-white rounded-2xl border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Daily Calories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {meals.map((meal) => (
          <div
            key={meal.name}
            className={`${meal.bgColor} p-4 rounded-xl flex items-center justify-between`}
          >
            <div>
              <h4 className="font-medium mb-0.5">{meal.name}</h4>
              <p className="text-sm text-gray-600">{meal.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm">{meal.calories}</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between pt-2">
          <span className="text-gray-500">Remaining</span>
          <div className="flex items-center gap-3">
            <span>635 Kcal</span>
            <button className="w-10 h-10 rounded-xl bg-[#2A2F33] flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

