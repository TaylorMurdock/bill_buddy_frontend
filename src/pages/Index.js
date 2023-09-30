import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useLoaderData, Form, Link } from "react-router-dom";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import "../index.css"; // Import your custom CSS file

function Index(props) {
  // fetch the loader data using the useLoaderData hook
  const bills = useLoaderData();
  console.log("loaderData", bills);

  // Function to format the bill date
  function formatBillDate(dateString) {
    // Parse the date string into a JavaScript Date object
    const parsedDate = new Date(dateString);

    // Format the parsed date into "MM-dd-yyyy" format using date-fns
    const formattedDate = format(parsedDate, "MM-dd-yyyy");

    // Log the formatted date for debugging purposes
    console.log("Formatted Date:", formattedDate);

    // Return the formatted date
    return formattedDate;
  }

  // Define a state variable to track whether the form is open or closed
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loginValue = localStorage.getItem("login");

    setLoggedIn(loginValue);
  }, [loggedIn]);

  // Function to toggle the form's visibility
  const toggleForm = () => {
    // Invert the value of isFormOpen when the function is called
    setIsFormOpen(!isFormOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("login");
    setLoggedIn(false);
  };

  // Map over the bills and create a Post component for each bill
  return (
    <div>
      {loggedIn === "true" ? (
        <div className="index-container">
          {/* Add a header for the app name */}
          <button onClick={handleLogout}>Logout</button>
          <header className="app-header">Bill Buddy</header>

          {/* Create a button to toggle the visibility of the subscription form */}
          <button className="toggle-form-button" onClick={toggleForm}>
            {isFormOpen ? "Close Form" : "Add a subscription"}
          </button>

          {/* Conditionally render the subscription form if isFormOpen is true */}
          {isFormOpen && (
            <Form className="subscription-form" method="post" action="/create">
              <input
                type="text"
                name="name_of_subscription"
                placeholder="Subscription"
              />
              <input
                type="text"
                name="subscription_image_url"
                placeholder="Image url"
              />
              <input
                type="text"
                name="bill_date"
                placeholder="Bill date mm-dd-yyyy"
              />
              <input
                type="text"
                name="subscription_price"
                placeholder="Price"
              />
              <button>Create a new subscription</button>
            </Form>
          )}

          {/* Render the SearchBar component */}
          <SearchBar />

          {/* Create a list of bills */}
          <ul className="bills-list">
            {bills.map((bill) => (
              <li key={bill.id}>
                {/* Render the Post component with bill data */}
                <Post post={bill} />
                {/* Display formatted bill date using the formatBillDate function */}
                <h2>Bill Date: {formatBillDate(bill.bill_date)}</h2>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="index-container">
          <Link to="/auth/login">
            <button>Login</button>
          </Link>
          <Link to="/auth/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Index;
