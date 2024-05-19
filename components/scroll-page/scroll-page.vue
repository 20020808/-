<template>
	<scroll-view 
		scroll-y="true" 
		:refresher-enabled = "scrollPageProps.refresherEnabled"
		:refresher-triggered = "scrollPageProps.refresherTriggered"
		@refresherrefresh="$emit('refresherrefresh',$event)"
		@scrolltolower="$emit('scrolltolower',$event)"
		:style = "{
			height:windowHeight + 'px',
			boxSizing: 'border-box',
			borderBottom: scrollPageProps.borderStyle,
			backgroundColor: scrollPageProps.backgroundColor
			}">
		<view class="scroll-page-content">
		  <slot></slot>
		</view>
	</scroll-view>
</template>

<script setup>
	//读取页面视口高度
	const {windowHeight} = uni.getSystemInfoSync()
	
	//自定义组件属性
	  const scrollPageProps = defineProps({
		borderStyle: {
		  type: [String, Boolean],
		  default: false,
		},
		refresherEnabled: {
		  type: Boolean,
		  default: false,
		},
		refresherTriggered: {
		  type: Boolean,
		  default: false,
		},
		backgroundColor: {
			type:String,
			default: '#fff'
		}
	  })
	
	//自定义事件
	defineEmits(['refresherrefresh','scrolltolower'])
	
	function test(){
		console.log('下拉触发');
	}
</script>

<style lang="scss">
  .scroll-page-content {
	  height: 1000px;
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>