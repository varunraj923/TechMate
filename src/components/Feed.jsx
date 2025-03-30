import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import FeedCard from './FeedCard';
import Profile from './Profile';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed); // ✅ Defined at the top level




  const fetchFeed = async () => {

    
    try {
      const res = await axios.get(`${BASEURL}feed`, { withCredentials: true });
     
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    feedData &&(
    <div className='mt-5'>
     
        <FeedCard data = {feedData[0]} /> 
        
    
    </div>

  ));
};

export default Feed;
