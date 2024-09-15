"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { signInProps, SignUpParams } from "@/types";

export type PlainUser = {
  $id: string;
  email: string;
  name: string;
};

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, username } = userData;
  let newUserAccount;
  try {
    const { account, database } = await createAdminClient();
    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newUserAccount) throw new Error("Could not create a User");

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
      }
    );
    if (!newUser) throw Error("User not created in Document");
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const document = await createAdminClient();
      const users = await document.user.list([Query.equal("email", [email])]);

      if (users) {
        return { success: false, message: "User already exists. " };
      }
      console.log("cannot ceate user", error);
    }
    console.log("Error creating user", error);
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  try {
    console.log("attempting to log in ");
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (error) {
    console.log("could not sign in", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    console.log("could get user");
    return null;
  }
}

export const logOut = async () => {
  try {
    const { account } = await createSessionClient();
    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};
