import React, { useState, useEffect } from 'react';
import { Star, Check, X, Trash2 } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Rating from '../common/Rating';
import Spinner from '../common/Spinner';
import api from '../../services/api';

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await api.reviews.getAll();
      if (response.success) {
        setReviews(response.data);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.message || 'Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (reviewId) => {
    try {
      const response = await api.reviews.approve(reviewId);
      if (response.success) {
        setReviews(
          reviews.map((review) =>
            review._id === reviewId ? response.data : review
          )
        );
      }
    } catch (err) {
      console.error('Error approving review:', err);
      alert(err.message || 'Failed to approve review');
    }
  };

  const handleReject = async (reviewId) => {
    try {
      const response = await api.reviews.reject(reviewId);
      if (response.success) {
        setReviews(
          reviews.map((review) =>
            review._id === reviewId ? response.data : review
          )
        );
      }
    } catch (err) {
      console.error('Error rejecting review:', err);
      alert(err.message || 'Failed to reject review');
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const response = await api.reviews.delete(reviewId);
        if (response.success) {
          setReviews(reviews.filter((review) => review._id !== reviewId));
        }
      } catch (err) {
        console.error('Error deleting review:', err);
        alert(err.message || 'Failed to delete review');
      }
    }
  };

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    return matchesStatus && matchesRating;
  });

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
    avgRating: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0',
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Button variant="outline" onClick={fetchReviews}>
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

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
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div
                key={review._id}
                className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
              >
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.customerName}
                      </h4>
                      {getStatusBadge(review.status)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {review.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Product ID: <span className="font-medium">{review.product}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <Rating rating={review.rating} size="sm" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Review Content */}
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {review.title}
                </h5>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {review.comment}
                </p>

                {/* Review Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {review.helpful || 0} people found this helpful
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {review.status !== 'approved' && (
                      <Button
                        variant="success"
                        size="sm"
                        icon={<Check className="w-4 h-4" />}
                        onClick={() => handleApprove(review._id)}
                      >
                        Approve
                      </Button>
                    )}
                    {review.status !== 'rejected' && (
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<X className="w-4 h-4" />}
                        onClick={() => handleReject(review._id)}
                      >
                        Reject
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => handleDelete(review._id)}
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
      </Card>
    </div>
  );
};

export default ReviewManager;