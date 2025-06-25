import axios from 'axios';
import React from 'react';
import { BASEURL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const FeedCard = ({ data }) => {
  const dispatch = useDispatch();

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
        <div className="bg-white text-center p-6 rounded-lg shadow-lg text-xl font-semibold text-gray-800 max-w-md">
          We are working hard to make this big. Keep faith in us.
        </div>
      </div>
    );
  }

  const {
    _id,
    firstName = "Unknown",
    lastName = "",
    photoUrl,
    age = "N/A",
    gender = "Unspecified",
    about = "",
  } = data;

  const handleRequest = async (status) => {
    try {
      await axios.post(`${BASEURL}/request/send/${status}/${_id}`, {}, {
        withCredentials: true,
      });
      dispatch(removeFeed(_id));
    } catch (err) {
      console.error(`Error sending request: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4 mt-10">
      <div className="w-96 h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col transition-transform duration-300 hover:shadow-purple-900 hover:-translate-y-1 hover:scale-105 border border-purple-800/30">
        
        {/* Profile Photo */}
        <div className="h-64 overflow-hidden">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-700">
              <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="p-5 text-white flex-1">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">{firstName} {lastName}</h1>
            <span className="text-sm text-purple-300">{age}</span>
          </div>
          <div className="mb-2">
            <span className="text-xs bg-purple-800/30 text-purple-200 px-3 py-1 rounded-full capitalize">
              {gender}
            </span>
          </div>
          <p className="text-gray-300 text-sm line-clamp-3 italic">
            {about || "Tell me your thoughts on studying."}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex border-t border-purple-900 divide-x divide-purple-800">
          <button
            onClick={() => handleRequest("ignored")}
            className="flex-1 py-3 bg-black text-red-400 hover:bg-red-900/20 font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Ignore
          </button>
          <button
            onClick={() => handleRequest("interested")}
            className="flex-1 py-3 bg-black text-green-400 hover:bg-green-900/20 font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;





