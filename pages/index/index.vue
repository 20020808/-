<script setup>
  import { ref,computed } from 'vue'
  import feedList from './components/feed-list.vue'
  import { feedListApi,doctorListApi } from '@/services/doctor';
  import doctorList from './components/doctor-list.vue'
  // 获取安全区域数据
  const { safeAreaInsets } = uni.getSystemInfoSync()

  // 标签页索引值
  const tabIndex = ref(0)

	// 标签页数据
  const feedTabs = ref([
    {
      label: '推荐',
      type: 'recommend',
      current: 1,
      hasMore: true,
      list: [],
      rendered: true,
    },
    {
      label: '关注',
      type: 'like',
      current: 1,
      hasMore: true,
      list: [],
      rendered: false,
    },
    {
      label: '减脂',
      type: 'fatReduction',
      current: 1,
      hasMore: true,
      list: [],
      rendered: false,
    },
    {
      label: '饮食',
      type: 'food',
      current: 1,
      hasMore: true,
      list: [],
      rendered: false,
    },
  ])
  
  //标签页的类型
  const feedType = computed(() => feedTabs.value[tabIndex.value].type)
  
  //标签页的页码
  const feedCurrent = computed(() => feedTabs.value[tabIndex.value].current)
  
  //每次请求多少条
  const feedPageSize = ref(5)
  
  //医生列表
  const doctorItems = ref([])

  // 切换标签页
  function onFeedTabChange({ index }) {
    tabIndex.value = index
	
	//对请求进行判断 如果已经请求过了 不用再请求
	if(!feedTabs.value[index].rendered) getFeedList()
	
    // 每个标签页只被初始一次
    feedTabs.value[index].rendered = true
  }
  
  //获取知识列表
  async function getFeedList(){
	  //调用接口获取知识列表
	  const { code,data,message } = await feedListApi({
		  type: feedType.value,
		  current: feedCurrent.value,
		  pageSize: feedPageSize.value
	  })
	  //列表中原来的数据
	  const list = feedTabs.value[tabIndex.value].list 
	  //追加方式渲染新请求来的数据
	  feedTabs.value[tabIndex.value].list = [...list,...data.rows]
	  //过滤掉html标签
	  data.rows.forEach((row) => {
		  row.content = row.content.replace(/<[^>]+>/g, '')
	  })
	  
	  //列表数据的页码
	  const current = feedTabs.value[tabIndex.value].current
	  //更新标签码
	  feedTabs.value[tabIndex.value].current = current + 1
	  //判断是否有更多数据
	  feedTabs.value[tabIndex.value].hasMore = current + 1 <= data.pageTotal
  }
  
  //滚动加载更多数据
  function onScrollToLower(){
	  //hasMore为true时才去请求
	  if(feedTabs.value[tabIndex.value].hasMore) getFeedList()
  }
  
  //获取医生列表
  async function getDoctorList(){
	  const { code,message,data } = await doctorListApi()
	  console.log('code',code);
	  if(code != 10000) return uni.utils.toast(message)
	  doctorItems.value = data.rows   
  }

	getFeedList()
	//获取医生列表
	getDoctorList()
</script>

<template>
  <scroll-page @scrolltolower = "onScrollToLower">
    <view
      class="index-page"
      :style="{ backgroundPositionY: -48 + safeAreaInsets.top + 'px' }"
    >
      <!-- 页面导航 -->
      <view
        :style="{ paddingTop: safeAreaInsets.top + 'px' }"
        class="page-navbar"
      >
        优医
      </view>

      <!-- 搜索栏 -->
      <view class="search-bar">
        <input
          placeholder-class="input-placeholder"
          placeholder="搜一搜: 疾病/症状/医生/健康知识"
          class="input"
          type="text"
        />
        <view class="icon-search">
          <uni-icons size="22" color="#C3C3C5" type="search" />
        </view>
      </view>
      <!-- 快速入口 -->
      <view class="quick-entry">
        <navigator hover-class="none" class="quick-entry-item">
          <image
            class="quick-entry-icon"
            src="/static/images/quick-entry-1.png"
          />
          <text class="label">问医生</text>
          <text class="small">按科室查问医生</text>
        </navigator>
        <navigator
          hover-class="none"
          class="quick-entry-item"
          url="/subpkg_consult/quickly/index?type=2"
        >
          <image
            class="quick-entry-icon"
            src="/static/images/quick-entry-2.png"
          />
          <text class="label">极速问诊</text>
          <text class="small">20s医生极速回复</text>
        </navigator>
        <navigator hover-class="none" class="quick-entry-item">
          <image
            class="quick-entry-icon"
            src="/static/images/quick-entry-3.png"
          />
          <text class="label">开药门诊</text>
          <text class="small">线上买药更方便</text>
        </navigator>
      </view>
      <!-- 快速查看 -->
      <view class="quick-view">
        <navigator
          hover-class="none"
          class="quick-view-item"
          url="/subpkg_medicine/order_list/index"
        >
          <image
            class="quick-view-icon"
            src="/static/images/quick-view-1.png"
          />
          <text class="label">药品订单</text>
        </navigator>
        <navigator
          hover-class="none"
          class="quick-view-item"
          url="/subpkg_archive/list/index"
        >
          <image
            class="quick-view-icon"
            src="/static/images/quick-view-2.png"
          />
          <text class="label">健康档案</text>
        </navigator>
        <navigator hover-class="none" class="quick-view-item">
          <image
            class="quick-view-icon"
            src="/static/images/quick-view-3.png"
          />
          <text class="label">我的处方</text>
        </navigator>
        <navigator hover-class="none" class="quick-view-item">
          <image
            class="quick-view-icon"
            src="/static/images/quick-view-4.png"
          />
          <text class="label">疾病查询</text>
        </navigator>
      </view>
      <!-- 广告位 -->
      <view class="banner-placeholder">
        <swiper
          class="uni-swiper"
          indicator-dots
          indicator-color="#ffffff99"
          indicator-active-color="#fff"
          circular
        >
          <swiper-item>
            <navigator hover-class="none" class="navigator" url=" ">
              <image class="banner-image" src="/static/images/banner-1.png" />
            </navigator>
          </swiper-item>
          <swiper-item>
            <navigator hover-class="none" class="navigator" url=" ">
              <image
                class="banner-image"
                src="/static/images/banner-1.png"
                mode="aspectFill"
              />
            </navigator>
          </swiper-item>
        </swiper>
      </view>
      <view
        class="doctor-feeds"
        :style="{ marginTop: -safeAreaInsets.top + 'px' }"
      >
        <custom-sticky :offset-top="safeAreaInsets.top + 'px'">
          <custom-tabs @click="onFeedTabChange" :list="feedTabs" />
        </custom-sticky>
		
		<view
			v-for = "(feed,index) in feedTabs"
			:key = "feed.type"
			v-show = "tabIndex == index"
		>
			<doctor-list :list = "doctorItems" v-if = "feed.type == 'recommend'"></doctor-list>
		
			<feed-list :list = "feed.list" v-if = "feed.rendered"></feed-list>
		</view>
      </view>
    </view>
  </scroll-page>
</template>

<style lang="scss">
  @import './index.scss';
</style>
