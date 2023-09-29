// Define the base URL of your deployed API
const url = "https://bill-buddy-backend.onrender.com/bills/";

// indexLoader: This function is used to load data for the index page.
export const indexLoader = async () => {
  // Send a GET request to the API URL
  const response = await fetch(url);

  // Parse the response as JSON to get an array of bills
  const bills = await response.json();

  // Log the bills to the console for debugging
  console.log(bills);

  // Return the array of bills as the result
  return bills;
};

// showLoader: This function is used to load data for the show (detail) page.
export const showLoader = async ({ params }) => {
  // Extract the "id" parameter from the route params
  const id = params.id;

  // Construct the URL for a specific bill using the base URL and the extracted ID
  const response = await fetch(url + id);

  // Parse the response as JSON to get the details of the specific bill
  const bill = await response.json();

  // Return the bill details as the result
  return bill;
};
