import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ClientReviews from '../components/ClientReviews'

interface Review {
  id: string
  client_name: string
  review_text: string
  rating: number
  created_at: string
}

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('client_reviews')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setReviews(data || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-primary">
        <div className="text-center text-primary-foreground px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Moeez Design Showcase
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Professional design portfolio showcasing creative digital solutions and innovative design work
          </p>
          <a 
            href="#reviews" 
            className="inline-block bg-primary-foreground text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-smooth"
          >
            View Client Reviews
          </a>
        </div>
      </section>

      {/* Client Reviews Section */}
      <ClientReviews reviews={reviews} />

      {/* Footer */}
      <footer className="bg-secondary py-8 text-center">
        <p className="text-muted-foreground">
          © 2024 Moeez Design Showcase. All rights reserved.
        </p>
      </footer>
    </div>
  )
}