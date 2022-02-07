import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LoaderFunction,
  useLoaderData,
  ActionFunction,
  useSubmit,
  Form,
} from "remix";
import type { MetaFunction } from "remix";
import { authenticator } from "./services/auth.server";
import { UserResponse } from "./services/auth";
import styles from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "Fnhon Malaysia Community" };
};

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request);
  console.log("loader data root", user);
  return user;
};

export let action: ActionFunction = async ({ request }) => {
  console.log("Action logut", request);
  await authenticator.logout(request, { redirectTo: "/" });
};

export default function App() {
  const data = useLoaderData<UserResponse>();
  // const submit = useSubmit();

  // function handleLogout() {
  //   console.log("Handle logout");
  //   submit(null, { replace: true });
  // }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1 className="text-3xl font-bold underline">Welcome to Remix</h1>

        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        {!data ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <Form method="post">
            <button type="submit">Logout</button>
          </Form>
        )}

        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
