/**
 * Conservative HTML sanitizer for WooCommerce product descriptions.
 *
 * Keeps only structural tags (paragraphs, lists, tables, headings, emphasis)
 * and drops EVERY attribute, which also scrubs the ChatGPT export artifacts
 * (data-start attributes, avatar divs) present in some legacy descriptions.
 * Headings are stepped down one level so product copy never competes with
 * the page's own h1/h2 hierarchy.
 */

const ALLOWED = new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "ul",
  "ol",
  "li",
  "h3",
  "h4",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
]);

const HEADING_MAP: Record<string, string> = { h1: "h3", h2: "h3", h5: "h4", h6: "h4" };

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|svg|noscript)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (match, rawTag: string) => {
      let tag = rawTag.toLowerCase();
      tag = HEADING_MAP[tag] ?? tag;
      if (!ALLOWED.has(tag)) return " ";
      if (tag === "br") return "<br />";
      return match.startsWith("</") ? `</${tag}>` : `<${tag}>`;
    })
    .replace(/(\s*<br \/>\s*){3,}/g, "<br /><br />")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** True when the sanitized HTML has no meaningful text content. */
export function isEmptyHtml(html: string): boolean {
  return html.replace(/<[^>]+>/g, "").trim().length === 0;
}

/** Wraps plain text (with \n\n paragraph breaks) as simple HTML. */
export function textToHtml(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((para) => `<p>${para.trim().replace(/\n/g, "<br />")}</p>`)
    .join("");
}
