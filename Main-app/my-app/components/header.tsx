import { Bell, Search } from 'lucide-react'

export function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-[28px] font-semibold mb-1">Hello Zahra,🌱</h1>
        <p className="text-gray-500 text-base">Lets start living healthy from now on</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-[320px] h-12 rounded-2xl bg-white pl-12 pr-4 outline-none border border-gray-100"
          />
        </div>
        <button className="w-12 h-12 rounded-xl bg-[#2A2F33] flex items-center justify-center">
          <Bell className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}

