import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Food 404</h3>
            <p className="text-gray-600 leading-relaxed">
              Discover a new way to explore healthy eating and connect with like-minded individuals. 
              Our platform helps you track your nutrition journey while building meaningful connections 
              in a community that shares your passion for wellness.
            </p>
          </div>
          
          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle>Daily Quote</CardTitle>
              <CardDescription>Food for thought</CardDescription>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-4 border-green-500 pl-4">
                <p className="text-gray-600 italic mb-2">
                  "Let food be thy medicine, and medicine be thy food."
                </p>
                <footer className="text-sm text-gray-500">
                  - Hippocrates
                </footer>
              </blockquote>
            </CardContent>
          </Card>

          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" className="justify-start" asChild>
                <a href="#">About Us</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="#">Contact</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="#">Privacy</a>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <a href="#">Terms</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Food 404. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-500" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Blog <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Status <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

