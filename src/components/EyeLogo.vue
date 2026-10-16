<template>
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    shape-rendering="crispEdges"
    class="eye"
    aria-hidden="true"
  >
    <g class="eye-lids">
      <!-- contorno -->
      <rect x="8" y="6" width="8" height="2" />
      <rect x="4" y="8" width="4" height="2" />
      <rect x="16" y="8" width="4" height="2" />
      <rect x="2" y="10" width="2" height="4" />
      <rect x="20" y="10" width="2" height="4" />
      <rect x="4" y="14" width="4" height="2" />
      <rect x="16" y="14" width="4" height="2" />
      <rect x="8" y="16" width="8" height="2" />
      <!-- pupila -->
      <rect class="eye-pupil" x="10" y="10" width="4" height="4" />
    </g>
  </svg>
</template>

<style scoped>
.eye-lids,
.eye-pupil {
  transform-box: fill-box;
  transform-origin: center;
}

/* parpadeo: el ojo se aplasta un instante */
.eye-lids {
  animation: blink 5s steps(1) infinite;
}

/* la pupila mira izquierda, derecha y vuelve al centro */
.eye-pupil {
  animation: look 5s steps(1) infinite;
}

@keyframes blink {
  0% {
    transform: scaleY(1);
  }
  92% {
    transform: scaleY(0.17);
  }
  96% {
    transform: scaleY(1);
  }
}

@keyframes look {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-4px);
  }
  40% {
    transform: translateX(4px);
  }
  55% {
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .eye-lids,
  .eye-pupil {
    animation: none;
  }
}
</style>
