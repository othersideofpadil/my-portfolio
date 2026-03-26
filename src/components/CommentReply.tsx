import { Trash2, Reply } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { SyntheticEvent } from "react";

type CommentReplyItem = {
  id: number;
  user_id: string;
  user_name: string;
  user_email?: string | null;
  user_avatar: string | null;
  comment: string;
  created_at: string;
};

type CommentWithReplies = CommentReplyItem & {
  replies: CommentReplyItem[];
};

type CurrentUser = {
  id: string;
  email?: string | null;
  user_metadata?: {
    avatar_url?: string;
    picture?: string;
    photo_url?: string;
    profile_image_url?: string;
  };
} | null;

type CommentItemProps = {
  comment: CommentWithReplies;
  currentUser: CurrentUser;
  onReply: (commentId: number, userName: string) => void;
  onDelete: (id: number) => void;
};

const PORTFOLIO_OWNER_EMAIL = "padilajalah88@gmail.com";

const isPortfolioOwner = (email?: string | null) =>
  (email || "").trim().toLowerCase() === PORTFOLIO_OWNER_EMAIL;

const getCurrentUserAvatar = (currentUser: CurrentUser): string | null => {
  if (!currentUser) return null;

  return (
    currentUser.user_metadata?.avatar_url ||
    currentUser.user_metadata?.picture ||
    currentUser.user_metadata?.photo_url ||
    currentUser.user_metadata?.profile_image_url ||
    null
  );
};

const CommentItem = ({
  comment,
  currentUser,
  onReply,
  onDelete,
}: CommentItemProps) => {
  const isCurrentUser = currentUser?.id === comment.user_id;
  const currentUserIsOwner = isPortfolioOwner(currentUser?.email);
  const canDeleteMainComment = isCurrentUser || currentUserIsOwner;
  const hasReplies = comment.replies && comment.replies.length > 0;

  // Format timestamp
  const timeAgo = formatDistanceToNow(new Date(comment.created_at), {
    addSuffix: true,
  });

  return (
    <div className="space-y-3">
      {/* Main Comment */}
      <div
        className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
      >
        {/* Avatar */}
        <img
          src={
            comment.user_avatar ||
            (isCurrentUser ? getCurrentUserAvatar(currentUser) : null) ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user_name)}&background=${isCurrentUser ? "000" : "666"}&color=fff`
          }
          alt={comment.user_name}
          className="w-10 h-10 rounded-full border-2 border-gray-300 shrink-0"
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user_name)}&background=${isCurrentUser ? "000" : "666"}&color=fff`;
          }}
        />

        {/* Comment Content */}
        <div
          className={`flex-1 max-w-[75%] ${isCurrentUser ? "items-end" : "items-start"} flex flex-col`}
        >
          {/* User Name & Time */}
          <div
            className={`flex items-center gap-2 mb-1 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
          >
            <span className="font-semibold text-sm text-gray-900">
              {isCurrentUser ? "You" : comment.user_name}
            </span>
            {isPortfolioOwner(comment.user_email) && (
              <span className="rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                Owner
              </span>
            )}
            <span className="text-xs text-gray-500">{timeAgo}</span>
          </div>

          {/* Comment Bubble */}
          <div
            className={`px-4 py-3 rounded-2xl wrap-break-word ${
              isCurrentUser
                ? "bg-black text-white rounded-br-sm"
                : "bg-gray-800 text-white rounded-bl-sm"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {comment.comment}
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex items-center gap-3 mt-2 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
          >
            {!isCurrentUser && currentUser && (
              <button
                onClick={() => onReply(comment.id, comment.user_name)}
                className="text-xs text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 transition-colors"
              >
                <Reply className="w-3 h-3" />
                Reply
              </button>
            )}
            {canDeleteMainComment && (
              <button
                onClick={() => onDelete(comment.id)}
                className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {hasReplies && (
        <div className="ml-12 space-y-3 border-l-2 border-gray-200 pl-4">
          {comment.replies.map((reply) => {
            const isReplyByCurrentUser = currentUser?.id === reply.user_id;
            const canDeleteReply = isReplyByCurrentUser || currentUserIsOwner;
            const replyTimeAgo = formatDistanceToNow(
              new Date(reply.created_at),
              {
                addSuffix: true,
              },
            );

            return (
              <div
                key={reply.id}
                className={`flex gap-3 ${isReplyByCurrentUser ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Reply Avatar */}
                <img
                  src={
                    reply.user_avatar ||
                    (isReplyByCurrentUser
                      ? getCurrentUserAvatar(currentUser)
                      : null) ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(reply.user_name)}&background=${isReplyByCurrentUser ? "000" : "666"}&color=fff`
                  }
                  alt={reply.user_name}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 shrink-0"
                  onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(reply.user_name)}&background=${isReplyByCurrentUser ? "000" : "666"}&color=fff`;
                  }}
                />

                {/* Reply Content */}
                <div
                  className={`flex-1 max-w-[70%] ${isReplyByCurrentUser ? "items-end" : "items-start"} flex flex-col`}
                >
                  {/* Reply User Name & Time */}
                  <div
                    className={`flex items-center gap-2 mb-1 ${isReplyByCurrentUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="font-semibold text-xs text-gray-900">
                      {isReplyByCurrentUser ? "You" : reply.user_name}
                    </span>
                    {isPortfolioOwner(reply.user_email) && (
                      <span className="rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                        Owner
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {replyTimeAgo}
                    </span>
                  </div>

                  {/* Reply Bubble - White background with black text */}
                  <div
                    className={`px-4 py-2 rounded-2xl wrap-break-word ${
                      isReplyByCurrentUser
                        ? "bg-white text-black border border-gray-300 rounded-br-sm"
                        : "bg-white text-black border border-gray-300 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {reply.comment}
                    </p>
                  </div>

                  {/* Reply Delete Button */}
                  {canDeleteReply && (
                    <button
                      onClick={() => onDelete(reply.id)}
                      className={`text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 mt-2 transition-colors cursor-pointer ${isReplyByCurrentUser ? "self-end" : "self-start"}`}
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
