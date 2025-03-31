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
            const res = await axios.patch(`${BASEURL}profile/edit`, formData, { withCredentials: true });

            dispatch(addUser(res.data)); // Save updated user data
            setToast(true);

            setTimeout(() => {
                setToast(false);
            }, 3000);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            {toast && (
                <div className="toast">
                    <div className="alert alert-info">
                        <span>Profile Updated Successfully!</span>
                    </div>
                </div>
            )}

            <div className="flex justify-center items-center h-screen">
                <div className="card w-72">
                    <div data-theme="bumblebee" className="card-body mt-20 shadow-2xl mx-7">
                        <h2 className="card-title text-center text-2xl">Edit Profile</h2>
                        
                        {Object.keys(formData).map((key) => (
                            <fieldset key={key} className="fieldset">
                                <legend className="fieldset-legend">{key.charAt(0).toUpperCase() + key.slice(1)}</legend>
                                <input 
                                    type="text"
                                    name={key}
                                    className="input"
                                    value={formData[key]}
                                    onChange={handleChange}
                                />
                            </fieldset>
                        ))}

                        <button onClick={saveProfile} className="btn btn-primary">Save Profile</button>
                    </div>
                </div>

                {/* FeedCard Added Below */}
                <FeedCard data={formData} />
            </div>
        </>
    );
};

export default EditProfile;

