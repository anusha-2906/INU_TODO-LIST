import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the To-Do App</h1>
      <button onClick={() => navigate("/login")} >Login</button>
      <button onClick={() => navigate("/register")} >Register</button>
    </div>
  );
};

export default Home;