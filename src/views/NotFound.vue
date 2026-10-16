<script setup lang="ts">
import ArrowLeft from "pixelarticons/svg/arrow-left.svg";
</script>

<template>
  <div class="flex flex-col items-center justify-center my-50">
    <h1 class="font-pixel text-5xl">Page Not Found</h1>
    <h2 class="text-4xl font-pixel">404</h2>
    <p>Oops, we couldn't find that page.</p>
    <RouterLink to="/" class="mt-5 flex items-center gap-2">
      <ArrowLeft class="size-6" />
      Go back</RouterLink
    >
  </div>
</template>
