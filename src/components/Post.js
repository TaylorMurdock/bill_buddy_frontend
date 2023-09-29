import { Link } from "react-router-dom";

// This is a functional component called "Post" that takes a single prop named "post".
// The "post" prop is an object containing data related to a subscription or post.

function Post({ post }) {
  return (
    <div>
      {/* Create a Link component that navigates to a dynamic route with the post's ID */}
      <Link to={`/post/${post.id}`}>
        {/* Display the name of the subscription as a heading */}
        <h1>{post.name_of_subscription}</h1>

        {/* Display an image related to the subscription */}
        <img src={post.subscription_image_url} alt="" />

        {/* Display the subscription price as a heading */}
        <h2>{post.subscription_price}</h2>
      </Link>
    </div>
  );
}

// Export the Post component as the default export of this module
export default Post;
