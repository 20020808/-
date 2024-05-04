import App from './App'
import '@/utils/utils.js'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate, { createPersistedState } from 'pinia-plugin-persistedstate'

import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  
  //创建pinia实例
  const pinia = createPinia()
  pinia.use(
	createPersistedState({
		storage: {
			setItem(key,value) {
				uni.setStorageSync(key,value)
			},
			getItem(key){
				return uni.getStorageInfoSync(key)
			},
		},
	})
  )
  app.use(pinia)
  return {
    app
  }
}