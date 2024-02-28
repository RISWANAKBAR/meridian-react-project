import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleRedirectToDashboard = (userId) => {
    navigate(`/userblog/${userId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setLoginMessage("Login successful");

        handleRedirectToDashboard(data.user.id);
      } else {
        setLoginMessage("Login failed. Please check your credentials.");
        console.error("Login failed");
      }
    } catch (error) {
      setLoginMessage("An error occurred during login. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 text-left"
                  >
                    Enter email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 text-left"
                  >
                    Enter Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-1/2 text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Login
                </button>
                <div className="mt-4 text-gray-700 text-sm">
                  <p>
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-blue-800 hover:underline"
                    >
                      Create account
                    </Link>
                  </p>
                </div>
              </form>
              {error && (
                <div className="mt-4 text-red-600 font-medium">{error}</div>
              )}
              {loginMessage && (
                <div className="mt-4 text-red-600 font-medium">
                  {loginMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
