import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUpAction, loginAction } from "../actions";

function Auth() {
  const navigate = useNavigate();

  //retrieve action from url
  const { action } = useParams();

  // created state for user object that contains email and password set to null
  const [user, setUser] = useState({ email: "", password: "" });

  //create state for errors for email and password
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!user.email || !user.password) {
      setError("Email and Password required");
      return;
    } else if (action === "signup") {
      await signUpAction(user);
    } else if (action === "login") {
      const res = await loginAction(user);

      const found = res.some(
        (obj) => obj.email === user.email && obj.password === user.password
      );

      if (!found) {
        setError("Invalid credentials");
        return;
      }
    }

    localStorage.setItem("login", true);
    navigate("/");
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        type="text"
        placeholder="Email"
        value={user.email}
        onChange={(event) =>
          setUser((prev) => ({ ...prev, email: event.target.value }))
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(event) =>
          setUser((prev) => ({ ...prev, password: event.target.value }))
        }
      />

      {error ? <div>{error}</div> : null}

      <button>Submit</button>
    </form>
  );
}

export default Auth;
