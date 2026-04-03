<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
@layer base {
  /* Configuración para motores Webkit (Chrome, Safari, Edge) */
  ::-webkit-scrollbar {
    width: 12px;
    /* Ancho sutil */
    height: 12px;
    /* Alto para scroll horizontal */
  }

  ::-webkit-scrollbar-track {
    background: oklch(20.5% 0 0);
    /* Fondo neutral-950 para fundirse con el layout */
  }

  ::-webkit-scrollbar-thumb {
    background: #262626;
    /* neutral-800: Discreción absoluta */
    border-radius: 10px;
    border: 1px solid #0a0a0a;
    /* Crea un efecto de separación elegante */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #fbbf24;
    /* amber-400: Feedback visual activo */
  }

  /* Estandarización para Firefox (Propiedades W3C) */
  * {
    scrollbar-width: 12px;
    scrollbar-color: #262626 oklch(20.5% 0 0);
  }
}
</style>