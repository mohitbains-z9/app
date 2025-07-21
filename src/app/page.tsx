import Head from 'next/head';
import Navbar from "../components/Navbar";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen border-y-indigo-400">
      <Head>
        <title>Library Lynx</title>
        <meta name="description" content="Discover amazing products at Library Lynx" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 bg-blue-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeInLeft">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                  Discover Amazing <span className="text-indigo-700">   Books</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Explore the latest books and find exactly what you're looking for at you'll need.
                </p>
                
              </div>
              <div className="md:w-1/2 animate-fadeInRight">
                <div className="relative">
                  <img 
                    src="https://res.cloudinary.com/dezd7vfmq/image/upload/v1751518432/1_gifl9c.png" 
                    alt="Featured Product" 
                    className="w-full h-auto rounded-xl shadow-xl"
                  />
                 
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-blue-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Product 1 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dezd7vfmq/image/upload/v1752035057/book-covers/zmqtreavadiblnpcy5zr.png" 
                    alt="Product 1" 
                    className="w-full h-full object-contain"
                    
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Object Oriented Programming With C++</h3>
                  <p className="text-gray-600 mb-4">Object-oriented programming organizes software around objects with unique attributes and behaviors. It focuses on modeling real-world entities rather than just functions and logic.
                  </p>
                  <Link href={"https://app-sooty-eta.vercel.app/allBooks/686deef3ef78374be8387372"} className="bg-indigo-200 text-black px-5 py-2 rounded-full font-semibold hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105">View</Link>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dezd7vfmq/image/upload/v1752061524/images_fz9jqs.jpg" 
                    alt="Product 2" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Learning Python</h3>
                  <p className="text-gray-600 mb-4">Learning the core syntax, data structures, and control flow can be achieved in a few weeks with focused effort</p>
                  <Link href={"https://app-sooty-eta.vercel.app/allBooks/686ca0764bd90005a29b3d43"} className="bg-indigo-200 text-black px-5 py-2 rounded-full font-semibold hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105">View</Link>
                </div>
              </div>

              {/* Product 3 */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                <div className="h-64 bg-gray-200 overflow-hidden">
                
                  <img 
                    src="https://res.cloudinary.com/dezd7vfmq/image/upload/v1751552632/dbms_p8mu41.png" 
                    alt="Product 3" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Fundamentals of Database Management System</h3>
                  <p className="text-gray-600 mb-4">This book offers a solid foundation in the subject with clear, simple explanations. It also covers new developments and retains the strengths of its previous edition.
                  </p>
                  <Link href={"https://app-sooty-eta.vercel.app/allBooks/686dede8ef78374be8387370"} className="bg-indigo-200 text-black px-5 py-2 rounded-full font-semibold hover:bg-indigo-500 transition-all duration-300 transform hover:scale-105">View</Link>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/allBooks" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                Explore Books
              </Link>
            </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-indigo-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to transform your Learning experience?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied learner who learn with us every day.</p>
            
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Library Lynx</h3>
              <p className="text-gray-400">Your next Learning destination for quality Books .</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/allBooks" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                <li><a href="/pages/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/pages/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <address className="text-gray-400 not-italic">
                Garhshankar<br />
                Hoshiarpur City, CC 144523<br />
                Email: bainsmohit45690@gmail.com<br />
                Phone: 6283919635
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Library Lynx. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}