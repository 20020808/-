<!-- pages/login/index.vue -->
<script setup>
import { computed, ref } from 'vue';

import customPassword from './components/password.vue'
import customMobile from './components/mobile.vue'
	
  const tabMetas = [
	{ title: '密码登录', subTitle: '验证码登录' },
	{ title: '验证码登录', subTitle: '密码登录' },
  ]
	
	const tabIndex = ref(0)
	
	const tabMeta = computed(() => {
		return tabMetas[tabIndex.value]
	})
	
	function onSubTitleClick(){
		tabIndex.value = Math.abs(tabIndex.value - 1)
	}
	
</script>
<template>
  <view class="user-login">
    <view class="login-type">
      <view class="title">{{ tabMeta.title }}</view>
      <view class="type" @click = "onSubTitleClick">
        <text>{{ tabMeta.subTitle }}</text>
        <uni-icons color="#3c3e42" type="forward" />
      </view>
    </view>
	
	<custom-password v-if = "tabIndex === 0"></custom-password>
	<custom-mobile v-if = "tabIndex === 1"></custom-mobile>
	
  </view>
  <!-- 社交账号登录 -->
  <view class="social-login">
    <view class="legend">
      <text class="text">其它方式登录</text>
    </view>
    <view class="social-account">
      <view class="icon">
        <uni-icons color="#00b0fb" size="30" type="qq" />
      </view>
      <view class="icon">
        <uni-icons color="#fb6622" size="30" type="weibo" />
      </view>
      <view class="icon">
        <uni-icons color="#07C160" size="30" type="weixin" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
	@import './index.scss'
</style>