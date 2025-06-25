import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASEURL } from '../utils/constants';
import FeedCard from './FeedCard';

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    age: user?.age || '',
    about: user?.about || '',
    photoUrl: user?.photoUrl || '',
    gender: user?.gender || ''
  });

  const [toast, setToast] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    try {
      const res = await axios.patch(`${BASEURL}/profile/edit`, formData, { withCredentials: true });
      dispatch(addUser(res.data));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row items-center justify-center p-6">
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success text-white bg-green-600">
            <span>Profile Updated Successfully!</span>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div className="bg-gray-900 text-white p-8 rounded-xl shadow-2xl w-full max-w-sm space-y-6">
        <h2 className="text-2xl font-bold text-center">Edit Profile</h2>

        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-sm font-semibold mb-1 capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={`Enter ${key}`}
            />
          </div>
        ))}

        <button
          onClick={saveProfile}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Save Profile
        </button>
      </div>

      {/* FeedCard Preview Section */}
      <div className="mt-10 lg:mt-0 lg:ml-10">
        <FeedCard data={formData} />
      </div>
    </div>
  );
};

export default EditProfile;


