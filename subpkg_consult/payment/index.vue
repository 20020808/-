<!-- subpkg_consult/payment/index.vue -->
<script setup>
	import { ref } from 'vue';
    import { createOrderApi, preOrderApi } from '@/services/consult.js'
	import { useConsultStore } from '@/stores/consult.js'
	import { patientDetailApi } from '@/services/patinet';
	import { orderPayApi } from '@/services/payment'
	
	// 患者相关的数据（不具有响应性）
    const { type, illnessType, patientId, illnessInfo, depId } = useConsultStore()
	
	//预支付订单信息
	const preOrderInfo = ref({})
	//患者信息
	const patientDetail = ref({})
	//订单id
	const orderId = ref('')
	//支付组件引用
	const paymentRef = ref()
	
	//生成预支付订单
	async function createPreOrder(){
		const { code,message,data } = await preOrderApi(type,{illnessType})
		if(code != 10000) return uni.utils.toast(message)
		preOrderInfo.value = data
	}
	
	//获取患者信息
	async function getPatientDetail(){
		const { code,message,data } = await patientDetailApi(patientId)
		if(code != 10000) return uni.utils.toast(message)
		patientDetail.value = data
	}
	
	//立即支付
	async function onPaymentButtonClick(){
		
		if(orderId.value != '') return uni.utils.toast('订单不能重复创建')
		
		illnessInfo.pictures= illnessInfo.pictures.map(({ url,uuid }) => {
			return { url:url,id:uuid }
		})
		
		const { code,message,data } = await createOrderApi({
			type,
			illnessType,
			depId,
			patientId,
			...illnessInfo,
		})
		if(code != 10000) return uni.utils.toast(message)
		
		orderId.value = data.id
		//选择支付渠道
		paymentRef.value.open()
		
		const consultStore = useConsultStore()
		
		consultStore.illnessInfo = consultStore.initalValue
		consultStore.type = ''
		consultStore.illnessType = ''
		consultStore.depId = ''
		consultStore.patientId = ''
	}
	
	//当支付弹层关闭时
	function onPaymentClose(){
		const { confirm } = uni.showModal({
		  title: '关闭支付',
		  content: '取消支付将无法获得医生回复，医生接诊名额有限，是否确认关闭？',
		  cancelText: '仍要关闭',
		  cancelColor: '#848484',
		  confirmText: '继续支付',
		  confirmColor: '#16C2A3',
 		})
		
		if(!confirm) paymentRef.value.close()
	}
	
	//支付
	async function onPaymentConfirm({index}){
		if(index === 0)return uni.utils.toast("暂不支持微信支付!")
		
		//调用后端提供的支付接口
		const { code,data,message } = await orderPayApi({
			orderId: orderId.value,
			paymentMethod: index,
			payCallback: 'http://localhost:5173/#/subpkg_consult/room/index',
		})
		
		//接口是否调用成功
		if(code != 10000) return uni.utils.toast(message)
		
		//#// #ifdef H5
		//引导用户支付（地址跳转方式）
		window.location.href = data.payUrl
		// #endif
		
		// #// #ifdef MP-WEIXIN
		//引导用户支付 微信小程序
		wx.requestPayment({
			//4个参数
		})
		// #endif
	}
	
	
	//生成预支付订单信息
	createPreOrder()
	//获取患者信息
	getPatientDetail()
</script>

<template>
  <scroll-page>
    <view class="payment-page">
      <uni-section
        title-font-size="32rpx"
        title-color="#121826"
        padding="30rpx"
        title="图文问诊 49元"
      >
        <uni-list :border="false">
          <uni-list-item
            title="极速问诊"
            note="自动分配医生"
            thumb="/static/uploads/doctor-avatar.jpg"
            thumb-size="lg"
          />
          <uni-list-item title="优惠券" show-arrow :right-text="`-¥${preOrderInfo.couponDeduction}`" />
          <uni-list-item title="积分抵扣">
            <template #footer>
              <view class="uni-list-text-red">-¥{{ preOrderInfo.pointDeduction }}</view>
            </template>
          </uni-list-item>
          <uni-list-item title="实付款">
            <template #footer>
              <view class="uni-list-text-red">¥{{ preOrderInfo.actualPayment }}</view>
            </template>
          </uni-list-item>
        </uni-list>
      </uni-section>

      <view class="dividing-line"></view>

      <uni-section
        title-font-size="32rpx"
        title-color="#121826"
        padding="30rpx"
        title="患者资料"
      >
        <uni-list :border="false">
          <uni-list-item title="患者信息">
            <template #footer>
              <view class="uni-list-text-gray"> {{ patientDetail.name }} | {{ patientDetail.genderValue }} | {{ patientDetail.age }}岁 </view>
            </template>
          </uni-list-item>
          <uni-list-item border title="病情描述" :note="illnessInfo.illnessDesc" />
        </uni-list>
      </uni-section>

      <!-- <view class="payment-agreement">
        <radio color="#20c6b2" value="1" />
        我已同意<text style="color: #20c6b2">支付协议</text>
      </view> -->
    </view>
    <!-- 下一步操作 -->
    <view class="next-step">
      <view class="total-amount">
        合计: <text class="number">¥{{ preOrderInfo.actualPayment }}</text>
      </view>
      <button class="uni-button" @click = "onPaymentButtonClick">立即支付</button>
    </view>
  </scroll-page>
  
  <!-- 支付渠道 -->
  <custom-payment 
	@clone = "onPaymentClose"
	@confirm = "onPaymentConfirm"
	ref = "paymentRef"
	:amount = "preOrderInfo.actualPayment"
	:order-id = "orderId"
  />
</template>

<style lang="scss">
  @import './index.scss';
</style>