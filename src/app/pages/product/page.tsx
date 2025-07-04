'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiBook, FiSearch, FiUser, FiClock, FiBarChart2, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const LibraryManagementPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FiBook className="w-8 h-8" />,
      title: "Comprehensive Catalog",
      description: "Manage thousands of books with detailed metadata and categorization."
    },
    {
      icon: <FiUser className="w-8 h-8" />,
      title: "Member Management",
      description: "Track member activity, borrowing history, and manage accounts effortlessly."
    },
    {
      icon: <FiClock className="w-8 h-8" />,
      title: "Loan Tracking",
      description: "Automated due date reminders and late fee calculations."
    },
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "Advanced Search",
      description: "Find any book instantly with our powerful search engine."
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Get insights into library usage and popular titles."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Head Librarian, City Public Library",
      quote: "This system cut our administrative work by 60% and improved member satisfaction."
    },
    {
      name: "Michael Chen",
      role: "Library Director, University of Toronto",
      quote: "The analytics features have transformed how we manage our collection."
    },
    {
      name: "Emma Rodriguez",
      role: "School Librarian, Springfield High",
      quote: "So intuitive to use - even our student volunteers can manage it easily."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Library Lynx | Modern Library Management</title>
        <meta name="description" content="Next-generation library management system" />
      </Head>

      {/* Navigation */}
      {/* <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FiBook className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Library Lynx</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
            <button className="md:hidden text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 md:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Modern Library Management <span className="text-indigo-600">Simplified</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Streamline your library operations with our intuitive, cloud-based management system designed for libraries of all sizes.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg flex items-center justify-center">
                  Start Free Trial <FiArrowRight className="ml-2" />
                </button>
                <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-96 md:h-auto">
                <motion.div 
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-2xl shadow-xl transform rotate-6"
                ></motion.div>
                <motion.div 
                  animate={{ 
                    y: [0, 15, 0],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute top-12 left-12 w-64 h-64 bg-white rounded-2xl shadow-2xl z-10 overflow-hidden"
                >
                  <img 
                    src="https://res.cloudinary.com/dezd7vfmq/image/upload/v1751553627/1_n5jdh9.webp" 
                    alt="Library Management Dashboard"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute top-24 left-24 w-64 h-64 bg-indigo-50 rounded-2xl shadow-xl transform -rotate-3 z-0"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your library efficiently
            </p>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Feature List */}
            <div className="md:w-1/3 mb-8 md:mb-0">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveFeature(index)}
                  className={`p-6 rounded-lg cursor-pointer transition-colors mb-4 ${activeFeature === index ? 'bg-indigo-100 border-l-4 border-indigo-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full mr-4 ${activeFeature === index ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Detail */}
            <div className="md:w-2/3 md:pl-12">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-xl p-8 h-full flex flex-col justify-center"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-full bg-indigo-600 text-white mr-4">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{features[activeFeature].title}</h3>
                </div>
                <p className="text-gray-700 text-lg mb-8">{features[activeFeature].description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <p className="text-gray-700">Additional detail about this feature {item} that highlights its value</p>
                    </div>
                  ))}
                </div>

                {!isMobile && (
                  <motion.div 
                    className="mt-8 relative h-64 bg-indigo-50 rounded-lg overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-500">Feature {activeFeature + 1} visualization</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials
      <section id="testimonials" className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Libraries Worldwide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of libraries who have transformed their operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-indigo-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              See More Success Stories
            </motion.button>
          </div>
        </div>
      </section> */}

      {/* Pricing */}
      {/* <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your library's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$99",
                period: "per month",
                description: "Perfect for small libraries and schools",
                features: ["Up to 5,000 titles", "Basic reporting", "Email support", "Up to 3 staff accounts"]
              },
              {
                name: "Professional",
                price: "$249",
                period: "per month",
                description: "For medium-sized libraries and institutions",
                features: ["Up to 25,000 titles", "Advanced analytics", "Priority support", "Up to 10 staff accounts", "API access"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large library systems and consortia",
                features: ["Unlimited titles", "Dedicated account manager", "24/7 support", "Unlimited staff accounts", "Custom integrations", "On-premise option"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`rounded-xl shadow-md overflow-hidden ${plan.popular ? 'ring-2 ring-indigo-600 transform md:-translate-y-3' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-indigo-600 text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="text-gray-600"> {plan.period}</span>}
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <FiCheckCircle className="text-green-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3 rounded-lg font-medium ${plan.popular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    Get Started
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Library?</h2>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Join thousands of libraries who have modernized their operations with our system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-medium shadow-lg"
            >
              Start Free 30-Day Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium"
            >
              Schedule a Demo
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FiBook className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold text-white">Library Lynx</span>
              </div>
              <p className="text-sm">
                Modern library management solutions for the digital age.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Library Lynx. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LibraryManagementPage;