<script setup lang="ts">
import GUIEditor from "@components/GUIEditor.vue";
import GUIDocumentCaptureSection from "@components/GUIDocumentCaptureSection.vue";
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDebounceFn } from "@vueuse/core";
import { DocumentDAO, type DocumentShape } from "@business/DocumentDAO";

const route = useRoute();
const document = ref<DocumentShape | null>(null);
const content = ref<{} | null>(null);
const headerRef = ref<HTMLElement | null>(null);

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
  if (headerRef.value) {
    headerRef.value.innerText = element.innerText;
  }
}
</script>

<template>
  <main class="col-span-9 pb-12 xl:col-span-6">
    <header
      class="sticky top-0 z-10 h-16 px-8 flex items-center justify-between border-b border-neutral-800 backdrop-blur-md">
      <div class="flex items-center gap-4">
        <div class="w-1 h-6 bg-amber-400"></div>
        <div class="flex flex-col">
          <span class="uppercase text-white text-xs font-light tracking-widest leading-none" ref="headerRef">
            {{ document?.title || 'loading...' }}
          </span>
        </div>
      </div>
    </header>
    <article class="max-w-lg mx-auto mt-20 xl:max-w-xl 2xl:max-w-2xl" :key="document?.id">
      <h1 class="mb-12 text-3xl tracking-tight outline-none focus:ring-0 text-white transition-colors"
        contenteditable="true" @input="onTitleInput">
        {{ document?.title }}
      </h1>
      <GUIEditor v-if="document?.content" :content="document.content" @on-update="debouncedContentUpdate" />
    </article>
  </main>
  <aside class="hidden h-full p-8 border-l border-neutral-800 xl:(col-span-3 block)">
    <div class="sticky top-8 h-screen">
      <GUIDocumentCaptureSection v-if="document" :document="document" />
    </div>
  </aside>
</template>