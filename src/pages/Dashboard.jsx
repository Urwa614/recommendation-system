import React from 'react';

const ManagePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
        <p className="text-gray-600">
          This is your personalized career counseling dashboard. From here, you can:
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
          <li>Update your profile and preferences</li>
          <li>View AI-recommended career paths</li>
          <li>Analyze your skill gaps and see improvement suggestions</li>
          <li>Interact with the AI career advisor chatbot</li>
          <li>Get notified of new job opportunities and resources</li>
        </ul>
      </div>
    </div>
  );
};

export default ManagePage;
