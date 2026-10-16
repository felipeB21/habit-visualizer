<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import Sun from "pixelarticons/svg/sun.svg?component";
import Moon from "pixelarticons/svg/moon.svg?component";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <button @click="toggleDark()" aria-label="Change theme">
    <Sun v-if="isDark" class="size-6" />
    <Moon v-else class="size-6" />
  </button>
</template>
