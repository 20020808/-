<!-- subpkg_consult/department/index.vue -->
<script setup>
	import { ref,computed } from 'vue'
	import { departmentListApi } from '@/services/consult';

	//科室列表
	const departmentList = ref([])
	//一级科室的索引值
	const tabIndex = ref(0)
	//二级科室数据
	const childDepartmentList = computed(() => {
		return departmentList.value[tabIndex.value]?.child
	})
	//接收地址中的参数
	const props = defineProps({
		type:String,
		illnessType:String,
	})
	
	//切换选择科室
	function onTopDeparmentClick(index){
		tabIndex.value = index
	}
	
	//获取科室列表
	async function getDepartmentList(){
		const {code,message,data} = await departmentListApi()
		if(code != 10000) return uni.utils.toast(message)
		departmentList.value = data
	}
	
	
	//获取科室列表
	getDepartmentList()
</script>

<template>
  <view class="department-page">
    <scroll-view scroll-y class="department-primary">
      <view class="department-item"
		:class = "{active: tabIndex === index}"
		v-for = "(department,index) in departmentList"
		:key = "departmentList.id"
		@click = "onTopDeparmentClick(index)"
		>
		{{ department.name }}
		</view>
      <view class="department-item"></view>
    </scroll-view>
	<scroll-view class="department-secondary">
	      <navigator
	        v-for="childDepartment in childDepartmentList"
	        :key="childDepartment.id"
	        hover-class="none"
	        :url="`/subpkg_consult/description/index?type=${props.type}&illnessType=${props.illnessType}&depId=${childDepartment.id}`"
	        class="department-item"
	      >
	        {{ childDepartment.name }}
	      </navigator>
	    </scroll-view>
  </view>
</template>

<style lang="scss">
  @import './index.scss';
</style>