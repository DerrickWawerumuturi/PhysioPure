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

    console.log("session created");

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

export const SignIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    if (password) {
      const session = await account.createEmailPasswordSession(email, password);

      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
      return parseStringify(session);
    } else {
      const session = await account.getSession("current");

      if (!session) {
        throw new Error("No session found");
      }

      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      return parseStringify(session);
    }
  } catch (error) {
    console.log("could not sign in", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    if (account === null) {
      return null;
    }

    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export async function userExists(email: string) {
  try {
    const { database } = await createAdminClient();
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("email", email)]
    );
    return parseStringify(user);
  } catch (error) {
    console.log("Could not get existing user", error);
  }
}

export async function getUserById(authorId: string) {
  const { database } = await createAdminClient();
  try {
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", authorId)]
    );
    return parseStringify(user.documents);
  } catch (error) {
    console.log("user not found with given authorId: " + authorId);
    console.log("error is", error);
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
