<script setup lang="ts">
import type { User } from '@supabase/supabase-js';
import { onMounted, ref } from 'vue';
import { db } from '../db';
import { useRouter } from 'vue-router';

interface Capture {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
}

interface DocumentSnapshot {
  id: string;
  title: string;
  updated_at: string;
  is_archived: boolean;
}

const captures = ref<Capture[]>([]);
const documentCollection = ref<DocumentSnapshot[]>([]);
const user = ref<User | null>(null);
const router = useRouter()

onMounted(async () => {
  const { data } = await db.auth.getUser();
  user.value = data.user;

  if (user.value) {
    fetchCaptures();
    fetchDocumentCollection(user.value.id);
  }
});

async function fetchCaptures() {
  const { data, error } = await db
    .from('sparks')
    .select('*')
    .order('created_at', { ascending: false });

  if (!error) captures.value = data || [];
}

async function fetchDocumentCollection(id: string) {
  const { data, error } = await db.from('documents')
    .select('id, title, updated_at, is_archived')
    .eq('user_id', id)
    .order('updated_at', { ascending: false });

  if (!error) documentCollection.value = data || [];
}

async function handleSignOut() {
  await db.auth.signOut();
  router.push('/auth/sign-in');
}
</script>

<template>
  <div class="h-screen grid grid-cols-12">
    <aside class="col-span-3 h-full flex flex-col gap-3 border-r border-neutral-800">
      <div class="sticky top-0 flex flex-col justify-between h-screen">
        <div>
          <div class="p-8">
            <div class="relative w-fit">
              <span class="uppercase text-lg text-white font-light tracking-[1.25rem] -mr-[1.25rem]">Illima</span>
              <span class="absolute -top-1 -right-12 text-[10px] uppercase tracking-tight text-amber-400 font-mono">
                Alpha
              </span>
            </div>
          </div>
          <nav>
            <ul class="p-8">
              <RouterLink to="/app/capture">
                Capture
              </RouterLink>
            </ul>
            <div class="h-12 px-8 flex items-center border-b border-neutral-800">
              <h2 class="uppercase text-white tracking-widest text-[10px]">Documents</h2>
            </div>
            <ul class="p-8 grid gap-3">
              <li class="min-h-10" v-for="doc in documentCollection" :key="doc.id">
                <RouterLink class="w-full" :to="'/app/document/' + doc.id" v-slot="{ isActive }">
                  <div
                    :class="['h-full px-4 flex items-center border-l-2 text-sm transition duration-300', isActive ? 'bg-neutral-800/25 border-amber-400 text-amber-400' : 'border-transparent hover:bg-neutral-800/15']">
                    {{ doc.title }}
                  </div>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
        <div class="p-8 grid gap-3 border-t border-neutral-800">
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-neutral-800 text-amber-400 text-xs font-bold uppercase">
              {{ user?.user_metadata.name?.substring(0, 2) || '??' }}
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-white">
                {{ user?.user_metadata.name || 'guest_user' }}
              </span>
              <span class="text-xs text-neutral-600">
                {{ user?.user_metadata.username || 'no_username' }}
              </span>
            </div>
          </div>
          <button @click="handleSignOut"
            class="h-10 border border-neutral-800 cursor-pointer uppercase font-jet text-xs tracking-widest hover:(text-rose-400 bg-rose-950/10 border-rose-400/10) transition-colors">
            terminate_session
          </button>
        </div>
      </div>
    </aside>
    <RouterView />
  </div>
</template>

<style scoped>
/* Removes the blue outline in Chrome/Safari */
textarea:focus {
  box-shadow: none !important;
}
</style>