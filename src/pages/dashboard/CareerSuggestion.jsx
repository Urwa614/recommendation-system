import React, { useState, useRef, useEffect } from "react";

const SKILLS = [
  "Communication",
  "Coding",
  "Cooking",
  "Office Management",
  "Data Entry",
  "Writing",
];
const INTERESTS = [
  "Development",
  "Designing",
  "Technology",
  "Engineering",
];
const MAJOR_SUBJECTS = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "Computer Science",
  "Economics",
];

function MultiSelect({ label, options, selected, setSelected, placeholder }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleRemoveChip = (option) => {
    setSelected((prev) => prev.filter((item) => item !== option));
  };

  const filteredOptions = options.filter(
    (opt) => opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mb-4" ref={ref}>
      <label className="block text-white mb-1 font-medium">{label}</label>
      <div
        className="bg-blue-400 rounded px-2 py-2 flex flex-wrap items-center min-h-[44px] cursor-pointer relative"
        onClick={() => setOpen((o) => !o)}
      >
        {selected.length === 0 && (
          <span className="text-blue-100 text-sm">{placeholder}</span>
        )}
        {selected.map((item) => (
          <span
            key={item}
            className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs mr-2 mb-1 flex items-center"
          >
            {item}
            <button
              className="ml-1 text-blue-600 hover:text-blue-900"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveChip(item);
              }}
              title="Remove"
            >
              ×
            </button>
          </span>
        ))}
        <span className="ml-auto text-white">
          <svg
            className={`inline w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
        {open && (
          <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded shadow-lg z-10 max-h-56 overflow-y-auto animate-fadeIn">
            <div className="sticky top-0 bg-white px-2 py-1">
              <input
                autoFocus
                className="w-full border-none outline-none p-1 text-gray-700 text-sm bg-gray-100 rounded"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            {filteredOptions.length === 0 && (
              <div className="p-2 text-gray-500 text-sm">No options</div>
            )}
            {filteredOptions.map((option) => (
              <div
                key={option}
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                  selected.includes(option) ? "bg-blue-100" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(option);
                }}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  readOnly
                  className="mr-2"
                />
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const CAREER_RESULTS = [
  "Software Engineering",
  "Web Development",
  "Data Science",
  "Electrical Engineering",
  "UX/UI Design",
];
const JOB_RESULTS = [
  "Software Developer",
  "Front-End Developer",
  "Data Analyst",
  "Electrical Engineer",
  "UX Designer",
  "Full Stack Developer",
  "Application Developer",
];

const CareerSuggestions = () => {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [majorSubjects, setMajorSubjects] = useState([]);
  const [education, setEducation] = useState("");
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-blue-500 rounded shadow-lg p-6">
      <h2 className="text-white text-lg font-semibold mb-4">
        A.I Career Suggestions
      </h2>
      <div className="flex flex-wrap gap-5 mb-3">
        <div className="flex-1 min-w-[260px]">
          <MultiSelect
            label="Skills"
            options={SKILLS}
            selected={skills}
            setSelected={setSkills}
            placeholder="Select skills"
          />
        </div>
        <div className="flex-1 min-w-[260px]">
          <MultiSelect
            label="Interests"
            options={INTERESTS}
            selected={interests}
            setSelected={setInterests}
            placeholder="Select interests"
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="block text-white mb-1 font-medium">
          Highest Education Program
        </label>
        <input
          type="text"
          className="w-full bg-blue-400 text-white border-b-2 border-blue-300 focus:outline-none focus:border-white px-3 py-2 rounded"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-5 mb-6 items-center">
        <div className="flex-1 min-w-[260px]">
          <MultiSelect
            label="Major Subjects"
            options={MAJOR_SUBJECTS}
            selected={majorSubjects}
            setSelected={setMajorSubjects}
            placeholder="Select major subjects"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded shadow-md transition"
          onClick={() => setShowResults(true)}
        >
          GET A.I SUGGESTIONS
        </button>
      </div>

      {/* Suggestion Results Modal */}
      {showResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded shadow-lg w-full max-w-3xl mx-2 relative animate-fadeIn">
            {/* Header */}
            <div className="bg-blue-700 text-white px-4 py-2 rounded-t flex justify-between items-center">
              <span className="font-semibold">Suggestion Results</span>
              <button
                onClick={() => setShowResults(false)}
                className="text-white text-lg font-bold hover:text-blue-200"
              >
                ×
              </button>
            </div>
            <div className="p-5">
              <div className="mb-3">
                <div className="font-semibold mb-2 text-gray-700">Careers</div>
                <div className="flex flex-wrap gap-2">
                  {CAREER_RESULTS.map((career, idx) => (
                    <span
                      key={career}
                      className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                        idx === 0
                          ? "bg-orange-200 text-orange-800 border border-orange-400"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2 text-gray-700">Job Titles</div>
                <div className="flex flex-wrap gap-2">
                  {JOB_RESULTS.map((job, idx) => (
                    <span
                      key={job}
                      className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                        idx === 0
                          ? "bg-orange-200 text-orange-800 border border-orange-400"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerSuggestions;