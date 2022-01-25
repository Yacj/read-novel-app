<template>
  <van-nav-bar
      :border="false"
      :title="props.title"
      :left-text="props.leftText"
      left-arrow
      @click-left="onClickLeft"
  >
    <template #right>
      <van-icon name="wap-home" class="navBar-icon" @click="goHome"/>
    </template>
  </van-nav-bar>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  leftText: {
    type: String,
    default: '返回'
  }
})
const onClickLeft = () => history.back();
const goHome = () => {
  router.push('/')
}
</script>

<style>
.van-nav-bar {
  background: var(--theme);
}

.van-nav-bar .van-icon {
  color: #fff;
}

.van-nav-bar__title {
  color: #fff;
}

.van-nav-bar__text {
  color: #fff;
}

.navBar-icon {
  font-size: 25px;
}
</style>