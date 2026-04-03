<script setup lang="ts">
import GUIEditor from "../components/GUIEditor.vue";
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDebounceFn } from "@vueuse/core";
import { db } from '@db';

interface Document {
  id: string;
  title: string;
  content: {};
  updated_at: string;
  created_at: string;
}

const route = useRouter();
const document = ref<Document | null>(null);
const content = ref<{} | null>(null);

onMounted(() => {
  fetchDocument();
});

async function fetchDocument() {
  const { data, error } = await db.from('documents')
    .select('*')
    .eq('id', route.currentRoute.value.params.id)
    .single();

  if (!error) {
    document.value = data as Document;
    content.value = JSON.parse(document.value.content as string) as {};
  }
}

async function updateDocumentTitle(title: string) {
  if (document.value) {
    const { error } = await db.from('documents')
      .update({ title })
      .eq('id', document.value.id);

    if (error) {
      console.error("Unable to update title");
    }
  }
}

async function updateDocumentContent(content: string) {
  console.log(content)
  if (document.value) {
    const { error } = await db.from('documents')
      .update({ content })
      .eq('id', document.value.id);

    if (error) {
      console.error("Unable to update content");
    }
  }
}

const debouncedTitleUpdate = useDebounceFn(updateDocumentTitle, 500);
const debouncedContentUpdate = useDebounceFn(updateDocumentContent, 500);

function onTitleInput(e: Event) {
  const element = e.target as HTMLElement;
  debouncedTitleUpdate(element.innerText);
}
</script>

<template>
  <main class="col-span-6 py-12">
    <div class="max-w-xl mx-auto">
      <h1 class="text-4xl tracking-tight outline-none focus:ring-0 text-white" contenteditable="true"
        @input="onTitleInput">
        {{ document?.title }}
      </h1>
      <GUIEditor :content="content" @on-update="debouncedContentUpdate" />
      {{ content }}
    </div>
  </main>
  <aside class="col-span-3">

  </aside>
</template>