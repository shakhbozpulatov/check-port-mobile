<template>
  <div class="min-h-screen flex flex-col justify-between pb-24 bg-[#F8F8F8]">
    <div class="snowflakes" aria-hidden="true">
      <div class="intro">
        <!--        Find 250+ Ready to use demo at-->
        <!--        <a href="https://codeconvey.com">Codeconvey.com</a>-->
      </div>
      <div v-for="(elem, i) in 100" :key="i" class="snowflake">❅</div>

      <div
        v-if="!online"
        class="py-1 md:text-sm text-xs text-center text-white bg-red-500 sticky w-full top-0 z-[300]"
      >
        {{ $t('781') }}
      </div>
      <main class="pb-8">
        <slot />
      </main>
      <LayoutFooter v-if="!layoutStore.closeFooter" class="mt-10" />
      <LayoutLanguageSwitcher />
      <LayoutSidebar />
      <LayoutAuthDialog />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useOnline } from '@vueuse/core'

import { useSwipeNavigate } from '~/composables/useSwipe'

const layoutStore = useLayoutStore()
const online = useOnline()
const shareBtn = () => {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: '',
      url: window.location.href,
    })
  }
}
// useSwipeNavigate()
</script>
<style scoped lang="scss">
.intro,
.intro a {
  color: #fff;
}
/* customizable snowflake styling */
.snowflake {
  color: white;
  font-size: 1em;
  //font-family: Arial;
  text-shadow: 0 0 1px #0074ff;
}

@-webkit-keyframes snowflakes-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@-webkit-keyframes snowflakes-shake {
  0% {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
  50% {
    -webkit-transform: translateX(80px);
    transform: translateX(80px);
  }
  100% {
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
}
@keyframes snowflakes-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@keyframes snowflakes-shake {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(80px);
  }
  100% {
    transform: translateX(0px);
  }
}
.snowflake {
  position: fixed;
  top: -10%;
  z-index: 9999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  -webkit-animation-name: snowflakes-fall, snowflakes-shake;
  -webkit-animation-duration: 10s, 3s;
  -webkit-animation-timing-function: linear, ease-in-out;
  -webkit-animation-iteration-count: infinite, infinite;
  -webkit-animation-play-state: running, running;
  animation-name: snowflakes-fall, snowflakes-shake;
  animation-duration: 10s, 3s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-play-state: running, running;
}
.snowflake:nth-of-type(0) {
  left: 1%;
  -webkit-animation-delay: 0s, 0s;
  animation-delay: 0s, 0s;
}
.snowflake:nth-of-type(1) {
  left: 10%;
  -webkit-animation-delay: 1s, 1s;
  animation-delay: 1s, 1s;
}
.snowflake:nth-of-type(2) {
  left: 20%;
  -webkit-animation-delay: 6s, 0.5s;
  animation-delay: 6s, 0.5s;
}
.snowflake:nth-of-type(3) {
  left: 30%;
  -webkit-animation-delay: 4s, 2s;
  animation-delay: 4s, 2s;
}
.snowflake:nth-of-type(4) {
  left: 40%;
  -webkit-animation-delay: 2s, 2s;
  animation-delay: 2s, 2s;
}
.snowflake:nth-of-type(5) {
  left: 50%;
  -webkit-animation-delay: 8s, 3s;
  animation-delay: 8s, 3s;
}
.snowflake:nth-of-type(6) {
  left: 60%;
  -webkit-animation-delay: 6s, 2s;
  animation-delay: 6s, 2s;
}
.snowflake:nth-of-type(7) {
  left: 70%;
  -webkit-animation-delay: 2.5s, 1s;
  animation-delay: 2.5s, 1s;
}
.snowflake:nth-of-type(8) {
  left: 80%;
  -webkit-animation-delay: 1s, 0s;
  animation-delay: 1s, 0s;
}
.snowflake:nth-of-type(9) {
  left: 90%;
  -webkit-animation-delay: 3s, 1.5s;
  animation-delay: 3s, 1.5s;
}
.snowflake:nth-of-type(10) {
  left: 75%;
  -webkit-animation-delay: 3s, 1.5s;
  animation-delay: 3s, 1.5s;
}
.snowflake:nth-of-type(11) {
  left: 35%;
  -webkit-animation-delay: 3s, 1.5s;
  animation-delay: 3s, 1.5s;
}
/* Demo Purpose Only*/
.demo {
  font-family: 'Raleway', sans-serif;
  color: #fff;
  display: block;
  margin: 0 auto;
  padding: 15px 0;
  text-align: center;
}
.demo a {
  font-family: 'Raleway', sans-serif;
  color: #000;
}
</style>
