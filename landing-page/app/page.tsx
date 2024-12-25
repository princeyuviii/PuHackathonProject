import Header from '@/components/Header'
import Apple3D from '@/components/Apple3D'
import WavyAnimation from '@/components/WavyAnimation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Discover Your Perfect
                <span className="text-green-600"> Food Journey</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Join our community of food enthusiasts and health-conscious individuals. 
                Track your progress, share your experiences, and grow together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>

          {/* 3D Apple Section */}
          <div className="mt-16">
            <Apple3D />
          </div>

          {/* Wave Animation */}
          <WavyAnimation />
        </section>
      </main>

      <Footer />
    </div>
  )
}

