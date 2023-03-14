import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TheLayout from "./container/TheLayout";
import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Layout2 from "./container/Layout2";
import Dashboard from "./views/Dashboard";
import Project from "./views/Projects";
import Volunteer from "./views/Volunteers";
import NGO from "./views/Ngo";
import Logout from "./views/Logout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/auth", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (res.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    // still checking if the user is logged in
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TheLayout><Home /></TheLayout>} />
        <Route path="/Login" element={<TheLayout><Login /></TheLayout>} />
        <Route path="/SignUp" element={<TheLayout><SignUp /></TheLayout>} />
        <Route path="/Dashboard" element={isLoggedIn ? <Layout2><Dashboard /></Layout2> : <Navigate to={"/"} />} />
        <Route path="/Projects" element={isLoggedIn ? <Layout2><Project /></Layout2> : <Navigate to={"/"} />} />
        <Route path="/Volunteers" element={isLoggedIn ? <Layout2><Volunteer /></Layout2> : <Navigate to={"/"} />} />
        <Route path="/Ngo" element={isLoggedIn ? <Layout2><NGO /></Layout2> : <Navigate to={"/"} />} />
        <Route path="/Logout" element={isLoggedIn ? <Layout2><Logout /></Layout2> : <Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
}

export default App;
