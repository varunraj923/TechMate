import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestsSlice";
import EmptyRequests from "../utils/empty-requests.svg";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASEURL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASEURL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data || []));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-black min-h-screen py-12 px-4 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Connection Requests</h1>

      {(!requests || requests.length === 0) ? (
        <div className="flex flex-col items-center justify-center mt-16">
          <img src={EmptyRequests} alt="No Requests" className="w-72 mb-6" />
          <p className="text-xl font-semibold text-center">No connection requests available.</p>
        </div>
      ) : (
        requests.map((request) => {
          if (!request?.fromUserId) return null;

          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
          } = request.fromUserId;

          return (
            <div
              key={request._id}
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
              <div className="mt-4 sm:mt-0 flex gap-3">
                <button
                  className="btn btn-error text-white"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success text-white"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Requests;





