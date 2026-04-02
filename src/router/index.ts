import { createRouter, createWebHistory } from "vue-router";
import { db } from "../db";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("./GUILandingPage.vue") },
    { path: "/capture", component: () => import("./GUICapturePage.vue") },
    { path: "/studio", component: () => import("./GUIStudioPage.vue") },
    { path: "/document/:id", component: () => import("./GUIDocumentPage.vue") },
    { path: "/auth/sign-in", component: () => import("./GUISignInPage.vue") },
    { path: "/auth/sign-up", component: () => import("./GUISignUpPage.vue") },
  ],
});

router.beforeEach(async (to) => {
  const { data } = await db.auth.getClaims();

  if ((to.path === "/auth/sign-in" || to.path === "/auth/sign-up") && data) {
    return "/studio";
  }

  if (to.path === "/studio" && (data === null || data === undefined)) {
    return "/auth/sign-in";
  }
});

export default router;