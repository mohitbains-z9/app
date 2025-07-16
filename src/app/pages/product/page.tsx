"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiBook, FiSearch, FiUsers, FiBarChart2, FiClock, FiCheckCircle } from 'react-icons/fi';

const ProductPage = () => {
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

  const features = [
    {
      icon: <FiBook className="w-8 h-8" />,
      title: "Comprehensive Catalog",
      description: "Manage thousands of books with detailed metadata including author, publisher, genres, and more."
    },
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "Advanced Search",
      description: "Find any book in seconds with our powerful search engine that supports filters and keywords."
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "User Management",
      description: "Track member details, borrowing history, and manage user accounts with different permission levels."
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Get insights into library usage with beautiful charts and statistics about book circulation."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Head Librarian, City Public Library",
      quote: "This system has transformed how we manage our collection. Circulation efficiency improved by 40%!"
    },
    {
      name: "Michael Chen",
      role: "IT Administrator, University Library",
      quote: "The most intuitive library management software we've used. Implementation was seamless."
    },
    {
      name: "Emma Rodriguez",
      role: "School Librarian",
      quote: "Perfect for our small school library. The students love the new digital check-out system."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Libra | Modern Library Management System</title>
        <meta name="description" content="Next-generation library management software for institutions of all sizes" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FiBook className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Library Lynx</span>
            </div>
            {/* <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-700 hover:text-indigo-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</a>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Modern Library Management
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-5 md:max-w-3xl">
            Transform your library with our intuitive, cloud-based management system designed for institutions of all sizes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <img 
            src="/library-dashboard-screenshot.jpg" 
            alt="Library Management Dashboard" 
            className="w-full h-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://via.placeholder.com/1200x600?text=Library+Dashboard+Preview";
            }}
          />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Everything you need to efficiently manage your library collection and users
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl cursor-pointer transition-all ${activeFeature === index ? 'bg-white shadow-lg border-l-4 border-indigo-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-lg ${activeFeature === index ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-600'}`}>
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-1 text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center justify-center">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg w-full h-64 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600">
                  {features[activeFeature].icon}
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">{features[activeFeature].title}</h3>
                <p className="mt-2 text-gray-600">{features[activeFeature].description}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <FiClock className="w-6 h-6" />, title: "Real-time Updates", desc: "All changes sync instantly across devices" },
            { icon: <FiCheckCircle className="w-6 h-6" />, title: "Automated Reminders", desc: "Reduce late returns with email/SMS notifications" },
            { icon: <FiBook className="w-6 h-6" />, title: "Barcode Support", desc: "Scan ISBNs or your custom barcodes" },
            { icon: <FiUsers className="w-6 h-6" />, title: "Multi-branch Support", desc: "Manage multiple locations from one dashboard" },
            { icon: <FiBarChart2 className="w-6 h-6" />, title: "Custom Reports", desc: "Generate reports tailored to your needs" },
            { icon: <FiSearch className="w-6 h-6" />, title: "API Access", desc: "Integrate with your existing systems" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-indigo-100 text-indigo-600">
                  {item.icon}
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">{item.title}</h3>
              </div>
              <p className="mt-2 text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Library?</h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Join thousands of institutions using our modern library management system.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Start Free 30-Day Trial
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
                Schedule a Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p>© {new Date().getFullYear()} Library Lynx  Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;