```vue
<script setup lang="ts">
import { ref } from "vue";
import { useHabitsStore } from "../stores/habits";
import Plus from "pixelarticons/svg/plus.svg";
import Trash from "pixelarticons/svg/trash.svg";

const data = useHabitsStore();
const newHabit = ref("");

function handleAddHabit() {
  const name = newHabit.value.trim();

  if (!name) return;

  data.addHabit(name);
  newHabit.value = "";
}

function handleRemoveHabit(id: string) {
  data.removeHabit(id);
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <form class="flex flex-col gap-1" @submit.prevent="handleAddHabit">
      <label for="newHabit" class="font-pixel"> Add a habit </label>

      <div class="flex gap-2">
        <input
          id="newHabit"
          v-model="newHabit"
          type="text"
          class="w-full bg-stone-100 p-3 text-sm outline-0 dark:bg-stone-950"
          placeholder="Make breakfast"
          maxlength="100"
        />

        <button
          type="submit"
          class="flex items-center gap-2 bg-amber-200 p-2 dark:bg-amber-800"
        >
          <Plus class="size-5" />
          Add
        </button>
      </div>
    </form>

    <ul v-if="data.habits.length" class="flex flex-col gap-2">
      <li
        v-for="habit in data.habits"
        :key="habit.id"
        class="flex items-center justify-between gap-3 bg-stone-100 p-3 dark:bg-stone-950"
      >
        <span class="min-w-0 wrap-break-words">{{ habit.name }}</span>

        <button
          type="button"
          class="shrink-0 p-2 hover:bg-stone-200 dark:hover:bg-stone-800"
          :aria-label="`Delete ${habit.name}`"
          :title="`Delete ${habit.name}`"
          @click="handleRemoveHabit(habit.id)"
        >
          <Trash class="size-5 text-red-600" />
        </button>
      </li>
    </ul>

    <p v-else class="text-sm text-stone-500">
      No habits yet. Add your first habit above.
    </p>
  </section>
</template>
```
