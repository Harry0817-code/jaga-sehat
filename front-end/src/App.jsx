import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { getUserLogged, login, putAccessToken } from "./utils/network-data";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import GetStartedPage from "./pages/GetStartedPage";
import Navigations from "./components/Navigations";
import ChatDoctorsPage from "./pages/ChatDoctorsPage";
import DetailDoctorPage from "./pages/DetailDoctorPage";
import BMICalculator from './pages/check-ideal-with-ai/BMICalculator';
import AdminDashboard from './pages/Admin/Admin';

function App() {
  const navigate = useNavigate();
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function onLoginSuccess([{ email, password }]) {
    setIsLoading(true);
    const { error, data: dataLogin } = await login(email, password);

    if (!error) {
      putAccessToken(dataLogin.accessToken);
      const { data: dataUserLogged } = await getUserLogged();
      const user = dataUserLogged.user ?? dataUserLogged;

      // role berdasarkan id
      setAuthedUser({
        ...user,
        role: user.id === "admin" ? "admin" : "user", 
      });

      setIsLoading(false);
      navigate("/", { replace: true });
    }
  }

  async function onClickLogout() {
    setAuthedUser(null);
    putAccessToken("");
    navigate("/login-apps", { replace: true });
  }

  useEffect(() => {
    async function fetchUserLogged() {
      setIsLoading(true);
      if (!localStorage.getItem("accessToken")) {
        setAuthedUser(null);
        setInitializing(false);
        setIsLoading(false);
        return;
      }
      const { data: dataUserLogged } = await getUserLogged();
      const user = dataUserLogged.user ?? dataUserLogged;

      // role berdasarkan id
      setAuthedUser({
        ...user,
        role: user.id === "admin" ? "admin" : "user", 
      });
      setInitializing(false);
      setIsLoading(false);
    }
    fetchUserLogged();
  }, []);

  if (initializing) {
    return null;
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  // >>> Route Config sesuai role
  const routeConfig = {
    admin: [
      { path: "/", element: <AdminDashboard /> },
      { path: "/users", element: <p>User Management Page</p> },
    ],
    user: [
      { path: "/", element: <HomePage /> },
      { path: "/chat-doctors", element: <ChatDoctorsPage /> },
      { path: "/check-ideal", element: <BMICalculator /> },
      { path: "/doctor/:id", element: <DetailDoctorPage /> },
    ],
    guest: [
      { path: "/", element: <GetStartedPage /> },
      { path: "/login-apps", element: <LoginPage onLoginSuccess={onLoginSuccess} /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  };

  // >>> tentukan role user langsung
  const role = authedUser?.role || "guest";
  const activeRoutes = routeConfig[role];

  return (
    <>
      <header>
        <Link to="/" style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize: "20px", textDecoration: "none" }} >
          <div style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize: "20px" }} >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(90deg, #16a34a, #22c55e)", color: "white", marginRight: "10px", }} >
              <Heart size={22} strokeWidth={2.2} />
            </div>
            <span style={{ background: "linear-gradient(90deg, #16a34a, #22c55e)", WebkitBackgroundClip: "text", color: "transparent" }} >
              Jaga Sehat
            </span>
          </div>
        </Link>
        <Navigations authedUser={authedUser} onLogout={onClickLogout} />
      </header>
      <main>
        <section>
          <Routes>
            {activeRoutes.map((r, i) => (
              <Route key={i} path={r.path} element={r.element} />
            ))}
            <Route path="/*" element={<p>404 | Not Found</p>} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default App;
