import { useLoaderData, Link, Form, ActionFunction } from "remix";
import { getPosts, addPost, Post } from "~/services/post";

export const loader = async () => {
  return await getPosts();
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) return;

  const res = await addPost({
    title: title.toString(),
    content: content.toString(),
  });

  return res;
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <li key={post.attributes.title}>
          <Link to={post.id.toString()}>{post.attributes.title}</Link>
        </li>
      ))}

      <div>
        <Form method="post">
          <div>
            <label>
              Title: <input type="text" name="title" />
            </label>
          </div>
          <div>
            <label>
              Content: <input type="text" name="content" />
            </label>
          </div>
          <button type="submit">New Post</button>
        </Form>
      </div>
    </div>
  );
}
