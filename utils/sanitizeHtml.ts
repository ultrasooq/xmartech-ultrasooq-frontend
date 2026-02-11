"use client";

/**
 * Very small HTML sanitizer to reduce XSS risk when using dangerouslySetInnerHTML.
 *
 * NOTE:
 * - This is intentionally conservative. It strips all tags except a small
 *   allowlist of formatting tags and removes script/style/event-handler content.
 * - For full production-hardening you may later replace this with a library
 *   like DOMPurify, but this avoids adding new dependencies right now.
 */
const ALLOWED_TAGS = new Set([
  "b",
  "strong",
  "i",
  "em",
  "u",
  "span",
  "p",
  "br",
  "ul",
  "ol",
  "li",
]);

export function sanitizeHtml(input: string | undefined | null): string {
  if (!input) return "";

  // Create a detached DOM element to parse the HTML string.
  if (typeof window === "undefined" || typeof document === "undefined") {
    // On server, fall back to stripping all tags.
    return input.replace(/<[^>]*>/g, "");
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = input;

  const walker = (node: Node) => {
    // Remove <script>, <style>, and their contents entirely.
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node instanceof HTMLElement
    ) {
      const tag = node.tagName.toLowerCase();

      if (tag === "script" || tag === "style") {
        node.remove();
        return;
      }

      // Strip any event handler attributes and javascript: URLs.
      for (const attr of Array.from(node.attributes)) {
        const name = attr.name.toLowerCase();
        const value = attr.value;

        if (name.startsWith("on")) {
          node.removeAttribute(attr.name);
          continue;
        }

        if (
          (name === "href" || name === "src") &&
          typeof value === "string" &&
          value.trim().toLowerCase().startsWith("javascript:")
        ) {
          node.removeAttribute(attr.name);
          continue;
        }
      }

      // If the tag is not in our allowlist, unwrap it (keep its children).
      if (!ALLOWED_TAGS.has(tag)) {
        const parent = node.parentNode;
        if (parent) {
          while (node.firstChild) {
            parent.insertBefore(node.firstChild, node);
          }
          parent.removeChild(node);
          return;
        }
      }
    }

    // Recurse into child nodes (snapshot the list first).
    for (const child of Array.from(node.childNodes)) {
      walker(child);
    }
  };

  walker(wrapper);

  return wrapper.innerHTML;
}

export default sanitizeHtml;
