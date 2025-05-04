import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

// Using a royalty-free SVG illustration from undraw.co
const heroImg = "https://undraw.co/api/illustrations/2c8b7b1e-7d97-4e3a-bb9c-8f3d2f2e8e6e";

const Home = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen  flex flex-col justify-center items-center px-4 ">
        <section className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 py-12 mx-auto">

          {/* LEFT: Text */}
          <div className="flex-1 max-w-xl md:pl-6 text-left animate-fade-in-up">
            <div className="uppercase tracking-widest text-xs text-blue-400 font-semibold mb-4">Scientific & Data Driven</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 leading-tight mb-4">
              Get Right Career Options<br />
              With <span className="text-blue-700">Scientific Career Counselling</span>
            </h1>
            <p className="text-blue-900/70 mb-8 text-base md:text-lg">
              Discover your Talent and Passion Scientifically.
            </p>
            <Link to="/login">
              <button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
                Get Started
              </button>
            </Link>
          </div>

          {/* RIGHT: Image + Decoration */}
          <div className="flex-1 flex justify-center items-center relative">
            {/* Compass/Arrow Decoration */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 animate-slow-spin">
              <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="170" cy="170" r="160" stroke="#2563EB" strokeWidth="6" fill="url(#blueGlow)" />
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 15) * Math.PI / 180;
                  const r1 = 155, r2 = 165;
                  const x1 = 170 + r1 * Math.cos(angle);
                  const y1 = 170 + r1 * Math.sin(angle);
                  const x2 = 170 + r2 * Math.cos(angle);
                  const y2 = 170 + r2 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#60A5FA" strokeWidth="3" />;
                })}
                <text x="170" y="42" textAnchor="middle" fontSize="28" fill="#2563EB" fontWeight="bold">N</text>
              </svg>
            </div> 
            {/* Circular Graduate Image */}
            <div className="relative z-10">
              <div className="rounded-full bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700 p-2 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1517520287167-4bbf64a00d66?auto=format&fit=facearea&w=320&h=320&facepad=2&q=80"
                  alt="Graduates"
                  className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-full border-8 border-white shadow-xl grayscale animate-zoom-in"
                  loading="lazy"
                />
              </div>
              {/* Blue Graduates Label with glass effect */}
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-blue-700/80 backdrop-blur-md text-white rounded-full px-10 py-3 font-bold text-lg tracking-widest shadow-xl border-4 border-blue-200 select-none animate-fade-in-up delay-500 transition-all">
                GRADUATES
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
