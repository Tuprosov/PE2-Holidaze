import { DisplayProfile } from "../components/profilePage/DisplayProfile";
import { useUserStore } from "../js/store/userStore";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  return isLoggedIn ? (
    <DisplayProfile />
  ) : (
    <div className="flex h-dvh justify-center items-center">
      <h1>You’re not authorized. Please login or sign up</h1>
      <button className="p-2" onClick={() => navigate("/auth")} type="button">
        Login/Sign up
      </button>
    </div>
  );
}
