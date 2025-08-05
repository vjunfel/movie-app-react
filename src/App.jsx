import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MovieDetails from "./pages/MovieDetails";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/movies" element={<Home />} />
          <Route path="/movie-details/:id" element={<MovieDetails />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
