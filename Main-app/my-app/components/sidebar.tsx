import { useState } from 'react'
import { Home, Calendar, Clock, Timer, PieChart, Camera, LogOut } from 'lucide-react'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface NavItem {
  icon: React.ElementType;
  label: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home' },
  { icon: Calendar, label: 'Calendar' },
  { icon: Clock, label: 'History' },
  { icon: Timer, label: 'Statistics' },
  { icon: PieChart, label: 'Analytics' },
  { icon: Camera, label: 'Photos' },
]

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Home')

  return (
    <div className={cn("w-20 min-h-screen bg-[#2A2F33] fixed left-0 top-0", className)}>
      <div className="h-full flex flex-col py-6">
        <div className="px-4">
          <h2 className="text-lg font-semibold text-white">.Diet</h2>
        </div>
        <nav className="mt-8">
          <div className="px-3 space-y-3">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center transition-all",
                  activeItem === item.label ? "bg-[#B5E5C3]" : "hover:bg-gray-800"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon 
                  className={cn(
                    "w-6 h-6",
                    activeItem === item.label ? "text-[#2A2F33]" : "text-gray-400"
                  )} 
                />
              </motion.button>
            ))}
          </div>
        </nav>
        <div className="mt-auto px-3">
          <motion.button
            className="w-14 h-14 rounded-xl flex items-center justify-center hover:bg-gray-800"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-6 h-6 text-gray-400" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

