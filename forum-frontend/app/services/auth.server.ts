import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";
import { sessionStorage } from "~/services/session.server";
import { loginUser, User, UserResponse } from "./auth";

export let authenticator = new Authenticator<UserResponse>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");

    invariant(email, "email must not be epmty");
    invariant(password, "email must not be epmty");

    let user = await loginUser({
      identifier: email.toString(),
      password: password.toString(),
    });

    console.log("Auth user", user);
    return user;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);
