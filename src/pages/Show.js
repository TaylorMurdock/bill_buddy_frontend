import React, {
  Link,
  useLoaderData,
  Form,
  useNavigate,
} from "react-router-dom";
import { format } from "date-fns";

// This is a functional component called "Show" used for displaying a single subscription.
function Show(props) {
  // Fetch the post data using the useLoaderData hook
  const post = useLoaderData();

  // A hook for navigating to different routes
  const navigate = useNavigate();

  // Function to format the bill date
  function formatBillDate(dateString) {
    const parsedDate = new Date(dateString);
    const formattedDate = format(parsedDate, "MM-dd-yyyy");
    return formattedDate;
  }

  // Function to handle the delete click
  async function handleDeleteClick(id) {
    try {
      const response = await fetch(
        `https://bill-buddy-backend.onrender.com/bills/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        navigate("/"); // Redirect to the index page after successful deletion
      } else {
        console.error(
          "Error deleting resource:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  }

  // Function to handle the update form submission
  async function handleUpdateSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create an object to store the updated data
    const updatedData = {};

    // Get the form data
    const formData = new FormData(event.target);

    // Iterate over the form fields and add them to the updatedData object
    formData.forEach((value, key) => {
      if (value.trim() !== "") {
        updatedData[key] = value;
      }
    });

    // Remove fields with empty values from updatedData
    for (const key in updatedData) {
      if (updatedData[key] === "") {
        delete updatedData[key];
      }
    }

    // Make the PUT request to update the data
    try {
      const response = await fetch(
        `https://bill-buddy-backend.onrender.com/bills/${post.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        navigate("/"); // Redirect to the index page after successful update
      } else {
        console.error(
          "Error updating resource:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  }

  // Render the subscription details and update/delete forms
  return (
    <div className="show-container">
      {/* Display the subscription details */}
      <img
        src={post.subscription_image_url}
        alt=""
        className="subscription-image"
      />
      <p>Bill Date: {formatBillDate(post.bill_date)}</p>
      <p>Price: {post.subscription_price}</p>

      {/* Update Subscription Form */}
      <div className="update-subscription">
        <h2>Update Subscription</h2>
        <Form onSubmit={handleUpdateSubmit} className="subscription-form">
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
          <input type="text" name="bill_date" placeholder="Bill Date" />
          <input type="text" name="subscription_price" placeholder="Price" />
          <button>Update Subscription</button>
        </Form>

        {/* Container for the delete button */}
        <div className="delete-subscription">
          {/* Button to trigger the delete operation */}
          <button onClick={() => handleDeleteClick(post.id)}>
            Delete Subscription
          </button>
        </div>
      </div>

      {/* Link to go back to the index page */}
      <Link to="/" className="back-link">
        Back to Subscriptions
      </Link>
    </div>
  );
}

// Export the Show component as the default export of this module.
export default Show;
