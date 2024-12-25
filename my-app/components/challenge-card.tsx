import { ArrowRight } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function ChallengeCard() {
  return (
    <Card className="bg-[#E8F3DC] rounded-2xl border-0 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src="/placeholder.svg?height=96&width=96"
              alt="Healthy meal"
              className="w-24 h-24 rounded-full object-cover"
            />
            <motion.img
              src="/placeholder.svg?height=40&width=40"
              alt="Dumbbells"
              className="absolute -top-2 -right-2 w-10 h-10"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">The 5 a day challenge 🔥</h3>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2].map((i) => (
                  <img
                    key={i}
                    src="/placeholder.svg?height=24&width=24"
                    alt={`User ${i}`}
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">+5k</span>
            </div>
          </div>
        </div>
        <motion.button 
          className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </Card>
  )
}

