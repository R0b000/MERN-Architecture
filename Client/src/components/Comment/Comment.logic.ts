import { useState, useEffect } from 'react';
import { httpService } from '../../services/HttpService';

interface IComment {
  _id: string;
  productId: string;
  userId: {
    _id: string;
    name: string;
  };
  rating: number;
  content: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  replies?: IComment[];
  createdAt: string;
}

interface ICommentsHook {
  comments: IComment[];
  loading: boolean;
  error: string | null;
  loadComments: (productId: string) => Promise<void>;
  addComment: (productId: string, rating: number, content: string, images?: string[]) => Promise<boolean>;
  markHelpful: (commentId: string) => Promise<void>;
}

export const useComments = (): ICommentsHook => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComments = async (productId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await httpService.get<IComment[]>(`/api/comments/product/${productId}`);
      
      if (response.success && response.data) {
        setComments(response.data);
      } else {
        setError(response.messages?.[0] || 'Failed to load comments');
      }
    } catch (err) {
      setError('An error occurred while loading comments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (
    productId: string,
    rating: number,
    content: string,
    images?: string[]
  ): Promise<boolean> => {
    try {
      const response = await httpService.post<IComment>('/api/comments', {
        productId,
        rating,
        content,
        images
      });

      if (response.success && response.data) {
        setComments(prev => [response.data!, ...prev]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to add comment:', err);
      return false;
    }
  };

  const markHelpful = async (commentId: string) => {
    try {
      const response = await httpService.post<{ helpfulCount: number }>(
        `/api/comments/${commentId}/helpful`
      );

      if (response.success && response.data) {
        setComments(prev =>
          prev.map(comment =>
            comment._id === commentId
              ? { ...comment, helpfulCount: response.data!.helpfulCount }
              : comment
          )
        );
      }
    } catch (err) {
      console.error('Failed to mark comment as helpful:', err);
    }
  };

  return {
    comments,
    loading,
    error,
    loadComments,
    addComment,
    markHelpful
  };
};
