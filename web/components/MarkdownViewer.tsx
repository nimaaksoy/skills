import { renderMarkdown } from "@/lib/markdown";

interface Props {
  source: string;
  className?: string;
}

export function MarkdownViewer({ source, className = "" }: Props) {
  const html = renderMarkdown(source);
  return (
    <div
      className={`prose-skill ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
