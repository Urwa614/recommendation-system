import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaLightbulb } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItemClass = (path) =>
    `flex items-center gap-2 p-3 rounded-md hover:bg-blue-100 ${
      location.pathname === path ? 'bg-blue-100 font-semibold' : ''
    }`;

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="bg-white w-64 min-h-screen shadow-md p-4">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-blue-600">
          <FaUser />
        </div>
        <p className="mt-2 font-semibold">User Name</p>
      </div>
      <nav className="flex flex-col space-y-2">
        <Link to="/manage" className={navItemClass('/manage')}>
          <MdDashboardCustomize /> Dashboard
        </Link>
        <Link to="/manage/update-profile" className={navItemClass('/manage/update-profile')}>
          <FaUser /> Update Profile
        </Link>
        <Link to="/manage/career-suggestion" className={navItemClass('/manage/career-suggestion')}>
          <FaLightbulb /> AI Career Suggestion
        </Link>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 text-red-500 hover:text-red-700 p-3"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;