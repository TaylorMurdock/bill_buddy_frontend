import { Link } from "react-router-dom";

// describe the post prop
function Post({ post }) {
  return (
    <div>
      <Link to={`/post/${post.id}`}>
        <h1>{post.name_of_subscription}</h1>
        <img src={post.subscription_image_url} alt="" />
        <h2>{post.subscription_price}</h2>
      </Link>
    </div>
  );
}

export default Post;
