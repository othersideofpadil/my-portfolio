import { useState } from "react";
import { cn } from "../../lib/utils";

const SIZES = { sm: "size-8 text-xs", md: "size-10 text-sm" } as const;

type AvatarProps = {
  name: string;
  src: string | null;
  size?: keyof typeof SIZES;
};

const Avatar = ({ name, src, size = "md" }: AvatarProps) => {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={cn("shrink-0 rounded-full object-cover", SIZES[size])}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-accent-soft font-semibold text-accent",
        SIZES[size],
      )}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
};

export default Avatar;
