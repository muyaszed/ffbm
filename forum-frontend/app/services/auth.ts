import { redirect } from "remix";

export type NewUser = {
  username: string;
  email: string;
  password: string;
};

export type UserPayload = {
  identifier: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  cretaedAt: string;
  updatedAt: string;
};

export type UserResponse = {
  jwt: string;
  user: User;
  error?: Error;
};

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
