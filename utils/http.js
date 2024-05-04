import Request from 'luch-request'

const http = new Request({
	baseURL: 'https://consult-api.itheima.net',
	custom:{
		loading:true
	}
})

// 接口白名单
const whiteList = ['/code', '/login', '/login/password']

//请求拦截器
http.interceptors.request.use((config) => {
 // config 即为请求时的参数，包含了请求头等

  if (config.custom.loading) {
    // 显示加载提示
    uni.showLoading({
      title: '正在加载...',
      mask: true,
    })
  }

  // 获取 token
  // const userStore = useUserStore()

  // 默认的请求头
  const defaultHeader = {}
  // 判断是否存在 token 并且不在接口白单当中
  // if (userStore.token && !whiteList.includes(config.url)) {
  //   defaultHeader.Authorization = 'Bearer ' + userStore.token
  // }

  // 让局的头信息覆盖掉全局的头信息
  config.header = {
    ...defaultHeader,
    ...config.header,
  }

  return config
})

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