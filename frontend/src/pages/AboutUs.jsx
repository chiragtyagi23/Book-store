import React from 'react';

function AboutUs() {
  return (
    <div className="bg-black text-white p-6 md:p-12">
      {/* Container for content */}
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-400 mb-6">
          About Our Book Store
        </h1>

        {/* Introduction Section */}
        <p className="text-lg text-gray-300 text-center mb-8">
          Welcome to <span className="text-green-400 font-semibold">PageTurner Bookstore</span>, where the love for reading meets an endless variety of genres and authors. 
          We bring you the best collection of books from all over the world.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-red-400 mb-2">📚 Wide Collection</h2>
            <p className="text-gray-400">
              We offer books across genres like Fiction, Non-Fiction, Mystery, Sci-Fi, Romance, and more to cater to all kinds of readers.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-blue-400 mb-2">🛒 Easy Shopping</h2>
            <p className="text-gray-400">
              Our online platform allows you to browse and purchase your favorite books easily with secure payment options.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-green-400 mb-2">🎁 Special Offers</h2>
            <p className="text-gray-400">
              Get exclusive deals and discounts on popular books and bestsellers, making reading more affordable.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-purple-400 mb-2">🏆 Best Recommendations</h2>
            <p className="text-gray-400">
              Our expert recommendations help you discover hidden gems and popular reads loved by readers worldwide.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-12 bg-gray-900 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-semibold text-orange-400 mb-4">📖 Our Mission</h3>
          <p className="text-lg text-gray-300">
            We strive to inspire a love for reading by providing access to a diverse range of books and delivering an exceptional
            customer experience.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-300">
            📩 Have questions? Reach out to us at{' '}
            <span className="text-blue-400 font-semibold">support@pageturner.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
