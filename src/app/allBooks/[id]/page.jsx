// app/books/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/bookcard/${id}`);
        
        if (!response.ok) {
          throw new Error(response.status === 404 ? 'Book not found' : 'Failed to fetch book');
        }
        
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#e6eff2] pt-22">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-300 rounded w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-1/3">
                <div className="aspect-[2/3] bg-gray-300 rounded-xl"></div>
              </div>
              
              <div className="w-full lg:w-2/3 space-y-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
                
                <div className="pt-6">
                  <div className="h-12 bg-gray-300 rounded w-48"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#e6eff2] flex items-center justify-center pt-22">
        <p className="text-xl text-gray-600">{error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#e6eff2] flex items-center justify-center pt-22">
        <p className="text-xl text-gray-600">Book not found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-[#e6eff2] pt-22">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
            whileHover={{ scale: 1.01 }}
          >
            {book.title}
          </motion.h1>
          <motion.p 
            className="text-2xl text-gray-700 mb-8"
            whileHover={{ scale: 1.01 }}
          >
            By {book.author}
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-1/3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <img 
                src={book.coverPhotoUrl || '/default-book-cover.jpg'} 
                alt={`${book.title} cover`} 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="w-full lg:w-2/3"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <motion.div 
                className="prose prose-xl max-w-none text-gray-700 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-xl leading-relaxed">{book.description}</p>
              </motion.div>

              {book.pdfUrl && (
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8"
                >
                  <a
                    href={book.pdfUrl}
                    className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="-ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download PDF
                  </a>
                </motion.div>
              )}
            </div>

            {/* Book Details */}
            <motion.div 
              variants={itemVariants}
              className="mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Book Details</h2>
              <div className="grid grid-cols-1 gap-6">
                {book.publishedDate && (
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Published</h3>
                    <p className="text-lg text-gray-900">{formatDate(book.publishedDate)}</p>
                  </div>
                )}
                {book.genre && (
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Genre</h3>
                    <p className="text-lg text-gray-900">{book.genre}</p>
                  </div>
                )}
                {book.pages && (
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Pages</h3>
                    <p className="text-lg text-gray-900">{book.pages}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}