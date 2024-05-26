import { http } from '@/utils/http.js'


/**
 * 首页知识列表
 */
export const feedListApi = (data) => {
	return http.get(`/patient/home/knowledge`,{params:data})
}

/**
 * 推荐医生列表
 */
export const doctorListApi = (current = 1, pageSize = 5) => {
  return http.get('/home/page/doc', { params: { current, pageSize } })
}

/**
 * 关注医生
 */
export const followDoctorApi = (id, type = 'doc') => {
  return http.post('/like', { id, type })
}