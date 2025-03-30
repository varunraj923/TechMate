import React, { useEffect } from 'react'
import { useState } from 'react';
import FeedCard from './FeedCard';
import { BASEURL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const EditProfile = ({user}) => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName ] = useState(user?.lastName);
    const[age, setAge] = useState(user?.age);
    const[about, setabout] = useState(user?.about);
    const[photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const[gender, setGender] = useState(user?.gender);
    const[toast, setToast] = useState(false);

   

    const SaveProfile = async()=>{
        try{
            const res = await axios.patch(BASEURL+"profile/edit", {
                firstName, lastName, age, about, photoUrl, gender,
            }, {withCredentials : true})

           

            dispatch(addUser(res.data));
            setToast(true);

            setTimeout(()=>{
              setToast(false);

            },3000)


           
        }

        catch(err){
            console.error(err.message);

        }
    }

    



    

   
     

  return (


    <>

{toast &&(<div className="toast">
  <div className="alert alert-info">
    <span>Profile Updated Successfully!!</span>
  </div>
</div>
)}
<div  className="flex justify-center items-center h-screen ">




  <div className="card  w-72 ">
    <div data-theme="bumblebee" className="card-body mt-20 shadow-2xl mx-7">
      <h2 className="card-title text-center text-2xl">Edit Profile</h2>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">FirstName</legend>
        <input type="text" className="input"  value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
    
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">LastName</legend>
        <input type="text" className="input"  value={lastName} onChange={(e)=> setLastName(e.target.value)} />
      
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Age</legend>
        <input type="text" className="input"  value={age} onChange={(e)=> setAge(e.target.value)} />
      
      </fieldset>

 


      <fieldset className="fieldset">
        <legend className="fieldset-legend">about</legend>
        <input type="text" className="input"   value={about} onChange={(e)=>setabout(e.target.value)}/>
       
      </fieldset>


      <fieldset className="fieldset">
        <legend className="fieldset-legend">Gender</legend>
        <input type="text" className="input"   value={gender} onChange={(e)=>setGender(e.target.value)}/>
       
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend">Photo Url</legend>
        <input type="text" className="input"   value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)}/>
       
      </fieldset>

      <button onClick={SaveProfile} className="btn btn-primary">Save Profile</button>
      
    </div>
  </div>

  


  <FeedCard data={{firstName, lastName, age, about, photoUrl , gender}}/>
</div>



</>


  )
}

export default EditProfile
