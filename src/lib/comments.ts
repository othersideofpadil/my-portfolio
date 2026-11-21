import { PROFILE } from "../data/profile";
import type { User } from "@supabase/supabase-js";

export type Comment = {
  id: number;
  user_id: string;
  user_name: string;
  user_email: string | null;
  user_avatar: string | null;
  comment: string;
  parent_id: number | null;
  created_at: string;
};

export type Thread = Comment & { replies: Comment[] };

export const MAX_COMMENT_LENGTH = 500;

export const isOwner = (email?: string | null) =>
  email?.trim().toLowerCase() === PROFILE.email;

const AVATAR_KEYS = [
  "avatar_url",
  "picture",
  "photo_url",
  "profile_image_url",
] as const;

export const getAvatarUrl = (user: User | null): string | null => {
  const metadata = user?.user_metadata ?? {};
  for (const key of AVATAR_KEYS) {
    const value = metadata[key];
    if (typeof value === "string" && value) return value;
  }
  return null;
};

export const getDisplayName = (user: User): string =>
  user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

/** Rows must be sorted oldest-first. Threads come back newest-first, replies oldest-first. */
export const groupThreads = (rows: Comment[]): Thread[] => {
  const roots: Comment[] = [];
  const repliesByParent = new Map<number, Comment[]>();

  for (const row of rows) {
    if (row.parent_id === null) {
      roots.push(row);
      continue;
    }
    const siblings = repliesByParent.get(row.parent_id) ?? [];
    siblings.push(row);
    repliesByParent.set(row.parent_id, siblings);
  }

  return roots
    .map((root) => ({ ...root, replies: repliesByParent.get(root.id) ?? [] }))
    .reverse();
};
