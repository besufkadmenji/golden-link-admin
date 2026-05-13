"use client";

import { Button, cn } from "@heroui/react";
import { Placeholder } from "@tiptap/extension-placeholder";
import { TextAlign } from "@tiptap/extension-text-align";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useCallback, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useLang } from "@/hooks/useLang";

type FormRichTextEditorProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (html: string) => void;
  isOptional?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
  className?: string;
  dir?: "rtl" | "ltr";
};

const EMPTY_HTML_VALUES = new Set(["", "<p></p>", "<p><br></p>"]);

const normalizeHtml = (html: string) =>
  EMPTY_HTML_VALUES.has(html.trim()) ? "" : html;

export const FormRichTextEditor = ({
  label,
  placeholder,
  value,
  onChange,
  isOptional = false,
  errorMessage,
  readOnly,
  className,
  dir,
}: FormRichTextEditorProps) => {
  const lng = useLang();
  const enOptional = "after:content-['(Optional)']";
  const arOptional = "after:content-['(اختياري)]";
  const optionalClass = lng === "ar" ? arOptional : enOptional;

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false, autolink: true },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: placeholder || "" }),
    ],
    content: value || "",
    editable: !readOnly,
    editorProps: {
      attributes: {
        dir: dir ?? (lng === "ar" ? "rtl" : "ltr"),
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange(normalizeHtml(e.getHTML()));
    },
  });

  useEffect(() => {
    if (!editor) return;
    const current = normalizeHtml(editor.getHTML());
    const next = value ?? "";
    if (next !== current) {
      editor.commands.setContent(next || "", { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;
    editor.setEditable(!readOnly);
  }, [editor, readOnly]);

  return (
    <div dir={dir} className={className}>
      <label
        className={twMerge(
          "text-[#4D5464] dark:text-white text-sm font-semibold leading-5 tracking-tight mb-1.5 inline-block after:text-subTitle after:font-normal after:text-sm after:ms-1 dark:after:text-white/70",
          isOptional && optionalClass,
        )}
      >
        {label}
      </label>

      <div
        className={cn(
          "rounded-lg bg-gray-border dark:bg-dark-gray-2 dark:border-dark-gray-3 border border-gray-border-alt overflow-hidden transition-colors",
          "focus-within:border-app-primary hover:border-app-primary",
          readOnly && "border-gray-border-alt!",
          !!errorMessage && "border-danger",
        )}
      >
        {!readOnly && <EditorToolbar editor={editor} dir={dir} />}
        <EditorContent
          editor={editor}
          className={cn(
            "[&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[180px] [&_.ProseMirror]:p-3",
            "[&_.ProseMirror]:text-secondary dark:[&_.ProseMirror]:text-white",
            "[&_.ProseMirror]:text-sm [&_.ProseMirror]:font-semibold [&_.ProseMirror]:leading-5 [&_.ProseMirror]:tracking-tight",
            "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:my-2",
            "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:my-2",
            "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:my-1.5",
            "[&_p]:my-1",
            "[&_ul]:list-disc [&_ul]:ps-6 [&_ul]:my-1",
            "[&_ol]:list-decimal [&_ol]:ps-6 [&_ol]:my-1",
            "[&_li]:my-0.5",
            "[&_blockquote]:border-s-4 [&_blockquote]:border-gray-border-alt [&_blockquote]:ps-3 [&_blockquote]:italic [&_blockquote]:my-2",
            "[&_a]:text-app-primary [&_a]:underline",
            "[&_hr]:my-3 [&_hr]:border-gray-border-alt",
            "[&_code]:bg-gray-border-alt/30 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded",
            "[&_pre]:bg-dark-gray-2 [&_pre]:text-white [&_pre]:p-3 [&_pre]:rounded-md [&_pre]:my-2 [&_pre]:overflow-x-auto",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:text-[#9ca3af] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-start [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
          )}
        />
      </div>

      {errorMessage && (
        <p className="text-danger text-xs mt-1.5">{errorMessage}</p>
      )}
    </div>
  );
};

type ToolbarButtonProps = {
  active?: boolean;
  disabled?: boolean;
  onPress: () => void;
  label: string;
  children: React.ReactNode;
};

const ToolbarButton = ({
  active,
  disabled,
  onPress,
  label,
  children,
}: ToolbarButtonProps) => (
  <Button
    type="button"
    size="sm"
    isIconOnly
    variant={active ? "flat" : "light"}
    color={active ? "primary" : "default"}
    onPress={onPress}
    isDisabled={disabled}
    aria-label={label}
    title={label}
    className="min-w-8 h-8 rounded-md"
  >
    {children}
  </Button>
);

const Divider = () => (
  <span className="bg-gray-border-alt dark:bg-dark-gray-3 mx-0.5 h-5 w-px" />
);

const EditorToolbar = ({
  editor,
  dir,
}: {
  editor: Editor | null;
  dir?: "rtl" | "ltr";
}) => {
  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="bg-white dark:bg-dark-black border-b border-gray-border-alt dark:border-dark-gray-3 h-10" />
    );
  }

  return (
    <div
      dir={dir}
      className="bg-white dark:bg-dark-black border-b border-gray-border-alt dark:border-dark-gray-3 flex flex-wrap items-center gap-0.5 p-1"
    >
      <ToolbarButton
        label="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onPress={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <span className="text-xs font-bold">H1</span>
      </ToolbarButton>
      <ToolbarButton
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onPress={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <span className="text-xs font-bold">H2</span>
      </ToolbarButton>
      <ToolbarButton
        label="Heading 3"
        active={editor.isActive("heading", { level: 3 })}
        onPress={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <span className="text-xs font-bold">H3</span>
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onPress={() => editor.chain().focus().toggleBold().run()}
      >
        <BoldIcon />
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onPress={() => editor.chain().focus().toggleItalic().run()}
      >
        <ItalicIcon />
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={editor.isActive("underline")}
        onPress={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onPress={() => editor.chain().focus().toggleBulletList().run()}
      >
        <BulletListIcon />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onPress={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <OrderedListIcon />
      </ToolbarButton>
      <ToolbarButton
        label="Quote"
        active={editor.isActive("blockquote")}
        onPress={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <QuoteIcon />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Align left"
        active={editor.isActive({ textAlign: "left" })}
        onPress={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeftIcon />
      </ToolbarButton>
      <ToolbarButton
        label="Align center"
        active={editor.isActive({ textAlign: "center" })}
        onPress={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenterIcon />
      </ToolbarButton>
      <ToolbarButton
        label="Align right"
        active={editor.isActive({ textAlign: "right" })}
        onPress={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRightIcon />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Link"
        active={editor.isActive("link")}
        onPress={setLink}
      >
        <LinkIcon />
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        label="Undo"
        disabled={!editor.can().undo()}
        onPress={() => editor.chain().focus().undo().run()}
      >
        <UndoIcon />
      </ToolbarButton>
      <ToolbarButton
        label="Redo"
        disabled={!editor.can().redo()}
        onPress={() => editor.chain().focus().redo().run()}
      >
        <RedoIcon />
      </ToolbarButton>
    </div>
  );
};

const iconBase =
  "h-4 w-4 stroke-current fill-none stroke-2 [stroke-linecap:round] [stroke-linejoin:round]";

const BoldIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <path d="M6 4h7a4 4 0 0 1 0 8H6z" />
    <path d="M6 12h8a4 4 0 0 1 0 8H6z" />
  </svg>
);

const ItalicIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <line x1="19" y1="4" x2="10" y2="4" />
    <line x1="14" y1="20" x2="5" y2="20" />
    <line x1="15" y1="4" x2="9" y2="20" />
  </svg>
);

const UnderlineIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <path d="M6 4v7a6 6 0 0 0 12 0V4" />
    <line x1="4" y1="21" x2="20" y2="21" />
  </svg>
);

const BulletListIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <line x1="9" y1="6" x2="20" y2="6" />
    <line x1="9" y1="12" x2="20" y2="12" />
    <line x1="9" y1="18" x2="20" y2="18" />
    <circle cx="5" cy="6" r="1" />
    <circle cx="5" cy="12" r="1" />
    <circle cx="5" cy="18" r="1" />
  </svg>
);

const OrderedListIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <line x1="10" y1="6" x2="20" y2="6" />
    <line x1="10" y1="12" x2="20" y2="12" />
    <line x1="10" y1="18" x2="20" y2="18" />
    <path d="M4 6h2v0M4 4v4" />
    <path d="M4 10h2a1 1 0 0 1 0 2H4l2 2H4" />
    <path d="M4 16h2a1 1 0 0 1 0 2H4M4 18h2a1 1 0 0 1 0 2H4" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <path d="M7 7h4v4H7a3 3 0 0 0-3 3" />
    <path d="M15 7h4v4h-4a3 3 0 0 0-3 3" />
  </svg>
);

const AlignLeftIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="14" y2="12" />
    <line x1="4" y1="18" x2="18" y2="18" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="7" y1="12" x2="17" y2="12" />
    <line x1="5" y1="18" x2="19" y2="18" />
  </svg>
);

const AlignRightIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="10" y1="12" x2="20" y2="12" />
    <line x1="6" y1="18" x2="20" y2="18" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.5 1.5" />
    <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1.5-1.5" />
  </svg>
);

const UndoIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <path d="M3 7v6h6" />
    <path d="M3 13a9 9 0 1 0 3-7.7L3 8" />
  </svg>
);

const RedoIcon = () => (
  <svg viewBox="0 0 24 24" className={iconBase}>
    <path d="M21 7v6h-6" />
    <path d="M21 13a9 9 0 1 1-3-7.7L21 8" />
  </svg>
);
