
export const LandingTestimonials = () => {
  const testimonials = [
    {
      quote: "AgriBuddy helped me increase my crop yield by 30% in just one season with its price prediction tools!",
      author: "Rajesh Kumar",
      location: "Wheat Farmer, Punjab"
    },
    {
      quote: "I've been able to get better prices for my vegetables by tracking market trends in the app. Truly a game-changer.",
      author: "Lakshmi Devi",
      location: "Vegetable Grower, Karnataka"
    },
    {
      quote: "The weather alerts have saved my crops multiple times. This app is now essential for my farming operations.",
      author: "Anand Patel",
      location: "Cotton Farmer, Gujarat"
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">What Farmers Say</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of farmers who are already growing smarter with AgriBuddy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500 inline-block" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-lg mb-4 italic">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
