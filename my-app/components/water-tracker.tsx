import { Card } from "@/components/ui/card"

export function WaterTracker() {
  return (
    <Card className="bg-[#2A2F33] rounded-2xl border-0 shadow-sm overflow-hidden">
      <div className="relative h-[200px]">
        <img
          src="/water.jpg?height=200&width=400"
          alt="Person drinking water"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2F33] via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-1">
                Drink 10 Cups Water
              </h3>
              <p className="text-gray-400 text-sm">06:00am-06:00pm</p>
            </div>
            <div className="bg-white text-black rounded-full px-3 py-1 text-sm font-medium">
              80%
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

