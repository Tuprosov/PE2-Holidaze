import Trips from "../components/tripsPage/DisplayTrips";
import { useEffect } from "react";
import { useUserStore } from "../js/store/userStore";
import { useErrorStore } from "../js/store/useStore";
import { useNavigate } from "react-router-dom";

export default function TripsPage() {
  const { user, getUserTrips, isLoading, isLoggedIn } = useUserStore();
  const { error, setError } = useErrorStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;
    getUserTrips(user.name).catch(setError);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>{error}</h1>
      </div>
    );
  }

  return isLoggedIn ? (
    <div className="mb-10">
      <h1> Trips</h1>
      <Trips />
    </div>
  ) : (
    <div className="flex h-dvh justify-center items-center">
      <h1>You’re not authorized. Please login or sign up</h1>
      <button className="p-2" onClick={() => navigate("/auth")} type="button">
        Login/Sign up
      </button>
    </div>
  );
}
