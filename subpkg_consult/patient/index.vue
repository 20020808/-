<!-- subpkg_consult/patient/index.vue -->
<script setup>
  import { ref } from 'vue'
  import { patientListApi } from '@/services/patinet.js'
	
  // 侧滑按钮配置
  const swipeOptions = ref([
    {
      text: '删除',
      style: {
        backgroundColor: '#dd524d',
      },
    },
  ])
  
  //卡片的值
  const patientCardIndex = ref(0)
  
  //患者列表数据
  const patientList = ref([])
  
  function onPatientCardClick(index){
	  patientCardIndex.value = index
  }
  
  //获取患者列表数据
  async function getPatientList(){
	  const { code,message,data } = await patientListApi()
	  if(code != 10000) return uni.utils.toast(message)
	  patientList.value = data
  }
  
  getPatientList()
</script>
<template>
  <scroll-page>
    <view class="patient-page">
      <view class="page-header">
        <view class="patient-title"> 请选择患者信息 </view>
        <view class="patient-tips">
          以便医生给出更准确的治疗，信息仅医生可见
        </view>
      </view>
      <uni-swipe-action>
        <uni-swipe-action-item 
			:right-options="swipeOptions"
			v-for = "(patient,index) in patientList"
			:key = "patient.id"
			>
          <view 
				:class = "{active: patientCardIndex === index }" 
				class="archive-card"
				@click = "onPatientCardClick(index)"
				>
            <view class="archive-info">
              <text class="name">{{ patient.name }}</text>
              <text class="id-card">
				   {{ patient.idCard.replace(/^(.{6}).+(.{4})$/, '$1********$2') }}
			  </text>
              <text class="default" v-if = "patient.defaultFlag === 1">
				  默认
			  </text>
            </view>
            <view class="archive-info">
              <text class="gender">{{ patient.genderValue }}</text>
              <text class="age">{{ patient.age }}岁</text>
            </view>
            <navigator
              hover-class="none"
              class="edit-link"
              :url="`/subpkg_archive/add/index?id=${patient.id}`"
            >
              <uni-icons
                type="icon-edit"
                size="20"
                color="#16C2A3"
                custom-prefix="iconfont"
              />
            </navigator>
          </view>
        </uni-swipe-action-item>
      </uni-swipe-action>

      <!-- 添加按钮 -->
      <view v-if="true" class="archive-card">
        <navigator
          class="add-link"
          hover-class="none"
          url="/subpkg_archive/form/index"
        >
          <uni-icons color="#16C2A3" size="24" type="plusempty" />
          <text class="label">添加患者</text>
        </navigator>
      </view>
    </view>
    <!-- 下一步操作 -->
    <view class="next-step">
      <button class="uni-button">
        下一步
      </button>
    </view>
  </scroll-page>
</template>

<style lang="scss">
  @import './index.scss';
</style>