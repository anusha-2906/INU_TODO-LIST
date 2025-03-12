import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-container">
        <h1 className="home-title">Welcome to the To-Do App</h1>
        <button className="home-button" onClick={() => navigate("/login")}>Login</button>
        <button className="home-button" onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
};

export default Home;
