// Import necessary functions and components from React and React Router.
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { signUpAction, loginAction } from "../actions";

// Define a functional component called "Auth."
function Auth() {
  // Access the navigation function from React Router.
  const navigate = useNavigate();

  // Retrieve the "action" parameter from the URL using React Router.
  const { action } = useParams();

  // Create a state variable "user" to store email and password, initialized as empty.
  const [user, setUser] = useState({ email: "", password: "" });

  // Create a state variable "error" to store error messages, initialized as empty.
  const [error, setError] = useState("");

  // Define a function "handleSubmit" to handle form submission.
  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior.
    event.preventDefault();

    // Clear any previous error messages.
    setError("");

    // Check if email or password is missing, and display an error if so.
    if (!user.email || !user.password) {
      setError("Email and Password required");
      return;
    } else if (action === "signup") {
      // If the action is "signup," call the signUpAction function.
      await signUpAction(user);
    } else if (action === "login") {
      // If the action is "login," call the loginAction function and check credentials.
      const res = await loginAction(user);

      // Check if the user's credentials are valid by searching the response.
      const found = res.some(
        (obj) => obj.email === user.email && obj.password === user.password
      );

      // If credentials are not valid, display an error message.
      if (!found) {
        setError("Invalid credentials");
        return;
      }
    }

    // Store a login status in local storage and navigate to the home page.
    localStorage.setItem("login", true);
    navigate("/");
  };

  // Render a form with input fields for email and password, and display errors if any.
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

      {/* Display an error message if "error" state is not empty. */}
      {error ? <div>{error}</div> : null}

      <button>Submit</button>
    </form>
  );
}

export default Auth;
