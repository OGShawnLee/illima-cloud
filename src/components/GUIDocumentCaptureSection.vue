<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { CaptureDAO, type CaptureShape } from '@business/CaptureDAO';
import type { DocumentShape } from '@business/DocumentDAO';

const props = defineProps<{
  document: DocumentShape;
}>();

const captureCollection = ref<CaptureShape[]>([]);
const captureInput = ref('');
const isSubmitting = ref(false);

onMounted(() => {
  fetchCaptures();
});
watch(() => props.document.id, fetchCaptures, { immediate: true })

async function fetchCaptures() {
  const { data, error } = await CaptureDAO.getAllByDocument(props.document.id);

  if (error) {
    console.error("Unable to fetch captures");
  } else {
    captureCollection.value = data || [];
  }
}

async function createCapture() {
  if (!captureInput.value.trim() || isSubmitting.value) return;

  isSubmitting.value = true;
  const { data, error } = await CaptureDAO.createOneForDocument(props.document.user_id, props.document.id, captureInput.value.trim());

  if (error) {
    console.log("Unable to create capture", error);
  }

  if (!error && data) {
    captureCollection.value.push(data);
    captureInput.value = '';
  }

  isSubmitting.value = false;
}

async function deleteSpark(id: string) {
  const { error } = await CaptureDAO.deleteOne(id);

  if (!error) {
    captureCollection.value = captureCollection.value.filter(capture => capture.id !== id);
  }
}
</script>

<template>
  <div class="grid gap-12">
    <div>
      <h1 class="mb-8 uppercase text-white tracking-widest text-xs">New Capture</h1>
      <div class="grid gap-6">
        <textarea v-model="captureInput" placeholder="Capture a thought..."
          class="w-full min-h-32 bg-transparent border-b border-neutral-800 outline-none resize-none text-lg text-white placeholder:text-neutral-700 focus:border-amber-400"
          @keydown.enter.prevent="createCapture"></textarea>
        <div class="flex justify-between items-center">
          <span class="text-[10px] text-neutral-600 uppercase tracking-widest italic">Enter to capture</span>
          <button @click="createCapture" :disabled="!captureInput.trim() || isSubmitting"
            class="text-[10px] font-bold uppercase tracking-widest text-white hover:text-amber-400 disabled:text-neutral-700 transition-all">
            {{ isSubmitting ? 'Syncing...' : 'Continue' }}
          </button>
        </div>
      </div>
    </div>
    <div class="grid gap-12">
      <div v-for="item in captureCollection" :key="item.id" class="grid gap-3 group">
        <p class="text-neutral-300 leading-relaxed">
          {{ item.content }}
        </p>
        <div class="flex items-center gap-4">
          <span class="text-xs uppercase font-jet transition-colors whitespace-nowrap">
            {{ new Date(item.created_at).toLocaleDateString().replace(/\//g, '.') }} // LOG_ENTRY
          </span>
          <div class="h-px flex-1 bg-neutral-900 group-hover:bg-neutral-800 transition-colors"></div>
          <button @click="deleteSpark(item.id)"
            class="cursor-pointer opacity-0 group-hover:opacity-100 text-xs hover:text-rose-400 uppercase font-jet tracking-tighter transition-all duration-300">
            TERMINATE_SPARK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>