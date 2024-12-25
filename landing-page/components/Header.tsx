'use client'

import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto">
        <nav className="flex items-center justify-between h-16 px-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Food 404</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <Input
                  placeholder="Search for friends/community"
                  className="w-full"
                  prefix={<Search className="h-4 w-4 text-gray-400" />}
                />
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="#">Today's Recommendation</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="#">Tracking/Progress</Link>
                </Button>
                <Button>Sign Up/Login</Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link 
            href="/" 
            className="text-xl font-semibold tracking-tight hover:text-green-600 transition-colors"
          >
            Food 404
          </Link>

          {/* Desktop Search */}
          <div className={`hidden md:flex items-center justify-center flex-1 max-w-md mx-8 transition-all duration-200 ${
            isSearchFocused ? 'scale-105' : ''
          }`}>
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for friends/community"
                className="w-full pl-10 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="text-sm" asChild>
              <Link href="#">Today's Recommendation</Link>
            </Button>
            <Button variant="ghost" className="text-sm" asChild>
              <Link href="#">Tracking/Progress</Link>
            </Button>
            <Button className="text-sm bg-green-600 hover:bg-green-700">
              Sign Up/Login
            </Button>
          </div>

          {/* Mobile Search Trigger */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  )
}

