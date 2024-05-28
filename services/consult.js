import { http } from '@/utils/http.js'

/**
 * 医生科室列表
 */
export const departmentListApi = () => {
	return http.get('/dep/all')
}

/**
 * 生成预支付订单
 */
export const preOrderApi = (type,options = {}) => {
	return http.get(`/patient/consult/order/pre`,{
		params:{
			type,
			...options
		}
	})
}

/**
 * 生成待支付订单
 */
export const createOrderApi = (data) => {
	return http.post(`/patient/consult/order`,data)
}