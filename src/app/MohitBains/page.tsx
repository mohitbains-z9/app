"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiBook, FiUser, FiFileText, FiImage, FiLink, FiCalendar, FiSave, FiLoader, FiAlertCircle, FiCheck } from 'react-icons/fi';

type Errors = {
  title?: string;
  author?: string;
  description?: string;
  pdfUrl?: string;
  coverPhotoUrl?: string;
  category?: string;
  publishedDate?: string;
  driveLink?: string;
  form?: string;
};

const AddBookPage = () => {
  const router = useRouter();
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    pdfUrl: '',
    coverPhotoUrl: '',
    category: 'Other',
    publishedDate: '',
    driveLink: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors: Errors = {};
    
    if (!book.title.trim()) newErrors.title = 'Book title is required';
    else if (book.title.length > 100) newErrors.title = 'Title cannot exceed 100 characters';
    
    if (!book.author.trim()) newErrors.author = 'Author name is required';
    else if (book.author.length > 50) newErrors.author = 'Author name cannot exceed 50 characters';
    
    if (book.description.length > 500) newErrors.description = 'Description cannot exceed 500 characters';
    
    if (!book.pdfUrl.trim()) newErrors.pdfUrl = 'PDF URL is required';
    
    if (!book.driveLink.trim()) newErrors.driveLink = 'Drive link is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      const bookData = {
        ...book,
        publishedDate: book.publishedDate ? new Date(book.publishedDate) : null
      };
      
      // Replace with your actual API call
      const response = await fetch('/api/gdrive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      setSuccessMessage('Book added successfully!');
      
      // Reset form after successful submission
      setBook({
        title: '',
        author: '',
        description: '',
        pdfUrl: '',
        coverPhotoUrl: '',
        category: 'Other',
        publishedDate: '',
        driveLink: ''
      });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/books');
      }, 2000);
    } catch (error) {
      console.error('Error adding book:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Failed to add the book. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren" as const,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          className="bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-indigo-600 p-6">
            <motion.h1 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <FiBook className="inline-block" />
              Add New Book
            </motion.h1>
            <motion.p variants={itemVariants} className="text-indigo-100 mt-1">
              Fill in the details to add a new book to the library
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
          >
            {errors.form && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg"
              >
                <FiAlertCircle className="flex-shrink-0" />
                <span>{errors.form}</span>
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-green-50 text-green-600 p-3 rounded-lg"
              >
                <FiCheck className="flex-shrink-0" />
                <span>{successMessage}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FiBook className="inline-block" /> Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={book.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pl-10`}
                  placeholder="Enter book title"
                />
                {errors.title && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.title}
                  </motion.p>
                )}
              </motion.div>

              {/* Author */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FiUser className="inline-block" /> Author <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={book.author}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.author ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pl-10`}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.author}
                  </motion.p>
                )}
              </motion.div>

              {/* PDF URL */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="pdfUrl" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FiLink className="inline-block" /> PDF URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="pdfUrl"
                  name="pdfUrl"
                  value={book.pdfUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.pdfUrl ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pl-10`}
                  placeholder="https://example.com/book.pdf"
                />
                {errors.pdfUrl && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.pdfUrl}
                  </motion.p>
                )}
              </motion.div>

              {/* Drive Link */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="driveLink" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FiLink className="inline-block" /> Google Drive Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="driveLink"
                  name="driveLink"
                  value={book.driveLink}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.driveLink ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pl-10`}
                  placeholder="https://drive.google.com/..."
                />
                {errors.driveLink && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.driveLink}
                  </motion.p>
                )}
              </motion.div>

              {/* Category */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={book.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Biography">Biography</option>
                  <option value="Other">Other</option>
                </select>
              </motion.div>

              {/* Published Date */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FiCalendar className="inline-block" /> Published Date
                </label>
                <input
                  type="date"
                  id="publishedDate"
                  name="publishedDate"
                  value={book.publishedDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pl-10"
                />
              </motion.div>

              {/* Cover Photo URL */}
              <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                <label htmlFor="coverPhotoUrl" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FiImage className="inline-block" /> Cover Photo URL
                </label>
                <input
                  type="url"
                  id="coverPhotoUrl"
                  name="coverPhotoUrl"
                  value={book.coverPhotoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition pl-10"
                  placeholder="https://example.com/cover.jpg"
                />
                {book.coverPhotoUrl && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 flex justify-center"
                  >
                    <img 
                      src={book.coverPhotoUrl} 
                      alt="Book cover preview" 
                      className="h-40 object-contain rounded-lg border border-gray-200"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                  <FiFileText className="inline-block" /> Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={book.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg border ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
                  placeholder="Enter book description"
                />
                {errors.description && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.description}
                  </motion.p>
                )}
                <p className="text-xs text-gray-500 text-right">
                  {book.description.length}/500 characters
                </p>
              </motion.div>
            </div>

            {/* Form Actions */}
            <motion.div
              variants={itemVariants}
              className="flex justify-end gap-3 pt-4"
            >
              <motion.button
                type="button"
                onClick={() => router.back()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition flex items-center gap-2 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave />
                    Save Book
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddBookPage;