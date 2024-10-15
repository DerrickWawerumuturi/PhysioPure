<<<<<<< HEAD
"use server";
import { Account, Client, OAuthProvider } from "appwrite";

const {
  NEXT_PUBLIC_APPWRITE_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT: PROJECT_ID,
} = process.env;

console.log("enpoint", ENDPOINT);
console.log("pdi", PROJECT_ID);

const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);

export const account = new Account(client);
console.log("account is", account);

=======
"use client";
import { Account, Client, OAuthProvider } from "appwrite";

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

export const account = new Account(client);
>>>>>>> 5399d61b273ba070b6b5e553e8f451bb803c7fa5
export { OAuthProvider };
