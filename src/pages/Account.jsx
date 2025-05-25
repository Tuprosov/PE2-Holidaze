import DisplayAccount from "../components/accountPage/displayAccount";
import { useUserStore } from "../js/store/userStore";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const { isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  return isLoggedIn ? (
    <DisplayAccount />
  ) : (
    <div className="flex h-dvh justify-center items-center">
      <h1>You’re not authorized. Please login or sign up</h1>
      <button className="p-2" onClick={() => navigate("/auth")} type="button">
        Login/Sign up
      </button>
    </div>
  );
}
