import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Home = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to AI Career Counseling</h1>
        <p className="text-gray-600 mb-6 max-w-xl">
          Discover your best-fit career path with our intelligent recommendation system based on your skills and interests.
        </p>
        <div className="space-x-4">
          <Link to="/login">
            <Button text="Get Started" />
          </Link>
          <Link to="/register">
            <Button text="Sign Up" className="bg-gray-500 hover:bg-gray-600" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
