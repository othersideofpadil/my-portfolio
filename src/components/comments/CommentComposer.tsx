import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { MAX_COMMENT_LENGTH } from "../../lib/comments";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Textarea } from "../ui/input";
import type { FormEvent, KeyboardEvent } from "react";

type CommentComposerProps = {
  placeholder: string;
  submitLabel: string;
  initialValue?: string;
  autoFocus?: boolean;
  onSubmit: (text: string) => Promise<boolean>;
  onCancel?: () => void;
};

const CommentComposer = ({
  placeholder,
  submitLabel,
  initialValue = "",
  autoFocus = false,
  onSubmit,
  onCancel,
}: CommentComposerProps) => {
  const [text, setText] = useState(initialValue);
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const value = text.trim();
  // A reply that is only the pre-filled "@name" is not worth posting.
  const canSubmit = !busy && value !== "" && value !== initialValue.trim();
  const nearLimit = text.length >= MAX_COMMENT_LENGTH * 0.9;

  useEffect(() => {
    if (!autoFocus) return;
    const el = ref.current;
    el?.focus();
    el?.setSelectionRange(el.value.length, el.value.length);
  }, [autoFocus]);

  // Grow with the content.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  const submit = async () => {
    if (!canSubmit) return;
    setBusy(true);
    const ok = await onSubmit(value);
    setBusy(false);
    if (ok) setText(initialValue);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      submit();
    } else if (e.key === "Escape" && onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        maxLength={MAX_COMMENT_LENGTH}
        readOnly={busy}
        rows={2}
        className="max-h-60 min-h-20"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-xs text-ink-mute tabular-nums">
          <span className="hidden sm:inline">Ctrl + Enter to send · </span>
          <span className={cn(nearLimit && "font-medium text-destructive")}>
            {text.length}/{MAX_COMMENT_LENGTH}
          </span>
        </p>

        <div className="ml-auto flex items-center gap-2">
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel} disabled={busy}>
              Cancel
            </Button>
          )}
          <Button type="submit" loading={busy} disabled={!canSubmit}>
            {!busy && <SendHorizontal aria-hidden />}
            {busy ? "Posting…" : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentComposer;
