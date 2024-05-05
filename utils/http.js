import Request from 'luch-request'
import {useUserStore} from '@/stores/user.js'

const http = new Request({
	baseURL: 'https://consult-api.itheima.net',
	custom:{
		loading:true
	}
})

// 接口白名单
const whiteList = ['/code', '/login', '/login/password']

// 请求拦截器
http.interceptors.request.use(
  function (config) {
    // 显示加载状态提示
    if (config.custom.loading) {
      uni.showLoading({ title: '正在加载...', mask: true })
    }

    // 用户相关的数据
    const userStore = useUserStore()

    // 全局默认的头信息（方便以后扩展）
    const defaultHeader = {}
    // 判断是否存在 token 并且不在接口白单当中	
    if (userStore.token && !whiteList.includes(config.url)) {
      defaultHeader.Authorization = 'Bearer ' + userStore.token
    }
		// 合并全局头信息和局部头信息（局部优先级高全局）
    config.header = {
      ...defaultHeader,
      ...config.header,
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

//响应拦截器
http.interceptors.response.use(
	 function ({ data, statusCode }) {
	    // 关闭加载提示
	    uni.hideLoading()
	
	    // 将接口返回的数据返回
	    return data
	  },
	  function (error) {
	    // 关闭加载提示
	    uni.hideLoading()
	
	    // 重新进行登录
	    if (error.statusCode === 401) reLogin()
	
	    return Promise.reject(error)
	  }
)

export { http }