'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminRegister() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await axios.post('/api/admin/register', {
        name: data.name,
        email: data.email,
        password: data.password
      });
      
      // Store token and redirect
      localStorage.setItem('adminToken', response.data.token);
      router.push('/MohitBains');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-lg shadow-md p-8 sm:p-10 border border-gray-100">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl font-bold text-gray-800">Admin Registration</h1>
            <p className="text-gray-500 mt-2">Create your admin account</p>
          </motion.div>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className={`w-full px-4 py-2.5 rounded-md border focus:outline-none focus:ring-1 ${errors.name ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
                placeholder="John Doe"
              />
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-xs text-red-500"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={`w-full px-4 py-2.5 rounded-md border focus:outline-none focus:ring-1 ${errors.email ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
                placeholder="admin@example.com"
              />
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-xs text-red-500"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                className={`w-full px-4 py-2.5 rounded-md border focus:outline-none focus:ring-1 ${errors.password ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
                placeholder="••••••••"
              />
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-xs text-red-500"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => 
                    value === watch('password') || 'Passwords do not match'
                })}
                className={`w-full px-4 py-2.5 rounded-md border focus:outline-none focus:ring-1 ${errors.confirmPassword ? 'border-red-300 focus:ring-red-300' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-xs text-red-500"
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-2.5 px-4 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Register'}
              </button>
            </motion.div>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center text-sm"
          >
            <p className="text-gray-500">
              Already have an account?{' '}
              <Link href="/admin/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}