import { Block } from "@blocknote/core";

export type Post = {
  author: string;
  category: string;
  title: string;
  subTitle: string;
};

export type ToolbarProps = {
  editor: Editor | null;
};

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

declare interface ProfileIcon {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  link?: string;
  onClick?: () => void;
}

declare interface EditorProps {
  onBlocksChange: (blocks: Block[]) => void;
  onSaveDraft: (blocks: Block[]) => void;
  onPubblish: (blocks: Block[]) => void;
}

declare interface BlogData {
  content: string[];
  status: type;
  userId: user.$id;
}

export interface ReturnData {
  level?: number;
  type: string;
  text: string;
}

export interface SaveButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isDraftSaved: boolean;
  errorMessage?: string;
}

declare type UpdateBlogParams = {
  blogId: string;
  status: string;
  content?: string;
};

declare interface dbUserParams {
  $id: string;
  email: string;
  name: string;
}

declare interface BlogData {
  content: string[] | string | undefined;
  title?: string;
  subtitle?: string;
}
