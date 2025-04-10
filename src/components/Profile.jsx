import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import { BASEURL } from '../utils/constants';
import EditProfile from './EditProfile';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASEURL}/profile`, { withCredentials: true });
        dispatch(addUser(res.data)); 
      } catch (err) {
        console.error('Error fetching user:', err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [dispatch, user]);

  if (loading) return <p>Loading profile...</p>;

  return user ? <EditProfile user={user} /> : <p>No user found.</p>;
};

export default Profile;





