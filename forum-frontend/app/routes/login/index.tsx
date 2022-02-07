import {
  useLoaderData,
  Link,
  Form,
  ActionFunction,
  useActionData,
  redirect,
} from "remix";
import { loginUser } from "~/services/auth";
import { authenticator } from "~/services/auth.server";
import { AuthorizationError } from "remix-auth";

// export const loader = () => {
//   return getPosts();
// };

export const action: ActionFunction = async ({ request }) => {
  //   const formData = await request.formData();
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  //   if (!email || !password)
  //     return {
  //       message: "Input cannot be empty",
  //     };

  //   const res = await loginUser({
  //     identifier: email.toString(),
  //     password: password.toString(),
  //   });

  //   if (res.error) {
  //     return res.error;
  //   }

  //   return redirect("/");

  try {
    const res = await authenticator.authenticate("user-pass", request, {
      successRedirect: "/",
      throwOnError: true,
    });

    if (res.error) {
      return res.error;
    }

    return res;
  } catch (error) {
    console.log("Catch error", error);

    if (error instanceof Response) return error;

    if (error instanceof AuthorizationError) {
      return {
        message: error.message,
      };
    }
  }
};

export default function Login() {
  const error = useActionData();
  console.log("Check error", error);
  return (
    <div>
      <h1>Login</h1>

      <div>
        <Form method="post">
          <div>
            <label>
              Email: <input type="text" name="email" />
            </label>
          </div>
          <div>
            <label>
              Password: <input type="password" name="password" />
            </label>
          </div>
          <button type="submit">Login</button>
        </Form>
        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
}
