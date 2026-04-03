<script setup lang="ts">
import type { User } from '@supabase/supabase-js';
import { onMounted, ref } from 'vue';
import { db } from '../db';

interface DocumentSnapshot {
  id: string;
  title: string;
  updated_at: string;
  is_archived: boolean;
}

const documentCollection = ref<DocumentSnapshot[]>([]);
const user = ref<User | null>(null);

onMounted(async () => {
  const { data, error } = await db.auth.getUser();

  if (data.user) {
    user.value = data.user;
    const res = await getDocumentSnapshotCollection(data.user.id);
    if (res.data) {
      documentCollection.value = res.data as DocumentSnapshot[];
    }
  }
})

function getDocumentSnapshotCollection(id: string) {
  return db.from('documents')
    .select('id, title, updated_at, is_archived')
    .eq('user_id', id)
    .order('updated_at', { ascending: false });
}
</script>

<template>
  <div class="h-screen grid grid-cols-12">
    <aside class="col-span-2 h-full flex flex-col gap-3 border-r border-neutral-800">
      <div class="p-8">
        <div class="relative w-fit">
          <span class="uppercase text-lg text-white font-light tracking-[1.25rem] -mr-[1.25rem]">Illima</span>
          <span class="absolute -top-1 -right-12 text-10px uppercase tracking-tight text-amber-400">
            Alpha
          </span>
        </div>
      </div>
      <nav>
        <ul class="p-8">
          <RouterLink to="/capture">
            Capture
          </RouterLink>
        </ul>
        <div class="h-12 px-8 flex items-center border-b border-neutral-800">
          <h2 class="uppercase text-white tracking-widest text-[10px]">Documents</h2>
        </div>
        <ul class="p-8 grid gap-3">
          <li class="h-10" v-for="doc in documentCollection" :key="doc.id">
            <RouterLink class="w-full" :to="'/studio/' + doc.id" v-slot="{ isActive }">
              <div
                :class="['h-full px-4 flex items-center border-l-2 text-sm transition duration-300', isActive ? 'bg-neutral-800/35 border-amber-400 text-amber-400' : 'border-transparent hover:bg-neutral-800/15']">
                {{ doc.title }}
              </div>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="col-span-8">

    </main>
    <aside class="col-span-2 border-l border-neutral-800">

    </aside>
  </div>
</template>