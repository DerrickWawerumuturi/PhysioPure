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

export { OAuthProvider };
