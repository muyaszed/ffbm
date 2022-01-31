import { useLoaderData, Link } from "remix";
import { getPosts, Post } from "~/post";

export const loader = () => {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <li>
          <Link to={post.id.toString()}>{post.attributes.title}</Link>
        </li>
      ))}

      <div>
        <button>New Post</button>
      </div>
    </div>
  );
}
