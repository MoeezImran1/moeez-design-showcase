import { Star } from 'lucide-react'

interface Review {
  id: string
  client_name: string
  review_text: string
  rating: number
  created_at: string
}

interface ClientReviewsProps {
  reviews: Review[]
}

export default function ClientReviews({ reviews }: ClientReviewsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-warning fill-current' : 'text-muted-foreground'
        }`}
      />
    ))
  }

  return (
    <section id="reviews" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Client Reviews
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What our clients say about our design work
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No reviews yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-card p-6 rounded-lg shadow-elegant border border-border hover:shadow-glow transition-smooth"
              >
                <div className="flex items-center mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-card-foreground mb-4 italic">
                  "{review.review_text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-card-foreground">
                    {review.client_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}