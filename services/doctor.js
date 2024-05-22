import { http } from '@/utils/http.js'


/**
 * 首页知识列表
 */
export const feedListApi = (data) => {
	return http.get(`/patient/home/knowledge`,{params:data})
}