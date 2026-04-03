<script setup lang="ts">
import GUILogo from '@components/GUILogo.vue';

const features = [
  {
    title: "Cloud-Native",
    description: "Instant persistence with Supabase. Your thoughts are synced across devices the moment they strike."
  },
  {
    title: "Zen Architecture",
    description: "A distraction-free environment inspired by Stoicism and minimalism. No notifications, no bloat."
  },
  {
    title: "The Spark System",
    description: "Capture wild thoughts and link them to documents instantly. A centralized vault for ephemeral insights."
  }
];
</script>
<template>
  <div>
    <nav class="sticky top-0 z-50 w-full backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <GUILogo />
        <div class="flex items-center gap-8">
          <RouterLink to="/auth/sign-up"
            class="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition-colors">
            Sign Up
          </RouterLink>
        </div>
      </div>
    </nav>
    <section class="relative pt-32 pb-20 px-6 border-b border-neutral-900 overflow-hidden">
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-5xl md:text-7xl font-light leading-tight mb-6">
          The workspace for <br />
          <span class="italic font-serif text-white">digital ephemeralism.</span>
        </h2>
        <p class="text-sm md:text-base text-neutral-500 uppercase tracking-[0.4em] mb-12">
          Architect your thoughts. Capture the spark.
        </p>
        <div class="flex justify-center">
          <div class="group relative group inline-block">
            <div
              class="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-amber-400 group-focus:border-amber-400 transition-300">
            </div>
            <div
              class="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-amber-400 group-focus:border-amber-400 transition-300">
            </div>
            <div
              class="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-transparent group-hover:border-amber-400 group-focus:border-amber-400 transition-300">
            </div>
            <div
              class="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-amber-400 group-focus:border-amber-400 transition-300">
            </div>
            <RouterLink
              class="h-14 px-8 flex items-center justify-center bg-white border border-transparent outline-none text-black uppercase font-bold tracking-widest focus:(bg-transparent text-white border-amber-400) hover:(bg-transparent text-white) transition duration-300"
              to="/auth/sign-up">
              Start Building
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div v-for="feature in features" :key="feature.title"
          class="relative p-8 border border-neutral-900 bg-neutral-900/30 hover:bg-neutral-900/50 transition-colors group">
          <div
            class="absolute -top-px -left-px w-4 h-4 border-t border-l border-neutral-700 group-hover:border-amber-400 transition-colors">
          </div>
          <div
            class="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-neutral-700 group-hover:border-amber-400 transition-colors">
          </div>
          <h3 class="text-amber-400 text-xs uppercase tracking-[0.3em] mb-4">{{ feature.title }}</h3>
          <p class="text-neutral-300 text-sm leading-relaxed font-light">
            {{ feature.description }}
          </p>
        </div>

      </div>
    </section>

    <footer class="py-12 border-t border-neutral-900 px-6 text-center">
      <p class="text-[10px] text-neutral-600 uppercase tracking-widest">
        Illima Alpha &copy; 2026
      </p>
    </footer>
  </div>
</template>
