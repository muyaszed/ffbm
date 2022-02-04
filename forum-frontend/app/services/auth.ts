import { redirect } from "remix";

export type NewUser = {
  username: string;
  email: string;
  password: string;
};

export type UserPayload = Omit<NewUser, "username">;

export async function addNewUser(user: NewUser) {
  const response = await fetch(
    "http://localhost:1337/api/auth/local/register",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const data = await response.json();

  console.log("data", data);
  return data;
}

export async function loginUser(user: UserPayload) {
  const response = await fetch("http://localhost:1337/api/auth/local", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();

  return data;
}
