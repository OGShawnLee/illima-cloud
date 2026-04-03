<script setup lang="ts">
import GUIEditor from "../components/GUIEditor.vue";
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDebounceFn } from "@vueuse/core";
import { DocumentDAO, type DocumentShape } from "@business/DocumentDAO";

const route = useRoute();
const document = ref<DocumentShape | null>(null);
const content = ref<{} | null>(null);

onMounted(() => {
  fetchDocument();
});
watch(() => route.params.id, fetchDocument, { immediate: true })

async function fetchDocument() {
  if (typeof route.params.id !== 'string') {
    console.error("Invalid document ID");
    return;
  }

  const { data, error } = await DocumentDAO.getOne(route.params.id as string);

  if (error) {
    console.error("Unable to fetch document"); 
  } else {
    document.value = data as DocumentShape;
    content.value = data.content;
  }
}

async function updateDocumentTitle(title: string) {
  if (document.value) {
    const { error } = await DocumentDAO.updateOneTitle(document.value.id, title);

    if (error) {
      console.error("Unable to update title");
    }
  }
}

async function updateDocumentContent(content: string) {
  if (document.value) {
    const { error } = await DocumentDAO.updateOneContent(document.value.id, content);

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
    <article class="max-w-2xl mx-auto" :key="document?.id">
      <h1 class="mb-12 text-2xl font-medium tracking-tight outline-none focus:ring-0 text-white transition-colors" contenteditable="true"
        @input="onTitleInput">
        {{ document?.title }}
      </h1>
      <GUIEditor v-if="document?.content" :content="document.content" @on-update="debouncedContentUpdate" />
    </article>
  </main>
  <aside class="col-span-3 border-l border-neutral-800">
  
  </aside>
</template>