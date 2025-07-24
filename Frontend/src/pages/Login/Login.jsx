import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { toast } from "react-toastify";
import "./Login.css";
import { loginUser } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    // add simple validation
    if (email === "") {
      toast.warning("Invalid email");
      return;
    } else if (password === "") {
      toast.warning("Please enter your password");
      return;
    }
    setLoading(true);
    try {
      // make the api call
      const res = await loginUser({
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("Login successful!");
        // add the data to redux
        dispatch(setUser(res.data.data));
        // TODO: navigate the user to events page
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong :(");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth">
        <h2>Login</h2>
        <form>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" onClick={handleLogin}>
            {loading ? "loading..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;