import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import { getPost, Post } from "~/services/post";

export const loader: LoaderFunction = async ({ params }) => {
  return getPost(params.id);
};

export default function PostId() {
  const post = useLoaderData<Post>();
  return (
    <>
      <div>{post.attributes.title}</div>
      <p>{post.attributes.content}</p>
      {post.attributes.replies.data.map((reply) => (
        <p>{reply.attributes.content}</p>
      ))}
    </>
  );
}
