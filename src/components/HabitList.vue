<script setup lang="ts">
import { ref } from "vue";
import { useHabitsStore } from "../stores/habits";
import Plus from "pixelarticons/svg/plus.svg";
import Trash from "pixelarticons/svg/trash.svg";
import Check from "pixelarticons/svg/check.svg";

const data = useHabitsStore();
const newHabit = ref("");

function getTodayDate(): string {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

function isCompletedToday(id: string): boolean {
  const habit = data.habits.find((habit) => habit.id === id);

  return habit?.completedDates.includes(getTodayDate()) ?? false;
}

function handleToggleHabit(id: string) {
  data.toggleHabitCompletion(id, getTodayDate());
}

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
      <label for="newHabit" class="font-pixel">Add new habit</label>

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
          <Plus />
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
        <span
          class="min-w-0 wrap-break-words font-pixel text-xl"
          :class="{ 'text-stone-400 line-through': isCompletedToday(habit.id) }"
        >
          {{ habit.name }}
        </span>

        <div class="flex shrink-0 items-center gap-1">
          <button
            type="button"
            class="p-2 transition-colors"
            :class="
              isCompletedToday(habit.id)
                ? 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'hover:bg-stone-200 dark:hover:bg-stone-800'
            "
            :aria-label="`${
              isCompletedToday(habit.id) ? 'Unmark' : 'Complete'
            } ${habit.name}`"
            :title="
              isCompletedToday(habit.id)
                ? 'Mark as incomplete'
                : 'Mark as completed'
            "
            :aria-pressed="isCompletedToday(habit.id)"
            @click="handleToggleHabit(habit.id)"
          >
            <Check />
          </button>

          <button
            type="button"
            class="p-2 hover:bg-stone-200 dark:hover:bg-stone-800"
            :aria-label="`Delete ${habit.name}`"
            :title="`Delete ${habit.name}`"
            @click="handleRemoveHabit(habit.id)"
          >
            <Trash class="text-red-600" />
          </button>
        </div>
      </li>
    </ul>

    <p v-else class="text-sm text-stone-500">
      No habits yet. Add your first habit above.
    </p>
  </section>
</template>
