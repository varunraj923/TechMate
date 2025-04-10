import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASEURL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import FeedCard from './FeedCard';
import Profile from './Profile';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed); // ✅ Defined at the top level
  console.log(feed);
  




  const fetchFeed = async () => {

    
    try {
      const res = await axios.get(`${BASEURL}/feed`, { withCredentials: true });
      console.log(res);
     
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    feed &&(
    <div className='mt-5'>
     
        <FeedCard data = {feed[0]} /> 
        
    
    </div>
    
  ));
};

export default Feed;
