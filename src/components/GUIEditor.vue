<script setup lang="ts">
import * as TipTap from "./TipTap";
import GUIEditorButton from "./GUIEditorButton.vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { BubbleMenu } from "@tiptap/vue-3/menus";
import {
  AlignCenter,
  AlignLeft,
  AlignJustify,
  AlignRight,
  Bold,
  Heading,
  Italic,
  List,
  ListOrdered,
  MessageSquare,
  Strikethrough,
  Underline,
} from "lucide-vue-next";

const props = defineProps<{
  content: {} | undefined | null;
}>();
const emit = defineEmits(["onUpdate"]);

const editor = useEditor({
  content: props.content,
  extensions: [
    TipTap.Bold.configure({
      HTMLAttributes: { class: "font-medium text-white" },
    }),
    TipTap.BubbleMenuExtension,
    TipTap.BulletList.configure({
      HTMLAttributes: { class: "list-disc mx-4" },
    }),
    TipTap.Blockquote.extend({
      content: "(paragraph)+",
    }).configure({
      HTMLAttributes: {
        class:
          "mb-4 px-8 py-4 leading-loose bg-neutral-800/25 border-l-4 border-white [&>p:last-child]:mb-0",
      },
    }),
    TipTap.Document.extend({ content: "block+" }),
    TipTap.Heading.extend({ marks: "" }).configure({
      levels: [2],
      HTMLAttributes: {
        class:
          "text-xl tracking-tight mt-8 mb-4 text-white transition-colors",
      },
    }),
    TipTap.History,
    TipTap.Italic,
    TipTap.ListItem.configure({
      HTMLAttributes: { class: "[&>p]:px-0 [&>ol]:mx-4 [&>ul]:mx-4" },
    }),
    TipTap.OrderedList.configure({
      HTMLAttributes: { class: "list-decimal mx-4" },
    }),
    TipTap.Paragraph.configure({
      HTMLAttributes: {
        class: "mb-4 leading-loose transition-colors",
      },
    }),
    TipTap.Placeholder.configure({
      showOnlyCurrent: false,
      placeholder: (context) => {
        if (context.node.type.name === "paragraph") return "What do you have in mind?";
        if (context.node.type.name === "heading") return "What is the name of this section?";
        return "What do you have in mind?";
      },
    }),
    TipTap.Strike,
    TipTap.Text,
    TipTap.TextAlign.configure({ types: ["paragraph"] }),
    TipTap.Underline.configure({
      HTMLAttributes: { class: "underline-offset-3" },
    }),
  ],
  editorProps: {
    attributes: {
      id: "tip-tap-editor",
      class: "prose prose-lg max-w-none focus:outline-none min-h-[500px] dark:prose-invert",
    },
  },
  onUpdate: ({ editor }) => {
    emit("onUpdate", editor.getJSON());
  },
});
</script>

<template>
  <div class="editor-container relative">
    <BubbleMenu v-if="editor" :editor="editor" :tippy-options="{ duration: 150 }"
      class="p-1 flex items-center gap-0.5 bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden transition-all duration-300">
      <GUIEditorButton title="Bold" :is-active="editor?.isActive('bold')"
        @click="editor?.chain().focus().toggleBold().run()">
        <Bold />
      </GUIEditorButton>
      <GUIEditorButton title="Italic" :is-active="editor?.isActive('italic')"
        @click="editor?.chain().focus().toggleItalic().run()">
        <Italic />
      </GUIEditorButton>
      <GUIEditorButton title="Underline" :is-active="editor?.isActive('underline')"
        @click="editor?.chain().focus().toggleUnderline().run()">
        <Underline />
      </GUIEditorButton>
      <GUIEditorButton title="Strikethrough" :is-active="editor?.isActive('strike')"
        @click="editor?.chain().focus().toggleStrike().run()">
        <Strikethrough />
      </GUIEditorButton>
      <div class="w-[1px] h-4 bg-gray-200 dark:bg-white/10 mx-1"></div>
      <GUIEditorButton title="Align Left" :is-active="editor?.isActive({ textAlign: 'left' })"
        @click="editor?.chain().focus().setTextAlign('left').run()">
        <AlignLeft />
      </GUIEditorButton>
      <GUIEditorButton title="Align Center" :is-active="editor?.isActive({ textAlign: 'center' })"
        @click="editor?.chain().focus().setTextAlign('center').run()">
        <AlignCenter />
      </GUIEditorButton>
      <GUIEditorButton title="Align Right" :is-active="editor?.isActive({ textAlign: 'right' })"
        @click="editor?.chain().focus().setTextAlign('right').run()">
        <AlignRight />
      </GUIEditorButton>
      <GUIEditorButton title="Justify" :is-active="editor?.isActive({ textAlign: 'justify' })"
        @click="editor?.chain().focus().setTextAlign('justify').run()">
        <AlignJustify />
      </GUIEditorButton>
      <div class="w-[1px] h-4 bg-gray-200 dark:bg-white/10 mx-1"></div>
      <GUIEditorButton title="Heading" :is-active="editor?.isActive('heading', { level: 2 })"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()">
        <Heading />
      </GUIEditorButton>
      <GUIEditorButton title="Bullet List" :is-active="editor?.isActive('bulletList')"
        @click="editor?.chain().focus().toggleBulletList().run()">
        <List />
      </GUIEditorButton>
      <GUIEditorButton title="Ordered List" :is-active="editor?.isActive('orderedList')"
        @click="editor?.chain().focus().toggleOrderedList().run()">
        <ListOrdered />
      </GUIEditorButton>
      <GUIEditorButton title="Quote" :is-active="editor?.isActive('blockquote')"
        @click="editor?.chain().focus().toggleBlockquote().run()">
        <MessageSquare />
      </GUIEditorButton>
    </BubbleMenu>
    <EditorContent :editor="editor" />
  </div>
</template>

<style>
#tip-tap-editor h2.is-empty:before,
p.is-empty:before {
  float: left;
  height: 0;
  pointer-events: none;
  content: attr(data-placeholder);
  --uno: "text-neutral-600 transition-colors";
}

/* Fix for the prose-invert default colors */
.dark #tip-tap-editor {
  --tw-prose-body: theme("colors.gray.300");
  --tw-prose-headings: theme("colors.white");
}
</style>
