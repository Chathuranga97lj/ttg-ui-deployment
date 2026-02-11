"use client";
import { useState, useEffect } from "react";

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  avatar?: string;
}

export default function Reviews() {
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Asanka Karunapala",
      rating: 5,
      text: "Amazing service! The expert helped me understand complex calculus concepts. My grades improved significantly after using this platform.",
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      rating: 5,
      text: "The step-by-step explanations were incredibly helpful. I finally understood organic chemistry after struggling for months.",
    },
    {
      id: 3,
      name: "James Rodriguez",
      rating: 4,
      text: "Fast delivery and great quality work. The tutor was patient and explained everything clearly. Highly recommend!",
    },
    {
      id: 4,
      name: "Emily Chen",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur. At sed duis ultricies quam egestas. Sagittis nisi vivamus leo gravida aliquet molestie suspendisse mattis.",
    },
    {
      id: 5,
      name: "Michael Brown",
      rating: 4,
      text: "Great platform for getting help with assignments. The experts are knowledgeable and responsive. Will use again!",
    },
    {
      id: 6,
      name: "Jessica Taylor",
      rating: 5,
      text: "Saved my semester! The detailed explanations helped me ace my physics exam. Thank you so much!",
    },
    {
      id: 7,
      name: "David Wilson",
      rating: 5,
      text: "Professional service with excellent communication. The solution was delivered ahead of schedule with thorough explanations.",
    },
    {
      id: 8,
      name: "Amanda Garcia",
      rating: 4,
      text: "Very impressed with the quality. The tutor went above and beyond to ensure I understood every concept.",
    },
    {
      id: 9,
      name: "Chris Johnson",
      rating: 5,
      text: "Best investment for my education. The detailed breakdowns made complex topics easy to understand.",
    },
    {
      id: 10,
      name: "Rachel Kim",
      rating: 5,
      text: "Excellent experience! The expert was incredibly helpful and patient. My understanding of statistics improved dramatically.",
    },
  ];

  const topRowReviews = reviews.slice(0, 5);
  const bottomRowReviews = reviews.slice(5, 10);

  // Auto-slide for desktop
  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentSlide1((prev) => (prev + 1) % topRowReviews.length);
    }, 4000);
    const interval2 = setInterval(() => {
      setCurrentSlide2((prev) => (prev + 1) % bottomRowReviews.length);
    }, 5000);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [topRowReviews.length, bottomRowReviews.length]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const ReviewCard = ({ review }: { review: Review }) => (
    <div className="bg-white rounded-2xl p-5 shadow-md max-w-[280px] md:max-w-[320px] shrink-0 mb-2">
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center overflow-hidden">
          <span className="text-white font-semibold text-sm">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="label-regular-text font-semibold text-gray-900">
            {review.name}
          </h4>
          {renderStars(review.rating)}
        </div>
      </div>
      <p className="caption-text text-gray-600 leading-relaxed border-t border-blue-200 pt-2">
        {review.text}
      </p>
    </div>
  );

  return (
    <section className="w-full py-16 md:py-24 bg-[#EEF4FF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Header - Top */}
          <div className="text-center mb-8">
            <span
              style={{ color: "#003893", backgroundColor: "#DBEAFE" }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            >
              Testimonials
            </span>
            <h2 style={{ color: "#002662" }} className="h4-semi-bold-text mb-4">
              Loved students around the world
            </h2>
            {/* Avatar stack + reviews count */}
            <div className="flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 border-2 border-white"
                  />
                ))}
              </div>
              <span className="caption-text text-gray-600">1000+ reviews</span>
            </div>
          </div>

          {/* Mobile Slider Row 1 */}
          <div className="relative mb-4 overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide1 * 296}px)`,
              }}
            >
              {[...topRowReviews, ...topRowReviews].map((review, idx) => (
                <ReviewCard key={`mobile-top-${idx}`} review={review} />
              ))}
            </div>
          </div>

          {/* Mobile Slider Row 2 */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(bottomRowReviews.length - 1 - currentSlide2) * 296}px)`,
              }}
            >
              {[...bottomRowReviews, ...bottomRowReviews].map((review, idx) => (
                <ReviewCard key={`mobile-bottom-${idx}`} review={review} />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Row 1: First Slider (Left) + Header (Right) */}
          <div className="flex items-center gap-8 mb-6">
            {/* First Slider - Left Side */}
            <div className="flex-1 overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentSlide1 * 340}px)`,
                }}
              >
                {[...topRowReviews, ...topRowReviews].map((review, idx) => (
                  <ReviewCard key={`top-${idx}`} review={review} />
                ))}
              </div>
            </div>

            {/* Header - Right Side */}
            <div className="w-[280px] shrink-0 text-left">
              <span
                style={{ color: "#003893", backgroundColor: "#DBEAFE" }}
                className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              >
                Testimonials
              </span>
              <h2
                style={{ color: "#002662", lineHeight: "normal" }}
                className="h4-semi-bold-text mb-4"
              >
                Loved students around the world
              </h2>
              {/* Avatar stack + reviews count */}
              <div className="flex items-center justify-start gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 border-2 border-white"
                    />
                  ))}
                </div>
                <span className="caption-text text-gray-600">
                  1000+ reviews
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: Second Slider - Full Width */}
          <div className="relative overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(bottomRowReviews.length - 1 - currentSlide2) * 340}px)`,
              }}
            >
              {[...bottomRowReviews, ...bottomRowReviews].map((review, idx) => (
                <ReviewCard key={`bottom-${idx}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
