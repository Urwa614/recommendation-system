const UpdateProfile = () => {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Update Your Profile</h1>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <textarea placeholder="Career Goals" className="w-full p-2 border rounded" />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Save Changes
          </button>
        </form>
      </div>
    );
  };
  
  export default UpdateProfile;
  