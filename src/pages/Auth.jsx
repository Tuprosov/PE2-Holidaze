import { useEffect } from "react";
import Auth from "../components/auth/auth";
import { useUserStore } from "../js/store/userStore";

export default function AuthPage() {
  const { setMessage } = useUserStore();
  useEffect(() => {
    setMessage("");
  }, []);

  return <Auth />;
}
