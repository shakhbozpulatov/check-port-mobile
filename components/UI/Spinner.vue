<template>
  <div class="spinner"></div>
</template>
<script setup lang="ts"></script>
<style>
.spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding: 0.5px;
  background: conic-gradient(#0000 10%, #ffffff) content-box;
  -webkit-mask: repeating-conic-gradient(
      #0000 0deg,
      #000 1deg 20deg,
      #0000 21deg 36deg
    ),
    radial-gradient(
      farthest-side,
      #0000 calc(100% - 3.8px),
      #000 calc(100% - 3.8px)
    );
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: spinner-d55elj 1s infinite steps(10);
}

@keyframes spinner-d55elj {
  to {
    transform: rotate(1turn);
  }
}
</style>
