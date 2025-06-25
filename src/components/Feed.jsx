import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import FeedCard from './FeedCard';
import Footer from "./Footer";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(`${BASEURL}/feed`, { withCredentials: true });
      dispatch(addFeed(res?.data?.data || []));
    } catch (err) {
      console.error("Error fetching feed:", err.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <>
      {feed && feed.length > 0 ? (
        <div className='mt-5'>
          <FeedCard data={feed[0]} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[70vh] text-white text-lg">
          No feeds available.
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default Feed;

