import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Nutrient {
  name: string;
  amount: string;
  value: string;
  color: string;
  progressColor: string;
}

export function DailyRecap() {
  const nutrients: Nutrient[] = [
    { 
      name: "Carbohydrate",
      amount: "54 g",
      value: "25%",
      color: "bg-blue-100",
      progressColor: "progress-bar-carb"
    },
    { 
      name: "Protein",
      amount: "16.2 g",
      value: "25%",
      color: "bg-yellow-100",
      progressColor: "progress-bar-protein"
    },
    { 
      name: "Fats",
      amount: "11.2 g",
      value: "25%",
      color: "bg-green-100",
      progressColor: "progress-bar-fat"
    },
  ]

  return (
    <Card className="bg-white rounded-2xl border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Daily Recap</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {nutrients.map((nutrient) => (
          <div key={nutrient.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className={`${nutrient.color} px-3 py-1.5 rounded-lg`}>
                <span className="font-medium">{nutrient.amount}</span>
              </div>
              <span className="text-gray-600">{nutrient.name}</span>
              <span>{nutrient.value}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full w-[25%] ${nutrient.progressColor}`}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

