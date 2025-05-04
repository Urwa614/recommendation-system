import React, { useState } from "react";

const CAREERS = [
  "Architectural Engineering",
  "Data Visualization",
  "Game Design",
  "Financial Engineering",
  "Urban Planning",
  "Actuarial Science",
];
const JOB_TITLES = [
  "Architectural Engineer",
  "Data Visualization Specialist",
  "Game Designer",
  "Quantitative Analyst",
  "Urban Planner",
  "Actuary",
  "CAD Designer",
];

const DashboardHome = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCareerClick = () => {
    setShowModal(true);
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // Simulate loading
  };

  const handleClose = () => {
    setShowModal(false);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white rounded shadow p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-lg font-semibold">Test Demo</h1>
          <p className="text-gray-500 text-sm">test@demo.com</p>
        </div>
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-full shadow-md transition"
          onClick={handleCareerClick}
        >
          CAREER PATHS BY PROFILE
        </button>
      </div>

      {/* Skills & Interests */}
      <div className="flex flex-wrap justify-between mb-4">
        <div className="mb-2 w-full md:w-1/2">
          <h2 className="font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              Teamwork
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              Communication
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              Time management
            </span>
          </div>
        </div>
        <div className="mb-2 w-full md:w-1/2">
          <h2 className="font-semibold mb-2">Interests</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              Engineering
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              Arts
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              Mathematics
            </span>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* Educational Backgrounds */}
      <div>
        <h2 className="font-semibold mb-2">Educational Backgrounds</h2>
        <div className="mb-2">
          <span className="font-medium">Software Engineering (Bachelor's Degree)</span>
          <div className="text-gray-500 text-sm">
            Major Subjects: Computer Science, Mathematics, Business Administration, Engineering
          </div>
        </div>
        <div>
          <span className="font-medium">Software Engineering (Master's Degree)</span>
          <div className="text-gray-500 text-sm">
            Major Subjects: Computer Science, Mathematics
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded shadow-lg w-full max-w-md mx-2 relative animate-fadeIn">
            {/* Header */}
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center rounded-t">
              <span className="font-semibold">Career Suggestions</span>
              <button
                onClick={handleClose}
                className="text-white text-lg font-bold hover:text-blue-200"
              >
                ×
              </button>
            </div>
            <div className="p-4 min-h-[160px] flex items-center justify-center">
              {loading ? (
                // Spinner (replace with GIF if you want)
                <div className="flex flex-col items-center justify-center w-full">
                  <svg
                    className="animate-spin h-10 w-10 text-blue-500 mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  <span className="text-gray-600">Processing...</span>
                </div>
              ) : (
                <div className="w-full">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 text-gray-800">Careers</h3>
                    <div className="flex flex-wrap gap-2">
                      {CAREERS.map((career) => (
                        <span
                          key={career}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-800">Job Titles</h3>
                    <div className="flex flex-wrap gap-2">
                      {JOB_TITLES.map((job) => (
                        <span
                          key={job}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;