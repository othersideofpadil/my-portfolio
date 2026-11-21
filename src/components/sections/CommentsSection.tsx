import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Github, LogOut, MessageCircle } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { useAuth } from "../../hooks/useAuth";
import { useComments } from "../../hooks/useComments";
import { getAvatarUrl, getDisplayName } from "../../lib/comments";
import { cn } from "../../lib/utils";
import Avatar from "../comments/Avatar";
import CommentComposer from "../comments/CommentComposer";
import CommentThread from "../comments/CommentThread";
import { Button } from "../ui/button";
import { cardVariants } from "../ui/card";
import Section from "./Section";

const PAGE_SIZE = 5;
const CARD = cn(cardVariants(), "p-5 sm:p-8");

const ThreadSkeleton = () => (
  <div aria-hidden className={cn(cardVariants(), "flex animate-pulse gap-3 rounded-2xl p-5")}>
    <div className="size-10 shrink-0 rounded-full bg-accent-soft" />
    <div className="flex-1 space-y-2.5 pt-1">
      <div className="h-3 w-1/3 rounded bg-accent-soft" />
      <div className="h-3 w-full rounded bg-accent-soft" />
      <div className="h-3 w-2/3 rounded bg-accent-soft" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center rounded-3xl border border-dashed border-line px-6 py-14 text-center">
    <span className="mb-4 grid size-14 place-items-center rounded-full bg-accent-soft text-accent">
      <MessageCircle className="size-7" aria-hidden />
    </span>
    <h4 className="text-lg font-semibold text-ink">No comments yet</h4>
    <p className="mt-1 text-sm text-ink-soft">Be the first to share your thoughts!</p>
  </div>
);

const CommentsSection = () => {
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { threads, post, remove } = useComments(user);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const total = threads?.reduce((sum, thread) => sum + 1 + thread.replies.length, 0) ?? 0;

  return (
    <Section id="comments" index="02" eyebrow="Guestbook" title="Leave a Comment" width="3xl">
      {authLoading ? (
        <div aria-hidden className={cn(CARD, "h-40 animate-pulse")} />
      ) : user ? (
        <div className={CARD}>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <Avatar name={getDisplayName(user)} src={getAvatarUrl(user)} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{getDisplayName(user)}</p>
                <p className="truncate text-xs text-ink-soft">{user.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut aria-hidden />
              Sign out
            </Button>
          </div>

          <CommentComposer placeholder="Share your thoughts…" submitLabel="Post comment" onSubmit={(text) => post(text)} />
        </div>
      ) : (
        <div className={CARD}>
          <h3 className="text-xl font-semibold text-ink">Sign in to join the conversation</h3>
          <p className="mt-1.5 text-sm text-ink-soft">Your name and profile photo are shown with your comment.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={() => signIn("github")}>
              <Github aria-hidden />
              Continue with GitHub
            </Button>
            <Button variant="outline" size="lg" className="flex-1" onClick={() => signIn("google")}>
              <SiGoogle aria-hidden />
              Continue with Google
            </Button>
          </div>
        </div>
      )}

      <div className="mt-10 mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-ink">Comments</h3>
        {total > 0 && (
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent tabular-nums">
            {total}
          </span>
        )}
      </div>

      {threads === null ? (
        <div className="space-y-4">
          <ThreadSkeleton />
          <ThreadSkeleton />
        </div>
      ) : threads.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ul className="space-y-4">
            <AnimatePresence initial={false}>
              {threads.slice(0, visible).map((thread) => (
                <CommentThread key={thread.id} thread={thread} user={user} onReply={post} onDelete={remove} />
              ))}
            </AnimatePresence>
          </ul>

          {threads.length > visible && (
            <div className="mt-6 flex justify-center">
              <Button variant="accent" size="sm" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
                Show {Math.min(PAGE_SIZE, threads.length - visible)} more
              </Button>
            </div>
          )}
        </>
      )}
    </Section>
  );
};

export default CommentsSection;
