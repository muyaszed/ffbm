import {
  useLoaderData,
  Link,
  Form,
  ActionFunction,
  useActionData,
  redirect,
} from "remix";
import { loginUser } from "~/services/auth";

// export const loader = () => {
//   return getPosts();
// };

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password)
    return {
      message: "Input cannot be empty",
    };

  const res = await loginUser({
    email: email.toString(),
    password: password.toString(),
  });

  if (res.error) {
    return res.error;
  }

  return redirect("/");
};

export default function Login() {
  const error = useActionData();
  console.log("Check error", error);
  return (
    <div>
      <h1>Sign up</h1>

      <div>
        <Form method="post">
          <div>
            <label>
              Username: <input type="text" name="username" />
            </label>
          </div>
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
          <button type="submit">Sign up</button>
        </Form>
        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
}
