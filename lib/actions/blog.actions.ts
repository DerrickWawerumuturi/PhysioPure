"use server";

import { createPost, updatePost } from "@/types";
import { createAdminClient } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

const {
  APPWRITE_BLOG_COLLECTION_ID: BLOG_COLLECTION_ID,
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_TAG_COLLECTION_ID: TAG_COLLECTION_ID,
  APPWRITE_STORAGE_ID: STORAGE_ID,
  NEXT_PUBLIC_APPWRITE_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT: PROJECT_ID,
} = process.env;

export const createBlogPost = async ({ previewImage, ...data }: createPost) => {
  const { database } = await createAdminClient();

  try {
    let file;

    if (previewImage) {
      const inputFile = InputFile.fromBuffer(
        previewImage?.get("fileData") as Blob,
        previewImage?.get("fileName") as string
      );
      const { storage } = await createAdminClient();
      file = await storage.createFile(STORAGE_ID!, ID.unique(), inputFile);
    }

    const newPost = await database.createDocument(
      DATABASE_ID!,
      BLOG_COLLECTION_ID!,
      ID.unique(),
      {
        previewImageId: file?.$id || null,
        previewImageUrl: `${ENDPOINT}/storage/buckets/${STORAGE_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...data,
      }
    );
    return parseStringify(newPost);
  } catch (error) {
    console.log("could not create a post");
  }
};

export const updateBlogPost = async (data: updatePost) => {
  const { database } = await createAdminClient();

  try {
    const updatedPost = await database.updateDocument(
      DATABASE_ID!,
      BLOG_COLLECTION_ID!,
      data.postId,
      data.updatedContent
    );
    return parseStringify(updateBlogPost);
  } catch (error) {
    console.log("could not update post");
  }
};

export const getSpecificPost = async (slug: string | string[]) => {
  const { database } = await createAdminClient();
  try {
    const specificBlog = await database.listDocuments(
      DATABASE_ID!,
      BLOG_COLLECTION_ID!,
      [Query.equal("slug", slug)]
    );
    return parseStringify(specificBlog.documents);
  } catch (error) {
    console.log("couldn't get specific post");
  }
};

export const getAllPosts = async () => {
  const { database } = await createAdminClient();
  try {
    const blogs = await database.listDocuments(
      DATABASE_ID!,
      BLOG_COLLECTION_ID!,
      [Query.orderDesc("updatedAt")]
    );
    return parseStringify(blogs.documents);
  } catch (error) {
    console.log("could not get blogs");
  }
};

export const getAllTags = async () => {
  const { database } = await createAdminClient();
  try {
    const tags = await database.listDocuments(DATABASE_ID!, TAG_COLLECTION_ID!);
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
      TAG_COLLECTION_ID!,
      ID.unique(),
      tag
    );
    return parseStringify(createTags.$id);
  } catch (error) {
    console.log("could not create a tag - blog.actions.ts");
  }
};

// redine
