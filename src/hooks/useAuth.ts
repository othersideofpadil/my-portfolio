import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabase";
import { getDisplayName } from "../lib/comments";
import { scrollToSection } from "../lib/scroll";
import type { Provider, User } from "@supabase/supabase-js";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  const hasShownWelcome = useRef(false);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth
      .getSession()
      .then(({ data }) => setUser(data.session?.user ?? null))
      .catch(console.error)
      .finally(() => setLoading(false));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      if (event === "SIGNED_IN" && session?.user && !hasShownWelcome.current) {
        hasShownWelcome.current = true;
        toast.success(`Welcome, ${getDisplayName(session.user)}!`);
        setTimeout(() => scrollToSection("comments"), 100);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (provider: Provider) => {
    if (!supabase) {
      toast.error("Comments are unavailable right now");
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      toast.error("Failed to sign in");
      console.error(error);
    }
  };

  const signOut = async () => {
    await supabase?.auth.signOut();
    toast.success("Signed out successfully");
  };

  return { user, loading, signIn, signOut };
};
