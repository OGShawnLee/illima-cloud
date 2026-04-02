<script setup lang="ts">
import GUIInputGroup from '../components/GUIInputGroup.vue';
import GUICoorners from '../components/GUICoorners.vue';
import { reactive } from 'vue';
import { db } from '../db';
import { useRouter } from 'vue-router';

interface SignInForm {
  email: string;
  password: string;
}

const form = reactive<SignInForm>({
  email: '',
  password: ''
});
const router = useRouter();

async function onSignIn() {
  const { data } = await db.auth.signInWithPassword({
    email: form.email,
    password: form.password,
  });

  if (data.user) {
    router.push('/capture');
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div class="grid gap-12">
      <div class="relative w-fit mx-auto text-center">
        <span class="text-xl font-light tracking-[1.25rem] -mr-[1.25rem] text-white uppercase">Illima</span>
        <p class="mt-2 text-[10px] uppercase tracking-[0.3em] font-medium leading-relaxed">
          Architect your thoughts
        </p>
        <span class="absolute -top-1 -right-6 text-10px uppercase tracking-tight text-amber-400">
          Alpha
        </span>
      </div>
      <form class="relative border border-neutral-800 p-8 py-12 sm:mx-auto sm:w-full sm:max-w-md grid gap-9"
        @submit.prevent="onSignIn">
        <GUICoorners />
        <header class="grid gap-1.5">
          <h1 class="text-2xl text-white tracking-widest uppercase">Sign In</h1>
          <p class="text-sm">Sign in to your Account to get started.</p>
        </header>
        <GUIInputGroup v-model="form.email" id="email" type="email" label="Email" placeholder="Introduce your Email"
          required />
        <GUIInputGroup v-model="form.password" id="password" type="password" label="Password"
          placeholder="Introduce your Password" required />
        <div class="pt-6 grid gap-6">
          <button
            class="w-full h-14 bg-white border border-transparent outline-none cursor-pointer text-black font-bold tracking-widest uppercase focus:(text-white bg-transparent border-amber-400) transition duration-300 hover:(bg-transparent text-white border-neutral-800)"
            type="submit">
            Sign In
          </button>
          <p class="text-center text-xs uppercase tracking-widest font-medium">
            Don't have an account?
            <RouterLink to="/auth/sign-up" class="text-amber-400 underline underline-offset-4">
              Sign up here
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>