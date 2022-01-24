<template>
  <transition name="fade">
    <div class="go-top flex-center" @click="goTop" v-if="showGoTop">
      <van-icon name="arrow-up" color="#000"/>
    </div>
  </transition>
</template>

<script setup>
import {getCurrentInstance, onMounted, onUnmounted, ref} from "vue";

const showGoTop = ref(false)
let {proxy} = getCurrentInstance();

function handleScroll() {
  const scrollTop = window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
  showGoTop.value = scrollTop > 30
  proxy.scrollTop = scrollTop
}

const goTop = () => {
  let timer = setInterval(() => {
    let ispeed = Math.floor(-proxy.scrollTop / 10);
    document.documentElement.scrollTop = document.body.scrollTop =
        proxy.scrollTop + ispeed;
    if (proxy.scrollTop === 0) {
      clearInterval(timer);
    }
  }, 10);
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  document.removeEventListener("scroll", handleScroll);
})
</script>

<style scoped lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.go-top {
  width: 41px;
  height: 41px;
  background: #fff;
  border: 1px solid #d9d9d9;
  position: fixed;
  border-radius: 50%;
  bottom: 100px;
  right: 15px;

  i {
    font-size: 20px;
  }
}
</style>