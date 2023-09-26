import { redirect } from "react-router-dom";
const url = "https://bill-buddy-backend.onrender.com/bills/";

// Create Action for Creating Bills
export const createAction = async ({ request }) => {
  // parse out the form data
  const formData = await request.formData();

  // construct the body for our api call
  const newBill = {
    name_of_subscription: formData.get("name_of_subscription"),
    subscription_image_url: formData.get("subscription_image_url"),
    bill_date: formData.get("bill_date"),
    subscription_price: formData.get("subscription_price"),
  };

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

// Update Action
