<template>
  <div class="login">
    <div class="login-head flex align-center">
      欢迎登录小说阅读网
    </div>
    <div class="login-wrap">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="username"
              name="用户名"
              label=""
              placeholder="用户名"
              left-icon="manager"
              clearable
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="password"
              :type="pwd.type"
              name="密码"
              label=""
              placeholder="密码"
              left-icon="lock"
              :right-icon="pwd.icon"
              :rules="[{ required: true, message: '请填写密码' }]"
              @click-right-icon="pwdCheck"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useUserStore} from "../../store/modules";
import {Toast} from "vant";
import {useRouter} from 'vue-router'

const userStore = useUserStore()
const username = ref('');
const password = ref('');
const router = useRouter()
const onSubmit = (values) => {
  userStore.login(values).then(res => {
    router.push('/user')
  }).catch(err => {
    Toast.fail("登陆失败")
  })
};
const pwd = ref({
  icon: 'closed-eye',
  type: 'password',
})
const pwdCheck = () => {
  pwd.value.icon = pwd.value.icon === 'closed-eye' ? 'eye-o' : 'closed-eye'
  pwd.value.type = pwd.value.type === 'password' ? 'text' : 'password'
}
</script>

<style scoped lang="scss">
::v-deep(.van-field__left-icon) {
  margin-right: 25px;

  i {
    font-size: 20px !important;
  }
}

::v-deep(.van-cell) {
  margin-bottom: 15px;
  background: #f1f1f1;
  border-radius: 5px !important;
}

.login {
  width: 100%;
  height: 100vh;
  background: #fff;

  .login-head {
    background: var(--theme);
    width: 100%;
    height: 90px;
    padding: 0 12.5px;
    font-size: 17px;
    color: #fff;
  }

  .login-wrap {
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: 17.5px 17.5px 0 0;
    background: #ffff;
    padding: 50px 10px 27px 10px;
    margin-top: -25px;
  }
}
</style>