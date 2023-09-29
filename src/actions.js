import { redirect } from "react-router-dom";
const url = "https://bill-buddy-backend.onrender.com/bills/";

// Function to format the date from "mm-dd-yyyy" to "yyyy-mm-dd"
function formatDate(dateString) {
  const [month, day, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
}

// Create Action for Creating Bills
export const createAction = async ({ request }) => {
  // parse out the form data
  const formData = await request.formData();

  // Format the bill_date field from "mm-dd-yyyy" to "yyyy-mm-dd"
  const formattedBillDate = formatDate(formData.get("bill_date"));

  // construct the body for our api call
  const newBill = {
    name_of_subscription: formData.get("name_of_subscription"),
    subscription_image_url: formData.get("subscription_image_url"),
    bill_date: formattedBillDate, // Use the formatted date
    subscription_price: formData.get("subscription_price"),
  };

  console.log("after change", newBill.bill_date);

  // make a request to create a bill
  await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBill),
  });

  // redirect to the index page
  return redirect("/");
};

// Delete Action
export const deleteAction = async ({ params }) => {
  const id = params.id;

  console.log("deleteAction - id:", id); // Log the ID

  // Make a request to delete the bill
  await fetch(url + id, {
    method: "delete",
  })
    .then((response) => {
      if (!response.ok) {
        console.error(
          "Error deleting bill:",
          response.status,
          response.statusText
        );
      }
    })
    .catch((error) => {
      console.error("Error deleting bill:", error);
    });

  console.log("deleteAction - Bill deleted successfully!"); // Log success

  // Redirect to the index page after deleting
  return redirect("/");
};

// Update Action using PUT
export const updateAction = async ({ request, params }) => {
  const id = params.id;

  // parse out the form data
  const formData = await request.formData();

  // Get the user-friendly date format (mm-dd-yyyy)
  const userFriendlyDate = formData.get("bill_date");

  // Convert it to the desired format (yyyy-mm-dd)
  const formattedBillDate = formatDate(userFriendlyDate);

  // construct the body for our API call
  const updatedBill = {
    id, // Include the ID in the updated data
    name_of_subscription: formData.get("name_of_subscription"),
    subscription_image_url: formData.get("subscription_image_url"),
    bill_date: formattedBillDate, // Use the formatted date (yyyy-mm-dd)
    subscription_price: formData.get("subscription_price"),
  };

  // ...

  // Make a request to update the bill using PUT
  await fetch(url + id + "/", {
    method: "PUT", // Use PUT instead of POST
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBill),
  });

  // Redirect to the index page after updating
  return redirect("/");
};
