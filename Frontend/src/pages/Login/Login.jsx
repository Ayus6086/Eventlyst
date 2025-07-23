import Navbar from "../../components/navbar/Navbar";
import "./Login.css";

function Login() {
  return (
    <>
      <Navbar />
      <div className="auth">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;