"use client";
import "./styles.scss";
import {
  EditorProvider,
  FloatingMenu,
  BubbleMenu,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { cn } from "@/lib/utils";
import * as Icons from "./Icons";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  return (
    <div className="flex bg-gray-100 p-3">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          "menu-button",
          editor.isActive("bold") ? "is-active" : "",
        )}
      >
        <Icons.Bold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          "menu-button",
          editor.isActive("italic") ? "is-active" : "",
        )}
      >
        <Icons.Italic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={cn(
          "menu-button",
          editor.isActive("underline") ? "is-active" : "",
        )}
      >
        <Icons.Underline />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(
          "menu-button",
          editor.isActive("strike") ? "is-active" : "",
        )}
      >
        <Icons.Strikethrough />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn(
          "menu-button",
          editor.isActive("code") ? "is-active" : "",
        )}
      >
        <Icons.Code />
      </button>
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="menu-button"
      >
        clear marks
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="menu-button"
      >
        clear nodes
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cn(
          "menu-button",
          editor.isActive("paragraph") ? "is-active" : "",
        )}
      >
        paragraph
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          "menu-button",
          editor.isActive("heading", { level: 1 }) ? "is-active" : "",
        )}
      >
        h1
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          "menu-button",
          editor.isActive("heading", { level: 2 }) ? "is-active" : "",
        )}
      >
        h2
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          "menu-button",
          editor.isActive("heading", { level: 3 }) ? "is-active" : "",
        )}
      >
        h3
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cn(
          "menu-button",
          editor.isActive("heading", { level: 4 }) ? "is-active" : "",
        )}
      >
        h4
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cn(
          "menu-button",
          editor.isActive("heading", { level: 5 }) ? "is-active" : "",
        )}
      >
        h5
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cn(
          "menu-button",
          editor.isActive("heading", { level: 6 }) ? "is-active" : "",
        )}
      >
        h6
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "menu-button",
          editor.isActive("bulletList") ? "is-active" : "",
        )}
      >
        bullet list
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "menu-button",
          editor.isActive("orderedList") ? "is-active" : "",
        )}
      >
        ordered list
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          "menu-button",
          editor.isActive("codeBlock") ? "is-active" : "",
        )}
      >
        code block
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          "menu-button",
          editor.isActive("blockquote") ? "is-active" : "",
        )}
      >
        blockquote
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="menu-button"
      >
        horizontal rule
      </button> */}
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="menu-button"
      >
        hard break
      </button> */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="menu-button"
      >
        <Icons.RotateLeft />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="menu-button"
      >
        <Icons.RotateRight />
      </button>
      {/* <button
        type="button"
        onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        className={cn(
          "menu-button",
          editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : "",
        )}
      >
        purple
      </button> */}
    </div>
  );
};

// define your extension array
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Underline.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

const Tiptap = () => {
  return (
    <div className="rounded border !border-gray-300">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
      >
        <FloatingMenu>This is the floating menu</FloatingMenu>
        <BubbleMenu>This is the bubble menu</BubbleMenu>
      </EditorProvider>
    </div>
  );
};

export default Tiptap;
