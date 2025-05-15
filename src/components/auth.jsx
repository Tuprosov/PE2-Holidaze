import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../js/store/userStore";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register, login, message, setMessage } = useUserStore();

  const validateEmail = (email) => email.endsWith("@stud.noroff.no");
  const validatePassword = (pw) =>
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/.test(pw);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return setMessage("Email must end with @stud.noroff.no");
    }
    if (!validatePassword(password)) {
      return setMessage(
        "Password must be at least 8 characters with an uppercase letter and a symbol"
      );
    }

    try {
      if (isLogin) {
        await login({ email, password });
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        await register({
          name,
          email,
          password,
        });
        setMessage("Registration successful! Please log in.");
        setIsLogin(!isLogin);
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-[#d6e4e7] p-2 rounded shadow-md"
          />
        )}
        <input
          type="email"
          placeholder="Email (@stud.noroff.no)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-[#d6e4e7] p-2 rounded shadow-md"
        />
        <input
          type="password"
          placeholder="Password (min 8 chars, 1 uppercase, 1 symbol)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-[#d6e4e7] p-2 rounded shadow-md"
        />
        {message && <p className="text-red-500 text-sm">{message}</p>}
        <button type="submit" className="w-full p-2 rounded shadow-md">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="text-sm text-center">
        {isLogin ? "No account?" : "Already registered?"}{" "}
        <button
          className="underline w-28"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
        >
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
}
