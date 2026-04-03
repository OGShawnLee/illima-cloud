<script setup lang="ts">
import GUIInputGroup from '../components/GUIInputGroup.vue';
import GUICoorners from '../components/GUICoorners.vue';
import { reactive } from 'vue';
import { db } from '../db';
import { useRouter } from 'vue-router';

interface SignUpForm {
  name: string;
  username: string;
  email: string;
  password: string;
}

const form = reactive<SignUpForm>({
  name: '',
  username: '',
  email: '',
  password: ''
});
const router = useRouter();

async function onSignUp() {
  const { data } = await db.auth.signUp({
    email: form.email,
    password: form.password,
    options: {
      data: {
        name: form.name,
        username: form.username
      }
    }
  });

  if (data.user) {
    router.push('/auth/sign-in');
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center">
    <div class="grid gap-12">
      <div class="relative w-fit mx-auto text-center">
        <span class="uppercase text-xl text-white font-light tracking-[1.25rem] -mr-[1.25rem]">Illima</span>
        <span class="absolute -top-1 -right-6 text-10px uppercase tracking-tight text-amber-400">
          Alpha
        </span>
        <p class="mt-2 text-[10px] uppercase tracking-[0.3em] font-medium leading-relaxed">
          Architect your thoughts
        </p>
      </div>
      <form class="relative border border-neutral-800 p-8 py-12 sm:(mx-auto w-full max-w-md) grid gap-9"
        @submit.prevent="onSignUp">
        <GUICoorners />
        <header class="grid gap-1.5">
          <h1 class="text-2xl text-white tracking-widest uppercase">Sign Up</h1>
          <p class="text-sm">Create your Account to get started.</p>
        </header>
        <GUIInputGroup v-model="form.name" id="name" label="Name" placeholder="Introduce your Name" required />
        <GUIInputGroup v-model="form.username" id="username" label="Username" placeholder="Introduce your Username"
          required />
        <GUIInputGroup v-model="form.email" id="email" type="email" label="Email" placeholder="Introduce your Email"
          required />
        <GUIInputGroup v-model="form.password" id="password" type="password" label="Password"
          placeholder="Introduce your Password" required />
        <div class="pt-6 grid gap-6">
          <button
            class="w-full h-14 bg-white border border-transparent outline-none cursor-pointer text-black font-bold tracking-widest uppercase focus:(text-white bg-transparent border-amber-400) transition duration-300 hover:(bg-transparent text-white border-neutral-800)"
            type="submit">
            Continue
          </button>
          <p class="text-center text-xs uppercase tracking-widest font-medium">
            Already have an account?
            <RouterLink to="/auth/sign-in" class="text-amber-400 underline underline-offset-4">
              Sign in here
            </RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>