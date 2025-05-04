import React, { useState, useEffect } from "react";

const ProfileComponent = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    skills: [],
    interests: [],
    education: []
  });

  const [newEducation, setNewEducation] = useState({
    matriculationLevel: "",
    program: "",
    majorSubject: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    if (storedData) setProfile(JSON.parse(storedData));
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile updated!");
  };

  const handleAddEducation = () => {
    if (newEducation.matriculationLevel && newEducation.program && newEducation.majorSubject) {
      const updatedEducation = [...profile.education, newEducation];
      const updatedProfile = { ...profile, education: updatedEducation };
      setProfile(updatedProfile);
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      setNewEducation({ matriculationLevel: "", program: "", majorSubject: "" });
      setIsModalOpen(false); // Close the modal after adding education
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleDeleteEducation = (index) => {
    const updatedEducation = profile.education.filter((_, i) => i !== index);
    const updatedProfile = { ...profile, education: updatedEducation };
    setProfile(updatedProfile);
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-blue-600 text-white rounded-2xl shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold">Update Profile</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full p-2 rounded bg-white text-black"
          value={profile.fullName}
          onChange={handleProfileChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-white text-black"
          value={profile.email}
          onChange={handleProfileChange}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="w-full p-2 rounded bg-white text-black"
            onBlur={(e) =>
              setProfile({ ...profile, skills: e.target.value.split(",").map((s) => s.trim()) })
            }
          />
          <input
            type="text"
            placeholder="Interests (comma separated)"
            className="w-full p-2 rounded bg-white text-black"
            onBlur={(e) =>
              setProfile({ ...profile, interests: e.target.value.split(",").map((i) => i.trim()) })
            }
          />
        </div>
        <button
          onClick={handleUpdateProfile}
          className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-blue-100"
        >
          Update Profile
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mt-6">
        <h3 className="text-xl font-semibold mb-4">Educational Backgrounds</h3>
        {profile.education.map((edu, index) => (
          <div
            key={index}
            className="border p-4 rounded-xl mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{edu.matriculationLevel}</p>
              <p className="text-sm text-gray-600">{edu.program} - {edu.majorSubject}</p>
            </div>
            <button
              onClick={() => handleDeleteEducation(index)}
              className="text-red-500 font-bold text-lg"
            >
              ×
            </button>
          </div>
        ))}

        <button
          onClick={() => setIsModalOpen(true)} // Open the modal
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Add Education
        </button>
      </div>

      {/* Modal for Adding Education */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add Education</h3>
            <select
              value={newEducation.matriculationLevel}
              onChange={(e) =>
                setNewEducation({ ...newEducation, matriculationLevel: e.target.value })
              }
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="">Select Matriculation Level</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
            <select
              value={newEducation.program}
              onChange={(e) => setNewEducation({ ...newEducation, program: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="">Select Program</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
              <option value="Commerce">Commerce</option>
            </select>
            <select
              value={newEducation.majorSubject}
              onChange={(e) => setNewEducation({ ...newEducation, majorSubject: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value="">Select Major Subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="History">History</option>
              <option value="Economics">Economics</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEducation}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;