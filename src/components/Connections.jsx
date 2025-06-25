import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addConnections } from "../utils/connectionSlice";
import { BASEURL } from "../utils/constants";
import { Link } from "react-router-dom";
import EmptyConnections from "../utils/empty-connections.svg";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASEURL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.connectionRequests || []));
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

  if (loading)
    return <h1 className="text-center text-white mt-10">Loading...</h1>;

  if (error)
    return <h1 className="text-center text-red-500 mt-10">{error}</h1>;

  if (!connections || connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <img
          src={EmptyConnections}
          alt="No Connections"
          className="w-72 mb-6"
        />
        <h2 className="text-xl font-semibold text-center">No Connections Found</h2>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-12 px-4 text-white mt-0">
      <h1 className="text-3xl font-bold text-center mb-8">Connections</h1>
      {connections.map((connection) => {
        const user = connection.fromUserId;
        if (!user) return null;

        const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

        return (
          <div
            key={_id}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto"
          >
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={
                photoUrl ||
                "https://img.freepik.com/premium-vector/default-avatar-user-icon_24877-22214.jpg"
              }
              alt="User"
            />
            <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
              {age && gender && (
                <p className="text-gray-300">{age}, {gender}</p>
              )}
              <p className="text-gray-400">{about}</p>
            </div>
            <Link to={`/chat/${_id}`}>
              <button className="btn btn-primary text-white mt-4 sm:mt-0">
                Chat
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;


