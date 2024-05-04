import { http } from '@/utils/http'

//发送验证码
export const verifyCodeApi = (data) => {
	return http.get('/code',{params:data})
}

//用户登录接口 （短信验证方式）
export const loginByMobileApi = (data) => {
	return http.post('/login',data)
}

/**
 * 用户登录接口（密码方式）
 */
export const loginByPassword = (data) => {
  return http.post('/login/password', data)
}