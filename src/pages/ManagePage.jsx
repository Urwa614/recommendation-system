import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ManagePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow px-6 py-10 bg-gray-50">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Career Management Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Your Recommended Career</h2>
            <p className="text-gray-600">AI Engineer based on your skills in Python, NLP & ML.</p>
          </div>

          <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Skills To Learn</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Deep Learning</li>
              <li>TensorFlow / PyTorch</li>
              <li>Advanced NLP</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Learning Resources</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Coursera: Deep Learning Specialization</li>
              <li>Udemy: NLP with Python</li>
              <li>Fast.ai Courses</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManagePage;
