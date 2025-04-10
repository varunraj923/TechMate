import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addConnections } from "../utils/connectionSlice";
import { BASEURL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASEURL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.connectionRequests));
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError("Failed to load connections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (error) return <h1 className="text-center text-red-500">{error}</h1>;
  if (!connections || connections.length === 0)
    return <h1 className="text-center my-10">No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const user = connection.fromUserId; // Extract user details from fromUserId

        if (!user) return null; // Ensure user data exists

        const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

        return (
          <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <img alt="photo" className="w-20 h-20 rounded-full object-cover" src={photoUrl || "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg?semt=ais_hybrid"} />
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
              {age && gender && <p>{`${age}, ${gender}`}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

