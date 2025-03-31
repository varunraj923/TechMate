import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASEURL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const FeedCard = ({ data }) => {
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data || Object.keys(data).length === 0) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  }, [data]);

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white text-center p-6 rounded-lg shadow-lg text-xl font-semibold text-gray-800 max-w-md">
          We are working hard to make this big. Keep faith in us.
        </div>
      </div>
    );
  }

  const { _id, firstName, lastName, photoUrl, age, gender, about } = data;

  const handleRequest = async (status, _id) => {
    try {
      await axios.post(`${BASEURL}request/send/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeFeed(_id));
    } 
   
    
    catch (err) {
      console.error(`Error sending request: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-96 h-[555px] bg-white rounded-xl shadow-lg overflow-hidden relative font-sans flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]">
        {/* Profile Photo */}
        <div className="h-72 bg-gray-200 overflow-hidden">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="p-6 flex-1">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-800">{firstName} {lastName}</h1>
            <span className="text-gray-600">{age}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-500 capitalize px-3 py-1 bg-gray-100 rounded-full">{gender}</span>
          </div>
          <p className="text-gray-600 text-base mb-2 line-clamp-4">
            {about || "Tell me your thoughts on studying."}
          </p>
        </div>

        {/* Buttons */}
        <div className="w-full flex border-t border-gray-200">
          <button
            onClick={() => handleRequest("ignored", _id)}
            className="flex-1 py-4 bg-white text-red-500 font-bold hover:bg-red-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Ignore
          </button>
          <button
            onClick={() => handleRequest("interested", _id)}
            className="flex-1 py-4 bg-white text-green-600 font-bold hover:bg-green-50 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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




