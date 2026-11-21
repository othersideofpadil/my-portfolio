import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";
import {
  getAvatarUrl,
  getDisplayName,
  groupThreads,
} from "../lib/comments";
import type { Thread } from "../lib/comments";
import type { User } from "@supabase/supabase-js";

const UNAVAILABLE = "Comments are unavailable right now";

/** `threads` is null until the first load finishes. */
export const useComments = (user: User | null) => {
  const [threads, setThreads] = useState<Thread[] | null>(null);

  const load = useCallback(async () => {
    if (!supabase) {
      setThreads([]);
      return;
    }
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading comments:", error);
      setThreads((prev) => prev ?? []);
      return;
    }
    setThreads(groupThreads(data));
  }, []);

  useEffect(() => {
    load();
    if (!supabase) return;

    const channel = supabase
      .channel("comments-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        load,
      )
      .subscribe();

    return () => {
      supabase?.removeChannel(channel);
    };
  }, [load]);

  const post = async (text: string, parentId: number | null = null) => {
    if (!supabase || !user) {
      toast.error(UNAVAILABLE);
      return false;
    }

    const { error } = await supabase.from("comments").insert({
      user_id: user.id,
      user_name: getDisplayName(user),
      user_email: user.email ?? "",
      user_avatar: getAvatarUrl(user),
      comment: text,
      parent_id: parentId,
    });

    if (error) {
      toast.error("Failed to post comment");
      console.error(error);
      return false;
    }

    toast.success(parentId ? "Reply posted!" : "Comment posted!");
    await load();
    return true;
  };

  const remove = async (id: number) => {
    if (!supabase) {
      toast.error(UNAVAILABLE);
      return;
    }

    if (threads?.some((thread) => thread.id === id)) {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("parent_id", id);
      if (error) console.error("Error deleting replies:", error);
    }

    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id)
      .select("id");

    if (error) {
      toast.error("Failed to delete comment");
      console.error(error);
      return;
    }
    if (!data.length) {
      toast.error("Couldn't delete: comment not found or not allowed");
      return;
    }

    toast.success("Comment deleted");
    await load();
  };

  return { threads, post, remove };
};
