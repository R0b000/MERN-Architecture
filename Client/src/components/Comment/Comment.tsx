import React, { useState } from 'react';
import { useComments } from './Comment.logic';
import { Button } from 'shared-ui/components/Button/Button';
import { Rate } from 'shared-ui/components/Rate/Rate';
import './Comment.css';

interface CommentListProps {
  productId: string;
}

export const CommentList: React.FC<CommentListProps> = ({ productId }) => {
  const { comments, loading, error, loadComments, addComment, markHelpful } = useComments();
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  React.useEffect(() => {
    loadComments(productId);
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addComment(productId, rating, content);
    if (success) {
      setRating(5);
      setContent('');
      setShowForm(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="comment-loading">Loading comments...</div>;
  }

  if (error) {
    return <div className="comment-error">{error}</div>;
  }

  return (
    <div className="comment-container">
      <div className="comment-header">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <Button onClick={() => setShowForm(!showForm)} variant="primary">
          {showForm ? 'Cancel' : 'Write a Review'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="comment-form mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <Rate value={rating} onChange={setRating} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Share your experience with this product..."
              required
            />
          </div>
          <Button type="submit" variant="primary">Submit Review</Button>
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
      ) : (
        <div className="comment-list space-y-4">
          {comments.map((comment) => (
            <div key={comment._id} className="comment-item p-4 border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{comment.userId.name}</span>
                    {comment.isVerifiedPurchase && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <Rate value={comment.rating} readOnly />
                </div>
                <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="text-gray-700 mb-3">{comment.content}</p>
              {comment.images && comment.images.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {comment.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Review image ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
              <button
                onClick={() => markHelpful(comment._id)}
                className="text-sm text-gray-500 hover:text-blue-600"
              >
                👍 Helpful ({comment.helpfulCount})
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
