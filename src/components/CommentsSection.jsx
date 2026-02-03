import { useState, useEffect, useRef } from "react";
import { MessageCircle, Github } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import CommentItem from "./CommentReply";

const CommentsSection = () => {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const hasScrolledToBottom = useRef(false);

  useEffect(() => {
    // Check current user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Load comments immediately
    loadComments();

    // Subscribe to real-time changes with proper event handling
    const channel = supabase
      .channel("comments-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
        },
        (payload) => {
          console.log("New comment:", payload);
          loadComments();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "comments",
        },
        (payload) => {
          console.log("Comment deleted:", payload);
          loadComments();
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "comments",
        },
        (payload) => {
          console.log("Comment updated:", payload);
          loadComments();
        },
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      subscription.unsubscribe();
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Only scroll to bottom after initial load and when new comments are added
    // Don't scroll on page refresh
    if (hasScrolledToBottom.current && comments.length > 0) {
      scrollToBottom();
    }
  }, [comments]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadComments = async () => {
    // Load parent comments (where parent_id is null)
    const { data: parentComments, error: parentError } = await supabase
      .from("comments")
      .select("*")
      .is("parent_id", null)
      .order("created_at", { ascending: true });

    if (parentError) {
      console.error("Error loading parent comments:", parentError);
      return;
    }

    // Load all replies
    const { data: allReplies, error: repliesError } = await supabase
      .from("comments")
      .select("*")
      .not("parent_id", "is", null)
      .order("created_at", { ascending: true });

    if (repliesError) {
      console.error("Error loading replies:", repliesError);
      return;
    }

    // Group replies by parent_id
    const repliesByParent = {};
    allReplies?.forEach((reply) => {
      if (!repliesByParent[reply.parent_id]) {
        repliesByParent[reply.parent_id] = [];
      }
      repliesByParent[reply.parent_id].push(reply);
    });

    // Attach replies to parent comments
    const commentsWithReplies =
      parentComments?.map((comment) => ({
        ...comment,
        replies: repliesByParent[comment.id] || [],
      })) || [];

    setComments(commentsWithReplies);
  };

  const handleSignIn = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      toast.error("Failed to sign in");
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const commentToPost = replyingTo ? replyText : newComment;

    if (!commentToPost.trim()) return;

    setLoading(true);

    const commentData = {
      user_id: user.id,
      user_name: user.user_metadata.full_name || user.email.split("@")[0],
      user_email: user.email,
      user_avatar: user.user_metadata.avatar_url,
      comment: commentToPost,
      parent_id: replyingTo || null,
    };

    const { error } = await supabase.from("comments").insert([commentData]);

    if (error) {
      toast.error("Failed to post comment");
      console.error(error);
      setLoading(false);
    } else {
      toast.success(replyingTo ? "Reply posted!" : "Comment posted!");
      setNewComment("");
      setReplyText("");
      setReplyingTo(null);
      setLoading(false);

      // Enable auto-scroll for new comments
      hasScrolledToBottom.current = true;

      // Force reload comments immediately
      await loadComments();
    }
  };

  const handleDeleteComment = async (id) => {
    // Hapus replies terlebih dahulu jika ada
    const { error: repliesError } = await supabase
      .from("comments")
      .delete()
      .eq("parent_id", id);

    if (repliesError) {
      console.error("Error deleting replies:", repliesError);
    }

    // Hapus komentar utama
    const { error } = await supabase.from("comments").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete comment");
    } else {
      toast.success("Comment deleted");

      // Force reload comments immediately
      await loadComments();
    }
  };

  const handleReply = (commentId, userName) => {
    setReplyingTo(commentId);
    setReplyText(`@${userName} `);
    // Enable auto-scroll when replying
    hasScrolledToBottom.current = true;
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.section
      id="comments"
      className="py-12 sm:py-16 md:py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 bg-linear-to-r from-black to-gray-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Comments this Portfolio!
        </motion.h2>

        {/* Sign In / Comment Form */}
        {!user ? (
          <div className="bg-white border border-gray-300 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              Sign in to leave a comment
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleSignIn("github")}
                className="flex-1 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Github className="w-5 h-5" />
                Sign in with GitHub
              </button>
              <button
                onClick={() => handleSignIn("google")}
                className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                <SiGoogle className="w-4 h-5 sm:w-3 sm:h-3" />
                Sign in with Google
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={
                    user.user_metadata.avatar_url ||
                    `https://ui-avatars.com/api/?name=${user.email}`
                  }
                  alt={user.email}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    {user.user_metadata.full_name || user.email.split("@")[0]}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
              >
                Sign Out
              </button>
            </div>

            {/* Reply indicator */}
            {replyingTo && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-700">Replying to a comment</p>
                  <button
                    onClick={cancelReply}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitComment}>
              <textarea
                value={replyingTo ? replyText : newComment}
                onChange={(e) =>
                  replyingTo
                    ? setReplyText(e.target.value)
                    : setNewComment(e.target.value)
                }
                placeholder={
                  replyingTo ? "Write your reply..." : "Share your thoughts..."
                }
                rows="3"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-gray-600 focus:bg-white transition-all duration-300 resize-none"
                required
              />
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  disabled={
                    loading || !(replyingTo ? replyText : newComment).trim()
                  }
                  className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading
                    ? "Posting..."
                    : replyingTo
                      ? "Post Reply"
                      : "Post Comment"}
                </button>

                {replyingTo && (
                  <button
                    type="button"
                    onClick={cancelReply}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Comments List - CHAT STYLE */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 h-150 overflow-y-auto">
          {comments.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                No comments yet
              </h3>
              <p className="text-gray-600 text-lg">
                Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  currentUser={user}
                  onDelete={handleDeleteComment}
                  onReply={handleReply}
                  formatDate={formatDate}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default CommentsSection;
