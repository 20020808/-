import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user',() => {
	//存用户登录状态
	const token = ref('')
	
	//默认跳转到首页面
	const recirectURL = ref("/pages/index/index")
	//跳转页面方式
	const openType = ref('switchTab')
	
	return { token, recirectURL, openType }
},  
{
    persist: {
		paths:['token', 'recirectURL', 'openType']
	},
},)