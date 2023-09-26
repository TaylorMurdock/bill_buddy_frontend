import Post from "../components/Post";
import { useLoaderData, Form } from "react-router-dom";

function Index(props) {
  // fetch the loaderdata using the useLoaderData hook
  const bills = useLoaderData();
  console.log("loaderData", bills);

  // map over the bills and create a Post component for each bill
  return (
    <>
      <div>
        <h2>Add a subscription</h2>
        <Form method="post" action="/create">
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
          <button>Create a new subscription</button>
        </Form>
      </div>
      {bills.map((bill) => (
        <Post key={bill.id} post={bill} />
      ))}
    </>
  );
}

export default Index;
