<script setup lang="ts">
import { computed, ref } from "vue";
import { useHabitsStore } from "../stores/habits";

const habitsStore = useHabitsStore();

const year = new Date().getFullYear();

const totalDays = new Date(year, 1, 29).getDate() === 29 ? 366 : 365;

const startDay = (new Date(year, 0, 1).getDay() + 6) % 7;

const weekDays = [
  { label: "Mon", row: 0 },
  { label: "Wed", row: 2 },
  { label: "Fri", row: 4 },
];

const hoveredDay = ref<{
  label: string;
  completedCount: number;
  x: number;
  y: number;
  placement: "above" | "below";
} | null>(null);

function getDateKey(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getCompletedCount(date: Date): number {
  const dateKey = getDateKey(date);

  return habitsStore.habits.filter((habit) =>
    habit.completedDates.includes(dateKey),
  ).length;
}

const totalCompletions = computed(() => {
  const today = new Date();
  const yearAgo = new Date(today);
  yearAgo.setFullYear(today.getFullYear() - 1);

  return habitsStore.habits.reduce((total, habit) => {
    const datesInRange = habit.completedDates.filter((date) => {
      const completedDate = new Date(`${date}T00:00:00`);

      return completedDate >= yearAgo && completedDate <= today;
    });

    return total + datesInRange.length;
  }, 0);
});

function getDayColor(count: number): string {
  if (count === 0) {
    return "bg-gray-200 dark:bg-gray-800";
  }

  if (count === 1) {
    return "bg-green-200 dark:bg-green-900";
  }

  if (count === 2) {
    return "bg-green-400 dark:bg-green-700";
  }

  if (count === 3) {
    return "bg-green-500 dark:bg-green-600";
  }

  return "bg-green-700 dark:bg-green-400";
}

function showTooltip(event: MouseEvent, label: string, completedCount: number) {
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();

  const tooltipHeight = 65;
  const showBelow = rect.top < tooltipHeight + 16;

  hoveredDay.value = {
    label,
    completedCount,
    x: Math.max(8, Math.min(rect.left + rect.width / 2, window.innerWidth - 8)),
    y: showBelow ? rect.bottom + 8 : rect.top - 8,
    placement: showBelow ? "below" : "above",
  };
}

function hideTooltip() {
  hoveredDay.value = null;
}

const days = computed(() => {
  return Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(year, 0, index + 1);

    return {
      date,
      key: date.getTime(),
      label: date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      month: date.toLocaleDateString("en-US", {
        month: "short",
      }),
      completedCount: getCompletedCount(date),
    };
  });
});

const months = computed(() => {
  return days.value
    .filter((day) => day.date.getDate() === 1)
    .map((day) => ({
      label: day.month,
      key: day.key,
      week: Math.floor(
        (day.date.getTime() - new Date(year, 0, 1).getTime()) /
          (7 * 24 * 60 * 60 * 1000),
      ),
    }));
});
</script>

<template>
  <div class="my-10 flex flex-col items-center justify-center overflow-x-auto">
    <div class="w-max">
      <p class="mb-2">
        {{ totalCompletions }}
        {{ totalCompletions === 1 ? "habit completion" : "habit completions" }}
        in the last year
      </p>

      <div
        class="flex w-max gap-2 rounded-sm bg-amber-50/10 p-4 dark:bg-amber-950/10"
      >
        <div class="grid shrink-0 grid-rows-7 gap-1 pt-6">
          <span
            v-for="day in weekDays"
            :key="day.label"
            class="flex h-3 items-center text-[10px] text-gray-500"
            :style="{ gridRow: day.row + 1 }"
          >
            {{ day.label }}
          </span>
        </div>

        <div>
          <div class="relative mb-2 h-4">
            <span
              v-for="month in months"
              :key="month.key"
              class="absolute text-[10px] text-gray-500"
              :style="{ left: `${month.week * 16}px` }"
            >
              {{ month.label }}
            </span>
          </div>

          <div class="grid auto-cols-3 grid-flow-col grid-rows-7 gap-1">
            <div v-for="n in startDay" :key="`empty-${n}`" class="size-3"></div>

            <div
              v-for="day in days"
              :key="day.key"
              class="group relative size-3 rounded-sm transition-colors hover:ring-2 hover:ring-gray-400 dark:hover:ring-gray-500"
              :class="getDayColor(day.completedCount)"
              @mouseenter="showTooltip($event, day.label, day.completedCount)"
              @mouseleave="hideTooltip"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <div
      v-if="hoveredDay"
      class="pointer-events-none fixed z-9999 w-max rounded-md border border-amber-700 bg-amber-950 px-3 py-2 text-xs text-white shadow-lg"
      :style="{
        left: `${hoveredDay.x}px`,
        top: `${hoveredDay.y}px`,
        transform:
          hoveredDay.placement === 'above'
            ? 'translate(-50%, -100%)'
            : 'translate(-50%, 0)',
      }"
    >
      <p class="font-medium">{{ hoveredDay.label }}</p>

      <p class="mt-1 text-gray-400">
        {{ hoveredDay.completedCount }}
        {{ hoveredDay.completedCount === 1 ? "habit" : "habits" }}
        completed
      </p>
    </div>
  </Teleport>
</template>
