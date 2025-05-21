import DisplayTrips from "../components/tripsPage/DisplayTrips";
import { useEffect } from "react";
import { useUserStore } from "../js/store/userStore";
import { useNavigate } from "react-router-dom";

export default function TripsPage() {
  const { user, setMessage, getUserTrips, isLoading, isLoggedIn } =
    useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchTrips = async () => {
      try {
        await getUserTrips(user.name);
      } catch (error) {
        setMessage(error.message || "Something went wrong");
      }
    };

    fetchTrips();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return isLoggedIn ? (
    <div className="mb-10">
      <h1> Trips</h1>
      <DisplayTrips />
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
