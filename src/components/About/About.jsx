import React from 'react';

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-10 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto font-semibold">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-500 mb-8 pt-10">
        About Our E-Commerce Platform
      </h2>

      <p className="text-lg text-center leading-relaxed mb-10">
        Welcome to our e-commerce platform, your one-stop destination for discovering the latest trends and quality products. Whether you're browsing for everyday essentials or luxury items, we strive to deliver an unmatched shopping experience with a wide variety of categories, cutting-edge features, and a user-centric design.
      </p>

      {/* Key Features Section */}
      <section className="mb-12 p-6 rounded-lg bg-blue-100 dark:bg-gray-800">
        <h3 className="text-2xl font-semibold text-green-500 mb-4 text-center">
          Key Features
        </h3>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li>Wide variety of products across multiple categories.</li>
          <li>Fast and secure checkout process.</li>
          <li>Real-time product search with advanced filtering options, including the ability to search using your voice.</li>
          <li>Easy cart and wishlist management.</li>
          <li>Responsive design optimized for all devices.</li>
          <li>Personalized product recommendations based on user preferences.</li>
        </ul>
      </section>

      {/* Categories Section */}
      <section className="mb-12 p-6 rounded-lg bg-blue-100 dark:bg-gray-800">
        <h3 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
          Explore Our Categories
        </h3>
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          We offer an extensive range of product categories to meet all your needs:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li><span className="font-semibold text-green-500">Electronics:</span> From smartphones to laptops, explore the latest gadgets.</li>
          <li><span className="font-semibold text-red-500">Fashion:</span> Discover the newest styles in clothing, shoes, and accessories.</li>
          <li><span className="font-semibold text-blue-500">Home & Kitchen:</span> Everything you need to make your living space perfect.</li>
          <li><span className="font-semibold text-green-500">Beauty & Personal Care:</span> Premium skincare, makeup, and grooming products.</li>
          <li><span className="font-semibold text-red-500">Sports & Fitness:</span> Gear and apparel for every sport and activity.</li>
          <li><span className="font-semibold text-blue-500">Books & Media:</span> Find your next favorite read or digital media.</li>
        </ul>
      </section>

      {/* User Experience Section */}
      <section className="mb-12 p-6 rounded-lg bg-blue-100 dark:bg-gray-800">
        <h3 className="text-2xl font-semibold text-green-500 mb-4 text-center">
          User Experience
        </h3>
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Our platform is designed with the user in mind, offering a seamless experience across all devices. Whether you're on your mobile phone or desktop, you'll enjoy fast load times, intuitive navigation, and secure payments. We also offer:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li><span className="font-semibold">Advanced Search:</span> Easily find products with filtering and sorting options.</li>
          <li><span className="font-semibold">User Accounts:</span> Track your orders, save wishlists, and view personalized recommendations.</li>
          <li><span className="font-semibold">Fast Checkout:</span> Secure and quick payment process with various options.</li>
        </ul>
      </section>

      {/* Technology Stack Section */}
      <section className="mb-12 p-6 rounded-lg bg-blue-100 dark:bg-gray-800">
        <h3 className="text-2xl font-semibold text-blue-500 mb-4 text-center">
          Our Technology Stack
        </h3>
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Built on modern technologies for scalability, performance, and security:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li><span className="font-semibold">React.js:</span> A powerful JavaScript library for creating dynamic user interfaces.</li>
          <li><span className="font-semibold">Tailwind CSS:</span> A utility-first CSS framework for responsive design and customization.</li>
          <li><span className="font-semibold">Axios:</span> Seamless API calls for real-time data fetching.</li>
          <li><span className="font-semibold">LocalStorage & Context API:</span> Efficient state and data management for user sessions and shopping cart.</li>
          <li><span className="font-semibold">Toast Notifications:</span> Real-time feedback for actions such as adding to cart or wishlist.</li>
        </ul>
      </section>

      {/* Mission Section */}
      <section className="mb-12 p-6 rounded-lg bg-blue-100 dark:bg-gray-800">
        <h3 className="text-2xl font-semibold text-red-500 mb-4 text-center">
          Our Mission
        </h3>
        <p className="text-lg text-center leading-relaxed text-gray-700 dark:text-gray-300">
          To revolutionize online shopping by offering a personalized, secure, and efficient platform that meets the needs of modern consumers. We are committed to innovation and continuously improving your shopping experience.
        </p>
      </section>
    </div>
  );
}
