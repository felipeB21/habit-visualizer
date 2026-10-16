<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import ThemeToggle from "./components/ThemeToggle.vue";
import Github from "pixelarticons/svg/github.svg";
import EyeLogo from "./components/EyeLogo.vue";
</script>

<template>
  <div class="max-w-5xl m-auto my-30 p-8">
    <header class="flex items-center justify-between font-pixel">
      <nav class="flex items-center gap-6 text-xl">
        <EyeLogo class="size-6" />
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/habits">Habits</RouterLink>
        <RouterLink to="/settings">Settings</RouterLink>
      </nav>
      <div class="flex gap-6 items-center">
        <ThemeToggle />
        <a href="https://github.com/felipeB21/habit-visualizer" target="_blank">
          <Github class="size-6" />
        </a>
      </div>
    </header>

    <main class="my-10 font-sans">
      <RouterView />
    </main>
  </div>
</template>
