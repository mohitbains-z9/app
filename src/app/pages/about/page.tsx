import { motion } from 'framer-motion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Library Management System',
  description: 'Learn about our Library Management System',
};

const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const features = [
    {
      title: "Easy Book Management",
      description: "Add, edit, and organize books with intuitive controls.",
      icon: "📚"
    },
    {
      title: "Member Tracking",
      description: "Manage library members and their borrowing history.",
      icon: "👥"
    },
    {
      title: "Real-time Availability",
      description: "Check book availability in real-time.",
      icon: "⏱️"
    },
    {
      title: "Advanced Search",
      description: "Find books quickly with powerful search filters.",
      icon: "🔍"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={slideUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            About Our <span className="text-indigo-600">Library</span> System
          </h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "150px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-1 bg-indigo-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Introduction Section */}
        <motion.div variants={slideUp} className="mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 lg:flex gap-8">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <motion.img 
                src="/library-about.jpg" 
                alt="Library"
                className="rounded-xl shadow-md w-full h-auto object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Modern Library Management
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Our Library Management System is designed to streamline all operations of a library, 
                making it easier for librarians and users to manage and access resources efficiently.
              </p>
              <p className="text-gray-600 mb-6 text-lg">
                Built with Next.js and Tailwind CSS, this application offers a seamless user experience 
                with responsive design and modern UI components.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div variants={fadeIn} className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key <span className="text-indigo-600">Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div variants={fadeIn} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our <span className="text-indigo-600">Team</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Lead Developer", img: "/team1.jpg" },
              { name: "Maria Garcia", role: "UI/UX Designer", img: "/team2.jpg" },
              { name: "Sam Wilson", role: "Project Manager", img: "/team3.jpg" }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-indigo-100 overflow-hidden">
                  <motion.img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-indigo-600 mb-4">{member.role}</p>
                  <div className="flex space-x-4">
                    {['twitter', 'github', 'linkedin'].map((social) => (
                      <motion.a
                        key={social}
                        href="#"
                        whileHover={{ y: -3 }}
                        className="text-gray-500 hover:text-indigo-600"
                      >
                        <span className="sr-only">{social}</span>
                        <div className="h-6 w-6">
                          {/* Replace with actual icons */}
                          {social === 'twitter' && '𝕏'}
                          {social === 'github' && '⎔'}
                          {social === 'linkedin' && 'Ⓛ'}
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={slideUp}
          className="bg-indigo-700 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to transform your library experience?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of libraries already using our system to manage their collections efficiently.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-700 font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;