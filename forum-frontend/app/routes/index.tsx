import { LoaderFunction, useLoaderData } from "remix";
import { UserResponse } from "~/services/auth";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request);
  console.log("loader data", user);
  return user;
};

export default function Index() {
  const user = useLoaderData<UserResponse>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold underline">Welcome to Remix</h1>
    </div>
  );
}
