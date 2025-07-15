"use client";
import { useState } from 'react';
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

interface BookFormProps {
  onAddBook: (book: Omit<Book, '_id' | 'createdAt' | 'updatedAt'>) => void;
}

export default function BookForm({ onAddBook }: BookFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    pdfUrl: '',
    coverPhotoUrl: '',
    category: 'Other',
    publishedDate: '',
    driveLink: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Book title is required';
    else if (formData.title.length > 100) newErrors.title = 'Title cannot exceed 100 characters';
    
    if (!formData.author.trim()) newErrors.author = 'Author name is required';
    else if (formData.author.length > 50) newErrors.author = 'Author name cannot exceed 50 characters';
    
    if (formData.description.length > 500) newErrors.description = 'Description cannot exceed 500 characters';
    
    if (!formData.pdfUrl.trim()) newErrors.pdfUrl = 'PDF URL is required';
    
    if (!formData.driveLink.trim()) newErrors.driveLink = 'Drive link is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const newBook: Omit<Book, '_id' | 'createdAt' | 'updatedAt'> = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim() || undefined,
        pdfUrl: formData.pdfUrl.trim(),
        coverPhotoUrl: formData.coverPhotoUrl.trim() || undefined,
        category: formData.category,
        publishedDate: formData.publishedDate ? new Date(formData.publishedDate) : undefined,
        driveLink: formData.driveLink.trim()
      };

      onAddBook(newBook);
      
      // Reset form
      setFormData({
        title: '',
        author: '',
        description: '',
        pdfUrl: '',
        coverPhotoUrl: '',
        category: 'Other',
        publishedDate: '',
        driveLink: ''
      });
      setErrors({});
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Book</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.form && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg">
            {errors.form}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">{errors.author}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pdfUrl" className="block text-sm font-medium text-gray-700 mb-1">
              PDF URL *
            </label>
            <input
              type="url"
              id="pdfUrl"
              name="pdfUrl"
              value={formData.pdfUrl}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.pdfUrl ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/book.pdf"
            />
            {errors.pdfUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.pdfUrl}</p>
            )}
          </div>

          <div>
            <label htmlFor="driveLink" className="block text-sm font-medium text-gray-700 mb-1">
              Drive Link *
            </label>
            <input
              type="url"
              id="driveLink"
              name="driveLink"
              value={formData.driveLink}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.driveLink ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://drive.google.com/..."
            />
            {errors.driveLink && (
              <p className="text-red-500 text-sm mt-1">{errors.driveLink}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Science">Science</option>
              <option value="History">History</option>
              <option value="Biography">Biography</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700 mb-1">
              Published Date
            </label>
            <input
              type="date"
              id="publishedDate"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="coverPhotoUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Cover Photo URL
          </label>
          <input
            type="url"
            id="coverPhotoUrl"
            name="coverPhotoUrl"
            value={formData.coverPhotoUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter book description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
          <p className="text-xs text-gray-500 text-right mt-1">
            {formData.description.length}/500 characters
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Adding...' : 'Add Book'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}