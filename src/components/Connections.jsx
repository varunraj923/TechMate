import React, { useEffect } from 'react'
import { BASEURL } from '../utils/constants';

const Connections = () => {

    const FetchConnections = async ()=>{
        try{
            const res = await axios.get(BASEURL+"user/connections");
            console.log(res);

        }

        catch(err){
            console.error(err.message);
        }

        useEffect(()=>{
            FetchConnections();

        }, [])
    }
  return (
    <div>
      <h1>View Connections</h1>
    </div>
  )
}

export default Connections
