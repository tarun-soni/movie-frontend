'use client';

import { useState } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import { useAuth } from '@/app/context/auth-context';

import {
  GetMovieReviewsDocument,
  useCreateMovieReviewMutation,
} from '@/__generated__/graphql';

interface InputRatingProps {
  movieId: number;
  onReviewAdded?: () => void;
}

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  const handleButtonClick =
    (callback: () => boolean) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      callback();
    };

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-border bg-muted rounded-t-md">
      <button
        type="button"
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        )}
        className={`px-2 py-1 rounded ${
          editor.isActive('heading', { level: 1 })
            ? 'bg-primary text-primary-foreground'
            : 'bg-background hover:bg-muted-foreground/10'
        }`}
      >
        h1
      </button>
      <button
        type="button"
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        )}
        className={`px-2 py-1 rounded ${
          editor.isActive('heading', { level: 2 })
            ? 'bg-primary text-primary-foreground'
            : 'bg-background hover:bg-muted-foreground/10'
        }`}
      >
        h2
      </button>
      <button
        type="button"
        onClick={handleButtonClick(() =>
          editor.chain().focus().toggleBlockquote().run()
        )}
        className={`px-2 py-1 rounded ${
          editor.isActive('blockquote')
            ? 'bg-primary text-primary-foreground'
            : 'bg-background hover:bg-muted-foreground/10'
        }`}
      >
        quote
      </button>
    </div>
  );
};

export default function InputRating({
  movieId,
  onReviewAdded,
}: InputRatingProps) {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const [addMovieReview, { loading }] = useCreateMovieReviewMutation({
    refetchQueries: [
      {
        query: GetMovieReviewsDocument,
        variables: { movieId: movieId.toString() },
      },
    ],
  });

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Heading.configure({
        levels: [1, 2],
        HTMLAttributes: {
          class: 'font-bold',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-primary/50 pl-4 italic',
        },
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none focus:outline-none min-h-[100px] p-4 border-x border-b border-border rounded-b-md bg-background [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-3 [&>blockquote]:my-2 [&>p]:mb-2',
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?._id) {
      setError('Please login to submit a review');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    const reviewText = editor?.getHTML() || '';
    if (!reviewText.trim()) {
      setError('Please write a review');
      return;
    }

    try {
      await addMovieReview({
        variables: {
          movieId: movieId.toString(),
          rating,
          reviewText,
          userId: user._id,
        },
      });

      // Reset form
      setRating(0);
      editor?.commands.setContent('');
      onReviewAdded?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`p-2 rounded-md ${
                rating >= value
                  ? 'text-yellow-500 hover:text-yellow-600'
                  : 'text-gray-300 hover:text-gray-400'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Your Review</label>
        <div className="border rounded-md overflow-hidden">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Use toolbar for formatting</span>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading || !rating}
        className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
