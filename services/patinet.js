import {http} from '@/utils/http.js'

/* 
	添加患者 （家庭档案）
 */
export const addPatientApi = (data) => {
	return http.post('/patient/add',data)
}