<script setup lang="ts">
interface Properties {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
}

withDefaults(defineProps<Properties>(), {
  type: 'text',
  placeholder: '',
  required: false
});

const model = defineModel<string>();
</script>

<template>
  <div class="w-full grid gap-3">
    <label class="ml-4 uppercase text-10px text-neutral-300 tracking-widest" :for="id">{{ label }}</label>
    <input
      class="h-12 px-4 border-b border-neutral-800 outline-none text-white transition duration-300 focus:border-amber-400 placeholder:font-normal placeholder:text-neutral-600"
      :id="id" :type="type" :placeholder="placeholder" :required="required" v-model="model" />
  </div>
</template>
