"use client"
import { FaBook, FaUsers, FaChartLine, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const features = [
    {
      icon: <FaBook className="text-3xl" />,
      title: "Comprehensive Catalog",
      description: "Manage thousands of books with detailed metadata including authors, genres, and availability status."
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "User Management",
      description: "Easily track members, their borrow history, and manage user accounts with different permission levels."
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "Analytics Dashboard",
      description: "Get insights into library usage with beautiful charts and statistics on popular books and user activity."
    },
    {
      icon: <FaMobileAlt className="text-3xl" />,
      title: "Fully Responsive",
      description: "Access your library management system from any device - desktop, tablet, or mobile phone."
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Secure Access",
      description: "Role-based authentication ensures only authorized personnel can access sensitive operations."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 pt-22">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            About Our <span className="text-indigo-600">Library Management System</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto pt-12">
            A modern solutions for managing your library's resources, members, and operations with efficiency and ease.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-indigo-700 rounded-2xl p-8 mb-16 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <p className="text-4xl font-bold mb-2">10K+</p>
              <p className="text-indigo-200">Books Managed</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold mb-2">5K+</p>
              <p className="text-indigo-200">Active Members</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold mb-2">99%</p>
              <p className="text-indigo-200">System Uptime</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-indigo-200">Support Available</p>
            </div>
          </div>
        </motion.div>

        {/* Team Section
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 mb-12"
          >
            Meet Our <span className="text-indigo-600">Team</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Johnson", role: "Lead Developer", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Maria Garcia", role: "UI/UX Designer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "Sam Wilson", role: "Database Expert", img: "https://randomuser.me/api/portraits/men/75.jpg" },
              { name: "Taylor Smith", role: "Project Manager", img: "https://randomuser.me/api/portraits/women/65.jpg" }
            ].map((person, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img 
                  src={person.img} 
                  alt={person.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
                  <p className="text-indigo-600">{person.role}</p>
                </div> */}
              {/* </motion.div> */}
            {/* ))} */}
          </div>
        </div>
    //   </div>
    // </div>
  );
}