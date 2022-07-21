<template>
  <canvas id="game" width="400" height="400"></canvas>
</template>
<script setup lang="ts">
import Viewport from "../viewport/Viewport";
import { onMounted } from "vue";
onMounted(() => {
  const canvas: HTMLCanvasElement = document.getElementById(
    "game"
  ) as HTMLCanvasElement;
  if (!canvas) return console.error("canvas is undefined");
  const viewport = new Viewport(canvas);
  viewport.start();
});
</script>
<style scoped></style>
