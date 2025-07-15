import { motion } from 'framer-motion';

interface Book {
  _id: string;
  title: string;
  author: string;
  description?: string;
  coverPhotoId?: string;
  pdfUrl: string;
  coverPhotoUrl?: string;
  category: string;
  publishedDate?: Date;
  createdAt: Date;
  driveLink: string;
  updatedAt: Date;
}

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
}

export default function BookCard({ book, onDelete }: BookCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        {book.coverPhotoUrl ? (
          <img
            src={book.coverPhotoUrl}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <svg
            className="h-16 w-16 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {book.title}
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(book._id)}
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
            title="Delete book"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </motion.button>
        </div>
        
        <p className="text-gray-600 mb-2">by {book.author}</p>
        
        {book.description && (
          <p className="text-sm text-gray-500 line-clamp-3 mb-3">
            {book.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2">
          {book.category && (
            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
              {book.category}
            </span>
          )}
          {book.publishedDate && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              {new Date(book.publishedDate).getFullYear()}
            </span>
          )}
          {book.pdfUrl && (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              PDF Available
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}