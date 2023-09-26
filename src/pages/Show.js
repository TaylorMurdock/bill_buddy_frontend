import { Link, useLoaderData, Form, useNavigate } from "react-router-dom";

function Show(props) {
  const post = useLoaderData();
  const navigate = useNavigate();

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
        navigate("/"); // Redirect to the index page
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

  return (
    <div>
      <h1>{post.name_of_subscription}</h1>
      <img src={post.subscription_image_url} alt="" />
      <p>Bill Date: {post.bill_date}</p>
      <p>Price: {post.subscription_price}</p>

      <div>
        <h2>Update Subscription</h2>
        <Form method="post" action={`/update/${post.id}`}>
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
        <div>
          {/* Button to trigger the delete operation */}
          <button onClick={() => handleDeleteClick(post.id)}>
            Delete Subscription
          </button>
        </div>
      </div>
      <Link to="/">Back to Subscriptions</Link>
    </div>
  );
}

export default Show;
