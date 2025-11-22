import React, { useState } from 'react';
import { Star, Check, X, Eye, Trash2, Filter } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Rating from '../common/Rating';
import Pagination from '../common/Pagination';

const ReviewManager = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      productName: 'RoboClean Pro X1',
      productId: 1,
      author: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      rating: 5,
      title: 'Absolutely Amazing!',
      content: 'This robot has completely transformed my daily cleaning routine. The AI navigation is incredibly smart...',
      date: '2024-01-15',
      status: 'pending',
      helpful: 0,
    },
    {
      id: 2,
      productName: 'ChefBot Deluxe',
      productId: 2,
      author: 'Michael Chen',
      email: 'michael.c@email.com',
      rating: 4,
      title: 'Great value for money',
      content: 'Very impressed with the build quality and performance. Setup was easy and the robot is quite efficient...',
      date: '2024-01-14',
      status: 'approved',
      helpful: 12,
    },
    {
      id: 3,
      productName: 'LawnMaster AI',
      productId: 3,
      author: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      rating: 5,
      title: 'Perfect for pet owners!',
      content: 'I have two dogs and this robot handles pet hair like a champ! The suction power is impressive...',
      date: '2024-01-13',
      status: 'approved',
      helpful: 28,
    },
    {
      id: 4,
      productName: 'RoboClean Pro X1',
      productId: 1,
      author: 'John Doe',
      email: 'john.d@email.com',
      rating: 2,
      title: 'Disappointed',
      content: 'Product stopped working after one week. Customer service has been unhelpful...',
      date: '2024-01-12',
      status: 'pending',
      helpful: 3,
    },
    {
      id: 5,
      productName: 'ServeBot Elite',
      productId: 4,
      author: 'Lisa Park',
      email: 'lisa.p@email.com',
      rating: 5,
      title: 'Best investment!',
      content: 'Cannot recommend this enough! It saves me hours every week. The mapping feature is genius...',
      date: '2024-01-11',
      status: 'approved',
      helpful: 45,
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    return matchesStatus && matchesRating;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const handleApprove = (reviewId) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, status: 'approved' } : review
      )
    );
  };

  const handleReject = (reviewId) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, status: 'rejected' } : review
      )
    );
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter((review) => review.id !== reviewId));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const stats = {
    total: reviews.length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    pending: reviews.filter((r) => r.status === 'pending').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
    avgRating: (
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    ).toFixed(1),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Review Management
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Moderate and manage customer reviews
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Reviews</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Approved</p>
          <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rejected</p>
          <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Rating</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.avgRating}</p>
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating
            </label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Reviews List */}
      <Card>
        <div className="space-y-6">
          {paginatedReviews.length > 0 ? (
            paginatedReviews.map((review) => (
              <div
                key={review.id}
                className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.author}
                      </h4>
                      {getStatusBadge(review.status)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {review.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Product: <span className="font-medium">{review.productName}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <Rating rating={review.rating} size="sm" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {review.date}
                    </p>
                  </div>
                </div>

                {/* Review Content */}
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {review.title}
                </h5>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {review.content}
                </p>

                {/* Review Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {review.helpful} people found this helpful
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {review.status === 'pending' && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          icon={<Check className="w-4 h-4" />}
                          onClick={() => handleApprove(review.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={<X className="w-4 h-4" />}
                          onClick={() => handleReject(review.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {review.status === 'rejected' && (
                      <Button
                        variant="success"
                        size="sm"
                        icon={<Check className="w-4 h-4" />}
                        onClick={() => handleApprove(review.id)}
                      >
                        Approve
                      </Button>
                    )}
                    {review.status === 'approved' && (
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<X className="w-4 h-4" />}
                        onClick={() => handleReject(review.id)}
                      >
                        Reject
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => handleDelete(review.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Reviews Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
};



export default ReviewManager;