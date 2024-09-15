"use server";

import { BlogData, UpdateBlogParams } from "@/types";
import { createAdminClient } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

const {
  APPWRITE_POST_COLLECTION_ID: APPWRITE_POST_ID,
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TAG_COLLECTION_ID: APPWRITE_TAG_ID,
} = process.env;

//

export const createBlog = async (
  userId: string,
  status?: string,
  content?: string[],
  title?: string,
  subtitle?: string
) => {
  const { database } = await createAdminClient();
  if (!database) {
    console.log("no db to work with");
  }
  try {
    console.log(userId);
    const response = await database.createDocument(
      DATABASE_ID!,
      APPWRITE_POST_ID!,
      ID.unique(),
      {
        userId,
        content,
        status,
        title,
        subtitle,
      }
    );
    if (!response) {
      console.log("no response");
    }
    const id: string = String(response.$id);
    return {
      id: id,
    };
  } catch (error) {
    console.error("errror saving post", error);
    throw error;
  }
};

export const getBlog = async (blogId: string) => {
  const { database } = await createAdminClient();
  try {
    const blog = await database.getDocument(
      DATABASE_ID!,
      APPWRITE_POST_ID!,
      blogId
    );
    return parseStringify(blog);
  } catch (error) {
    console.log("Error getting blog => blog.actions.ts");
  }
};

export const updateBlog = async (
  blogId: string,
  status?: string,
  content?: string[],
  title?: string,
  subtitle?: string,
  userId?: string
) => {
  try {
    const { database } = await createAdminClient();

    const updateData: Record<string, any> = {};
    if (status !== undefined) updateData.status = status;
    if (content !== undefined) updateData.content = content;
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;

    // if there is no blog

    if (!blogId) {
      console.log("new blog then");
      console.log(userId);
      const newBlog = await createBlog(
        userId!,
        status,
        content,
        title!,
        subtitle!
      );
      console.log("new blog made");
      return parseStringify(newBlog.id);

      // Update blog
    } else if (Object.keys(updateData).length > 0) {
      console.log(blogId);
      const result = await database.updateDocument(
        DATABASE_ID!,
        APPWRITE_POST_ID!,
        blogId,
        updateData
      );
      console.log(result);
      return parseStringify(result);
    } else {
      console.log("nothing to update or an error occured");
    }
  } catch (error) {
    console.log("failed trying to update  blog, blog.actions.ts", error);
  }
};

export const totalBlogs = async () => {
  const { database } = await createAdminClient();
  try {
    const blogs = await database.listDocuments(
      DATABASE_ID!,
      APPWRITE_POST_ID!,
      [Query.orderDesc("$createdAt")]
    );
  } catch (error) {}
};

export const getAllTags = async () => {
  const { database } = await createAdminClient();
  try {
    const tags = await database.listDocuments(DATABASE_ID!, APPWRITE_TAG_ID!);
    console.log(tags);
    return parseStringify(tags);
  } catch (error) {
    console.log("failed to fetch tags", error);
    return [];
  }
};

export const createTag = async (tag: string) => {
  const { database } = await createAdminClient();
  try {
    const createTags = await database.createDocument(
      DATABASE_ID!,
      APPWRITE_TAG_ID!,
      ID.unique(),
      tag
    );
    return parseStringify(createTags.$id);
  } catch (error) {
    console.log("could not create a tag - blog.actions.ts");
  }
};

// redine the structure of creating a blog
