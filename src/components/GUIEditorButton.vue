<script setup lang="ts">
const props = defineProps<{
  isActive?: boolean;
  title: string;
}>();

defineEmits(["click"]);
</script>

<template>
  <button class="w-9 h-9 flex items-center justify-center rounded-md transition-all duration-300 shrink-0 group" :class="[
    props.isActive
      ? 'bg-white text-black shadow-sm scale-95'
      : 'hover:bg-white/10 hover:text-neutral-200',
  ]" type="button" :title="props.title" @click="$emit('click', $event)">
    <div class="scale-75 transition-transform group-hover:scale-90">
      <slot />
    </div>
  </button>
</template>
