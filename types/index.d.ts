import { Block } from "@blocknote/core";

// user props
declare interface signInProps {
  email: string;
  password: string;
}

declare type SignUpParams = {
  username: string;
  email: string;
  password: string;
};

declare interface getUserInfoProps {
  userId: string;
}
declare type UserInfo = {
  name: string;
  username: string;
  email: string;
  password: string;
} | null;

declare type User = {
  $id: string;
  name: string;
  email: string;
};

declare interface ProfileIcon {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  link?: string;
  onClick?: () => void;
}

// blog props
declare interface createPost {
  title: string;
  subtitle: string;
  slug: string;
  authorId: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  previewImage: FormData | undefined;
}

declare interface BlogProps extends createPost {
  $id: string;
  title: string;
  slug: string;
  authorId: string;
  content: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  previewImageId: string;
  previewImageUrl: string;
}

declare interface updatePost {
  postId: string;
  updatedContent: string;
}

declare type MyInlineContent = InlineContent<StyleSchema, StyleImplementation>;
declare type MyTableContent = TableContent<MyInlineContent, any>;
