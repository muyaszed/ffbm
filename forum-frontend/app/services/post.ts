export type Post = {
  attributes: PostAttr;
  id: number;
};

export type Reply = {
  attributes: ReplyAttr;
  id: number;
};

export type ReplyAttr = {
  content: string;
};

export type PostAttr = {
  title: string;
  content: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
  replies: ReplyData;
};

export type Pagination = {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
};

export type Meta = {
  pagination: Pagination;
};

export type PostData = {
  data: Post[];
  meta: Meta;
};

export type ReplyData = {
  data: Reply[];
  meta: Meta;
};

export type NewPost = Pick<PostAttr, "title" | "content">;

export async function getPosts() {
  //   const query = new URLSearchParams("populate[0]=replies");

  const result = await fetch("http://localhost:1337/api/posts");
  const posts: PostData = await result.json();

  console.log(posts.data);

  return posts.data;
}

export async function getPost(id: string | undefined) {
  const query = new URLSearchParams("populate[0]=replies");

  if (!id) {
    return;
  }

  const result = await fetch(`http://localhost:1337/api/posts/${id}?${query}`);
  const post: PostData = await result.json();

  console.log(post.data);

  return post.data;
}

export async function addPost(post: NewPost) {
  const response = await fetch("http://localhost:1337/api/posts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      data: post,
    }),
  });

  console.log(response);

  return response.json();
}
