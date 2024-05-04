<!-- pages/login/components/mobile.vue -->
<script setup>
import { ref } from 'vue';
import { loginByMobileApi, verifyCodeApi } from '../../../services/user';
import {useUserStore} from '@/stores/user.js'
	
	const userStore = useUserStore()

	const showCountdown = ref(false)
	
	const formRef = ref()
	
	const buttonText = ref('获取验证码')
	
	//是否同意协议
	const isAgree = ref(false)
	
	
	const fromData = ref({
		mobile:'',
		code:''
	})
	
	 // 验证表单数据的规则
	  const formRules = {
		mobile: {
		  rules: [
			{ required: true, errorMessage: '请填写手机号码' },
			{ pattern: '^1\\d{10}$', errorMessage: '手机号码格式不正确' },
		  ],
		},
		code: {
		  rules: [
			{ required: true, errorMessage: '请输入验证码' },
			{ pattern: '^\\d{6}$', errorMessage: '验证码格式不正确' },
		  ],
		},
	  }
	
	//获取验证码
	async function onTextButtonClick(){
		
		try{
			await formRef.value.validateField(['mobile'])
			
			//发送验证码
			const { code,data,message } = await verifyCodeApi({
				mobile:fromData.value.mobile,
				type:'login'
			})
			//判断验证码状态
			if(code != 10000){
				return uni.utils.toast(message)
			}
			showCountdown.value = true
			console.log(code,data,message)
		}catch(e){
			//TODO handle the exception
		}
		
	}
	
	function onCountdownTimeup(){
		showCountdown.value = false
		buttonText.value = '再次获取验证码'
	}
	
	//登录
	async function onFormSubmit(){
		
		if(!isAgree.value) return uni.utils.toast('请先勾选协议!')
		
		try{
			const result = await formRef.value.validate()
			const { code,data,message } = await loginByMobileApi(result)
			if(code != 10000){
				return uni.utils.toast(message)
			}
			//持久化存储token
			userStore.token = data.token
		}catch(e){
			//TODO handle the exception
			console.log(e);
		}
	}
	
	//是否同意协议
	function onAgreeClick(){
		isAgree.value = !isAgree.value
	}
	
	
</script>

<template>
  <uni-forms class="login-form" :model = "fromData"  :rules="formRules" ref = "formRef">
    <uni-forms-item name="mobile">
      <uni-easyinput
        :input-border="false"
        :clearable="false"
        placeholder="请输入手机号"
        placeholder-style="color: #C3C3C5"
		v-model = "fromData.mobile"
      />
    </uni-forms-item>
    <uni-forms-item name="code">
      <uni-easyinput
        :input-border="false"
        :clearable="false"
        placeholder="请输入验证码"
        placeholder-style="color: #C3C3C5"
		v-model = "fromData.code"
      />
	  
	  <view class="text-button" v-if = "showCountdown">
		  <uni-countdown :font-size="25" @timeup = "onCountdownTimeup" color = "#16C2A3" :showDay = "false" :showHour = "false" :showMinute = "false" second="10"></uni-countdown>秒后重新获取
	  </view>
      <text v-else @click="onTextButtonClick" class="text-button">{{ buttonText }}</text>
    </uni-forms-item>

    <view class="agreement">
      <radio @click = "onAgreeClick" :checked="isAgree" color="#16C2A3" />
      我已同意
      <text class="link">用户协议</text>
      及
      <text class="link">隐私协议</text>
    </view>

    <button class="uni-button" @click = "onFormSubmit">登 录</button>
  </uni-forms>
</template>

<script>
  export default {
    options: {
      styleIsolation: 'shared',
    },
  }
</script>

<style lang="scss">
  @import './styles.scss';
</style>