"use client";
import { Account, Client, OAuthProvider } from "appwrite";

export const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

export const account = new Account(client);
export { OAuthProvider };
