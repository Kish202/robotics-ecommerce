import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Flag, ChevronDown } from 'lucide-react';
import Card from '../common/Card';
import Rating from '../common/Rating';
import Button from '../common/Button';
import Badge from '../common/Badge';

const Reviews = ({ productId, reviews = [] }) => {
  const [sortBy, setSortBy] = useState('helpful');
  const [filterRating, setFilterRating] = useState('all');
  const [visibleReviews, setVisibleReviews] = useState(5);

  // Mock reviews if none provided
  const defaultReviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: '👩',
      rating: 5,
      date: '2024-01-15',
      verified: true,
      title: 'Absolutely Amazing Product!',
      content: 'This robot has completely transformed my daily cleaning routine. The AI navigation is incredibly smart, and it never misses a spot. The app control makes it super convenient to schedule cleanings while I\'m at work. Highly recommend!',
      helpful: 45,
      notHelpful: 2,
      images: ['📷', '📷', '📷'],
    },
    {
      id: 2,
      author: 'Michael Chen',
      avatar: '👨',
      rating: 4,
      date: '2024-01-10',
      verified: true,
      title: 'Great value for money',
      content: 'Very impressed with the build quality and performance. Setup was easy and the robot is quite efficient. Battery life could be better, but overall a solid purchase. The customer service was also excellent when I had questions.',
      helpful: 32,
      notHelpful: 1,
      images: [],
    },
    {
      id: 3,
      author: 'Emily Rodriguez',
      avatar: '👩‍🦰',
      rating: 5,
      date: '2024-01-05',
      verified: true,
      title: 'Perfect for pet owners!',
      content: 'I have two dogs and this robot handles pet hair like a champ! The suction power is impressive and it doesn\'t get tangled. The noise level is also very acceptable. My dogs were scared at first but now they ignore it completely.',
      helpful: 28,
      notHelpful: 0,
      images: ['📷'],
    },
    {
      id: 4,
      author: 'David Thompson',
      avatar: '👴',
      rating: 4,
      date: '2023-12-28',
      verified: false,
      title: 'Good but not perfect',
      content: 'Works well for the most part. Navigation is smart but occasionally it gets stuck under furniture. The app could use some improvements in terms of UI. Battery life is decent. Overall satisfied with the purchase.',
      helpful: 15,
      notHelpful: 3,
      images: [],
    },
    {
      id: 5,
      author: 'Lisa Park',
      avatar: '👩‍💼',
      rating: 5,
      date: '2023-12-20',
      verified: true,
      title: 'Best investment this year!',
      content: 'Cannot recommend this enough! It saves me hours every week. The mapping feature is genius and the edge cleaning is thorough. It\'s surprisingly quiet and the dustbin is easy to empty. Worth every penny!',
      helpful: 52,
      notHelpful: 1,
      images: ['📷', '📷'],
    },
    {
      id: 6,
      author: 'James Wilson',
      avatar: '👨‍💼',
      rating: 3,
      date: '2023-12-15',
      verified: true,
      title: 'Decent but has issues',
      content: 'It does the job but I expected more for the price. Sometimes it misses spots and the app connectivity can be flaky. Customer support was helpful though. It\'s okay but not exceptional.',
      helpful: 8,
      notHelpful: 12,
      images: [],
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  // Calculate rating summary
  const ratingCounts = {
    5: displayReviews.filter((r) => r.rating === 5).length,
    4: displayReviews.filter((r) => r.rating === 4).length,
    3: displayReviews.filter((r) => r.rating === 3).length,
    2: displayReviews.filter((r) => r.rating === 2).length,
    1: displayReviews.filter((r) => r.rating === 1).length,
  };

  const averageRating = (
    displayReviews.reduce((sum, review) => sum + review.rating, 0) / displayReviews.length
  ).toFixed(1);

  const totalReviews = displayReviews.length;

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Customer Reviews
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          See what our customers are saying
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {averageRating}
            </div>
            <Rating rating={parseFloat(averageRating)} size="lg" />
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Based on {totalReviews} reviews
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingCounts[star];
              const percentage = (count / totalReviews) * 100;
              return (
                <button
                  key={star}
                  onClick={() => setFilterRating(star.toString())}
                  className={`w-full flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors ${
                    filterRating === star.toString() ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
                    {star} ⭐
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Write Review Button */}
          <Button variant="primary" fullWidth className="mt-6">
            Write a Review
          </Button>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="helpful">Most Helpful</option>
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>

            {filterRating !== 'all' && (
              <button
                onClick={() => setFilterRating('all')}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Individual Reviews */}
          {displayReviews.slice(0, visibleReviews).map((review) => (
            <div
              key={review.id}
              className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.author}
                      </h4>
                      {review.verified && (
                        <Badge variant="success" size="sm">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Rating rating={review.rating} size="sm" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Flag className="w-4 h-4" />
                </button>
              </div>

              {/* Review Content */}
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                {review.title}
              </h5>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {review.content}
              </p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-3xl cursor-pointer hover:ring-2 ring-blue-500 transition-all"
                    >
                      {image}
                    </div>
                  ))}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  <span>Not Helpful ({review.notHelpful})</span>
                </button>
              </div>
            </div>
          ))}

          {/* Load More */}
          {visibleReviews < displayReviews.length && (
            <div className="text-center">
              <Button
                variant="outline"
                icon={<ChevronDown className="w-5 h-5" />}
                onClick={handleLoadMore}
              >
                Load More Reviews
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Reviews;