import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("dayo@test.com");
  const [password, setPassword] = useState("dayodayo123");
  const [login, setLogin] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLogin("Loading....");

    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        console.log("Login successful");
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        toast.success("Login successful");
        setLogin("Login");
        setTimeout(() => {
          navigate("/homepage");
        }, 3000);
      } else {
        setLogin("");
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setLogin("");
      toast.error("Network error", error);
    }
  };
  return (
    <div className="h-screen flex bg-gray-900">
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-lg py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Log in to your account 🔐
        </h1>

        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              placeholder="Your Password"
              required
            />
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              className={`bg-blue-700 hover:bg-blue-500 w-full py-2 px-4 text-lg text-white rounded border border-green focus:outline-none focus:border-green-dark cursor-pointer font-bold`}
            >
              {login ? login : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
