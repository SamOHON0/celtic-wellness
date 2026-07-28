import Link from "next/link";
import type { ReactNode } from "react";
import type { PostBlock } from "@/lib/posts";

/** Renders paragraphs with [text](/path) inline links. */
function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <Link
        key={key++}
        href={match[2]}
        className="font-medium text-pine-700 underline underline-offset-2 hover:text-pine-600"
      >
        {match[1]}
      </Link>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="max-w-[68ch]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-10 text-2xl font-bold tracking-tight first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-8 text-xl font-semibold tracking-tight">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-3 pl-5">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="list-disc leading-relaxed text-ink-soft"
                  >
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={i} className="mt-5 leading-relaxed text-ink-soft">
                {renderInline(block.text)}
              </p>
            );
        }
      })}
    </div>
  );
}
