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
  LinksFunction,
  redirect,
  useNavigate,
} from "remix";
import type { MetaFunction } from "remix";
import { authenticator } from "./services/auth.server";
import { UserResponse } from "./services/auth";
import { MenuHeader } from "./components";
import logo from "../assets/images/logo.png";

import globalStyles from "./styles/global.css";
import globalStylesLargeScreen from "./styles/global_large.css";
import { Category, getCategories } from "./services/category";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    {
      rel: "stylesheet",
      href: globalStylesLargeScreen,
      media: "(min-width: 1024px)",
    },
  ];
};

export const meta: MetaFunction = () => {
  return { title: "Fnhon Malaysia Community" };
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  const categories = await getCategories();

  console.log("category", categories);
  return { user, categories };
};

export let action: ActionFunction = async ({ request }) => {
  await authenticator.logout(request, { redirectTo: "/" });
};

export default function App() {
  const data = useLoaderData<{ user: UserResponse; categories: Category[] }>();
  const navigate = useNavigate();
  // const submit = useSubmit();

  // function handleLogout() {
  //   console.log("Handle logout");
  //   submit(null, { replace: true });
  // }

  function handleAuth() {
    navigate("/login");
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MenuHeader
          title="FFBM Community"
          logo={logo}
          categories={data.categories}
          handleAuth={handleAuth}
        >
          <Outlet />
        </MenuHeader>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
