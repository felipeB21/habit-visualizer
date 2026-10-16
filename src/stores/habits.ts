import { defineStore } from "pinia";
import type { Habit } from "../types/habit";
import { ref, watch } from "vue";

const STORAGE_KEY = "habit-visualizer-habits";

function loadHabits(): Habit[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed as Habit[];
  } catch {
    return [];
  }
}

export const useHabitsStore = defineStore("habits", () => {
  const habits = ref<Habit[]>(loadHabits());

  watch(
    habits,
    (newHabits) => {
      if (typeof window === "undefined") return;

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHabits));
      } catch (error) {
        console.error("Failed to save habits:", error);
      }
    },
    { deep: true },
  );

  function addHabit(name: string) {
    const trimmedName = name.trim();

    if (!trimmedName) return;

    const habit: Habit = {
      id: crypto.randomUUID(),
      name: trimmedName,
      color: "#fff",
      completedDates: [],
      createdAt: new Date().toISOString(),
    };

    habits.value.push(habit);
  }

  function removeHabit(id: string) {
    habits.value = habits.value.filter((habit) => habit.id !== id);
  }

  function toggleHabitCompletion(id: string, date: string) {
    const habit = habits.value.find((habit) => habit.id === id);

    if (!habit) return;

    if (habit.completedDates.includes(date)) {
      habit.completedDates = habit.completedDates.filter(
        (completedDate) => completedDate !== date,
      );
    } else {
      habit.completedDates.push(date);
    }
  }

  return {
    habits,
    addHabit,
    removeHabit,
    toggleHabitCompletion,
  };
});
