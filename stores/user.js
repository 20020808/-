import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user',() => {
	//存用户登录状态
	const token = ref('')
	
	return { token }
},  
{
    persist: {
		paths:['token']
	},
},)