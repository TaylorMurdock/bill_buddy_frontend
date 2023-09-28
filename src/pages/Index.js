import React, { useState } from "react";
import { format } from "date-fns";
import { useLoaderData, Form } from "react-router-dom";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import "../index.css"; // Import your custom CSS file

function Index(props) {
  // fetch the loader data using the useLoaderData hook
  const bills = useLoaderData();
  console.log("loaderData", bills);

  // Function to format the bill date
  function formatBillDate(dateString) {
    const parsedDate = new Date(dateString);
    const formattedDate = format(parsedDate, "MM-dd-yyyy");
    console.log("Formatted Date:", formattedDate); // Add this line for debugging
    return formattedDate;
  }

  // Define a state variable to track whether the form is open or closed
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Function to toggle the form's visibility
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  // map over the bills and create a Post component for each bill
  return (
    <div className="index-container">
      {/* Add a header for the app name */}
      <header className="app-header">Bill Buddy</header>
      <button className="toggle-form-button" onClick={toggleForm}>
        {isFormOpen ? "Close Form" : "Add a subscription"}
      </button>

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
            placeholder="Bill date yyyy-mm-dd"
          />
          <input type="text" name="subscription_price" placeholder="Price" />
          <button>Create a new subscription</button>
        </Form>
      )}
      <SearchBar />
      <ul className="bills-list">
        {bills.map((bill) => (
          <li key={bill.id}>
            <Post post={bill} />
            <h2>Bill Date: {formatBillDate(bill.bill_date)}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
