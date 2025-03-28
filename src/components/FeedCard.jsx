import React from 'react'


const FeedCard = ({data}) => {


  const {firstName, lastName, age, gender, about, photoUrl} = data;
 

  return (

   
    <div className='flex justify-center my-7'>
    <div data-theme="bumblebee"className="card w-70 shadow-2xl">
<figure>
  <img
    src={photoUrl}
    alt="photo" />
</figure>
<div className="card-body">
  <h2 className="card-title">{firstName + " " + lastName}</h2>
   <p>{age}, {gender}</p>
  <p>{about}</p>
  <div className="card-actions justify-end flex my-3 mx-5">
    <button className="btn btn-primary">Rejected</button>
    <button className='btn btn-secondary '>Intrested</button>
  </div>
</div>
</div>
  </div>
  )
}

export default FeedCard;
