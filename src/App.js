import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import WorkoutsCatalog from "./pages/WorkoutsCatalog";
import Home from "./pages/Home";
import AddWorkout from "./pages/AddWorkout";
import Logout from "./pages/Logout";
import AppNavBar from "./components/AppNavbar";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    id: null,
  });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data !== "undefined") {
          setUser({
            id: data._id,
          });
        } else {
          setUser({
            id: null,
          });
        }
      });
  }, []);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavBar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/workouts" element={<WorkoutsCatalog />} />
              <Route path="/addWorkout" element={<AddWorkout />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
