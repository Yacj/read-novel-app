<template>
  <van-row type="flex" justify="center" class="line">
    <van-col span="3">&nbsp</van-col>
    <van-col span="18">
      <van-cell-group>
        <van-field placeholder="请输入用户名" type="text" v-model="my.username" left-icon="manager"/>
      </van-cell-group>
      <van-cell-group>
        <van-field placeholder="请输入密码" type="password" v-model="my.password" left-icon="lock"/>
      </van-cell-group>
    </van-col>
    <van-col span="3">&nbsp</van-col>
  </van-row>
</template>

<script setup>
import {ref} from "vue";

const my = ref({
  username: '',
  password: ''
})
</script>

<style scoped>

</style>