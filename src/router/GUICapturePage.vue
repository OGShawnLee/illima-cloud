<script setup lang="ts">
import type { User } from '@supabase/supabase-js';
import { onMounted, ref, computed } from 'vue';
import { db } from '../db';
import { useRouter } from 'vue-router';

interface Capture {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
}

const captures = ref<Capture[]>([]);
const user = ref<User | null>(null);
const captureInput = ref('');
const isSubmitting = ref(false);
const router = useRouter()

// Computed property to keep newest sparks at the top
const sortedCaptures = computed(() => {
  return [...captures.value].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
});

onMounted(async () => {
  const { data } = await db.auth.getUser();
  user.value = data.user;

  if (user.value) {
    fetchCaptures();
  }
});

async function fetchCaptures() {
  const { data, error } = await db
    .from('sparks')
    .select('*')
    .order('created_at', { ascending: false });

  if (!error) captures.value = data || [];
}

async function createCapture() {
  if (!user.value || !captureInput.value.trim() || isSubmitting.value) return;

  isSubmitting.value = true;
  const { data, error } = await db
    .from('sparks')
    .insert({
      user_id: user.value.id,
      content: captureInput.value.trim()
    })
    .select();

  if (!error && data) {
    captures.value.unshift(data[0]); // Add to top of local state
    captureInput.value = '';
  }

  isSubmitting.value = false;
}

async function deleteSpark(id: number) {
  const { error } = await db.from('sparks').delete().eq('id', id);

  if (!error) {
    captures.value = captures.value.filter(capture => capture.id !== id);
  }
}

async function handleSignOut() {
  await db.auth.signOut();
  router.push('/auth/sign-in');
}
</script>

<template>
  <main class="col-span-6 py-12">
    <div class="max-w-xl mx-auto grid gap-12">
      <div>
        <h1 class="mb-8 uppercase text-white tracking-widest text-xs">New Spark</h1>
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
        <div class="h-12 flex items-center border-b border-neutral-800">
          <h2 class="uppercase text-neutral-500 tracking-widest text-[10px]">Timeline</h2>
        </div>
        <div class="grid gap-12">
          <div v-for="item in sortedCaptures" :key="item.id" class="grid gap-3 group">
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
    </div>
  </main>
</template>

<style scoped>
/* Removes the blue outline in Chrome/Safari */
textarea:focus {
  box-shadow: none !important;
}
</style>