<template>
  <div class="home-card">
    <div class="card-head flex-between-center">
      <div class="card-head-title">
        <span>{{ title }}</span>
      </div>
      <div class="card-head-other">
        <van-button plain type="primary" round size="mini">完整榜单></van-button>
      </div>
    </div>
    <div class="card-list">
      <slot name="list"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.home-card {
  background: #fff;
  border-radius: 10px;
  padding: 12px 12px 20px;
  margin: 12px;

  .card-head {
    margin-bottom: 16px;

    .card-head-title {
      span {
        font-size: 21px;
        font-weight: 700;
      }
    }
  }
}
</style>
