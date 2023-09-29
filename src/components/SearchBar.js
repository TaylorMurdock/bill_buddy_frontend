import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// This is a functional component called "SearchBar" used for searching subscriptions.
function SearchBar() {
  // State to store the search text entered by the user.
  const [searchText, setSearchText] = useState("");

  // State to store and display error messages.
  const [error, setError] = useState("");

  // A hook for navigating to different routes.
  const navigate = useNavigate();

  // Function to handle the search when the user submits the form.
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior.

    // Reset the error message when a new search is initiated.
    setError("");

    // Fetch the list of subscriptions (assuming you have a list).
    try {
      const response = await fetch(
        "https://bill-buddy-backend.onrender.com/bills/"
      );

      if (response.ok) {
        const subscriptions = await response.json();

        // Find the first matching subscription with a case-insensitive search.
        const foundSubscription = subscriptions.find((subscription) =>
          subscription.name_of_subscription
            .toLowerCase()
            .includes(searchText.toLowerCase())
        );

        if (foundSubscription) {
          // If a matching subscription is found, navigate to the show page using its ID.
          navigate(`/post/${foundSubscription.id}`);
        } else {
          // If no matching subscription is found, set an error message.
          setError("Subscription not found");
        }
      } else {
        // Handle any errors with the API request.
        console.error(
          "Error fetching subscriptions:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      // Handle any other errors.
      console.error("Error searching for subscription:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      {/* Input field for entering the search text */}
      <input
        type="text"
        placeholder="Search for a subscription..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />
      {/* Submit button for triggering the search */}
      <button type="submit" className="search-button">
        Search
      </button>
      {/* Display error message if there is an error */}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

// Export the SearchBar component as the default export of this module.
export default SearchBar;
