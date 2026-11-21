import { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { ChevronDown, Reply, Trash2 } from "lucide-react";
import { isOwner } from "../../lib/comments";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { cardVariants } from "../ui/card";
import Avatar from "./Avatar";
import CommentComposer from "./CommentComposer";
import type { Comment, Thread } from "../../lib/comments";
import type { User } from "@supabase/supabase-js";

const Badge = ({ accent, children }: { accent?: boolean; children: string }) => (
  <span
    className={cn(
      "rounded-full px-2 py-0.5 text-[10px] font-semibold",
      accent ? "border border-accent/20 bg-accent-soft text-accent" : "bg-paper text-ink-soft",
    )}
  >
    {children}
  </span>
);

const pluralizeReplies = (count: number) => `${count} ${count === 1 ? "reply" : "replies"}`;

type CommentCardProps = {
  comment: Comment;
  user: User | null;
  isReply?: boolean;
  replyCount?: number;
  onReply: () => void;
  onDelete: (id: number) => Promise<void>;
};

const CommentCard = ({ comment, user, isReply = false, replyCount = 0, onReply, onDelete }: CommentCardProps) => {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const mine = user?.id === comment.user_id;
  const canDelete = mine || isOwner(user?.email);
  const createdAt = new Date(comment.created_at);

  const confirmDelete = async () => {
    setDeleting(true);
    await onDelete(comment.id);
    setDeleting(false);
    setConfirming(false);
  };

  return (
    <article className="flex gap-3">
      <Avatar name={comment.user_name} src={comment.user_avatar} size={isReply ? "sm" : "md"} />

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h4 className="max-w-full truncate text-sm font-semibold text-ink">{comment.user_name}</h4>
          {isOwner(comment.user_email) && <Badge accent>Owner</Badge>}
          {mine && <Badge>You</Badge>}
          <time dateTime={comment.created_at} title={createdAt.toLocaleString()} className="text-xs text-ink-mute">
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </time>
        </header>

        <p className="mt-1 text-sm leading-relaxed wrap-break-word whitespace-pre-wrap text-ink">{comment.comment}</p>

        <div className="-ml-3 mt-1 flex flex-wrap items-center">
          {user && (
            <Button variant="ghost" size="sm" onClick={onReply}>
              <Reply aria-hidden />
              Reply
            </Button>
          )}

          {canDelete &&
            (confirming ? (
              <>
                <span className="px-2 text-xs text-ink-soft">
                  {replyCount > 0 ? `Delete with ${pluralizeReplies(replyCount)}?` : "Delete this?"}
                </span>
                <Button variant="danger" size="sm" onClick={confirmDelete} loading={deleting}>
                  {deleting ? "Deleting…" : "Yes, delete"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirming(false)} disabled={deleting}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="danger" size="sm" onClick={() => setConfirming(true)}>
                <Trash2 aria-hidden />
                Delete
              </Button>
            ))}
        </div>
      </div>
    </article>
  );
};

type CommentThreadProps = {
  thread: Thread;
  user: User | null;
  onReply: (text: string, parentId: number) => Promise<boolean>;
  onDelete: (id: number) => Promise<void>;
};

const CommentThread = ({ thread, user, onReply, onDelete }: CommentThreadProps) => {
  // Name to @mention while the reply box is open; null means closed.
  const [mention, setMention] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);
  const count = thread.replies.length;

  const sendReply = async (text: string) => {
    const ok = await onReply(text, thread.id);
    if (ok) {
      setMention(null);
      setExpanded(true);
    }
    return ok;
  };

  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(cardVariants(), "rounded-2xl p-4 sm:p-5")}
    >
      <CommentCard
        comment={thread}
        user={user}
        replyCount={count}
        onReply={() => setMention(thread.user_name)}
        onDelete={onDelete}
      />

      {count > 0 && (
        <Button
          variant="accent"
          size="sm"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          className="mt-2 -ml-3 sm:ml-10"
        >
          <ChevronDown className={cn("transition-transform", !expanded && "-rotate-90")} aria-hidden />
          {expanded ? "Hide" : "Show"} {pluralizeReplies(count)}
        </Button>
      )}

      {expanded && count > 0 && (
        <ul className="mt-3 space-y-4 border-l-2 border-line pl-4 sm:ml-5">
          {thread.replies.map((reply) => (
            <li key={reply.id}>
              <CommentCard
                comment={reply}
                user={user}
                isReply
                onReply={() => setMention(reply.user_name)}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}

      {user && mention !== null && (
        <div className="mt-4 border-l-2 border-accent/40 pl-4 sm:ml-5">
          <CommentComposer
            key={mention}
            autoFocus
            initialValue={`@${mention} `}
            placeholder="Write a reply…"
            submitLabel="Reply"
            onSubmit={sendReply}
            onCancel={() => setMention(null)}
          />
        </div>
      )}
    </motion.li>
  );
};

export default CommentThread;
