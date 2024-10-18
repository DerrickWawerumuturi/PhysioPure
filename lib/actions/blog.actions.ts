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
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export const createBlogPost = async ({
  previewImage,
  author_id,
  ...data
}: createPost) => {
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

    console.log("author id is this", author_id);

    const newPost = await database.createDocument(
      DATABASE_ID!,
      BLOG_COLLECTION_ID!,
      ID.unique(),
      {
        previewImageId: file?.$id || null,
        previewImageUrl: `${ENDPOINT}/storage/buckets/${STORAGE_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...data,
        author_id,
      }
    );
    if (newPost.$id) {
      console.log("newPost id ", parseStringify(newPost));
      return newPost;
    } else {
      return false;
    }
  } catch (error) {
    console.log("could not create a post", error);
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
    return parseStringify(updatedPost);
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
    console.log("could not get blogs", error);
  }
};

export const getTop6Posts = async () => {
  const { database } = await createAdminClient();
  try {
    const blogs = await database.listDocuments(
      DATABASE_ID!,
      BLOG_COLLECTION_ID!,
      [Query.orderDesc("updatedAt"), Query.limit(6)]
    );
    return parseStringify(blogs.documents);
  } catch (error) {
    console.log("could not get blogs");
  }
};

export const getPostsWithTags = async (tag: string) => {
  const { database } = await createAdminClient();

  try {
    const relatedPosts = await database.listDocuments(
      DATABASE_ID!,
      BLOG_COLLECTION_ID!,
      [Query.equal("tags", tag)]
    );
    return parseStringify(relatedPosts.documents);
  } catch (error) {
    console.log("could not get blogs related to the tag given", error);
    return null;
  }
};

export const getPostsOnQuery = async (query: string) => {
  const { database } = await createAdminClient();
  try {
    if (query === "articles") {
      const articles = await database.listDocuments(
        DATABASE_ID!,
        BLOG_COLLECTION_ID!,
        [Query.equal("publish_type", query)]
      );
      return parseStringify(articles.documents);
    } else {
      const blogs = await database.listDocuments(
        DATABASE_ID!,
        BLOG_COLLECTION_ID!,
        [Query.equal("publish_type", query)]
      );

      return parseStringify(blogs.documents);
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllTags = async () => {
  const { database } = await createAdminClient();
  try {
    const tags = await database.listDocuments(DATABASE_ID!, TAG_COLLECTION_ID!);
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
