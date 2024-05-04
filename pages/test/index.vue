<template>
	<view class = "content">
		<button @click = "onButtonClick" type="primary">测试</button>
		<view>{{ counterStore.name }}  {{ counterStore.double }}</view>
		<!-- 前面小节代码省略了 -->
		<view class="counter">
		  <button @click="counterStore.decrement()" class="button" type="primary">-</button>
		  <input class="input" type="text" :value = "counterStore.count" />
		  <button @click="counterStore.increment()" class="button" type="primary">+</button>
		</view>
	</view>
</template>

<script setup>
	import { http } from '@/utils/http.js'
	import { useCounterStore } from '@/stores/counter.js'
	const counterStore = useCounterStore()
	
	function onButtonClick(){
		http.request({
			url: '/echo',
			method: 'GET',
			header:{
				Authorization:'2222'
			},
			custom:{
				abc:'123'
			}
		})
		
		uni.utils.toast('提示')
	}
</script>

<style lang="scss">
.counter {
    display: flex;
    margin-top: 30rpx;
  }

  .input {
    flex: 1;
    height: 96rpx;
    text-align: center;
    border: 2rpx solid #eee;
    box-sizing: border-box;
  }

  .button {
    width: 100rpx;
    margin: 0;

    &:first-child {
      border-start-end-radius: 0;
      border-end-end-radius: 0;
    }
    &:last-child {
      border-start-start-radius: 0;
      border-end-start-radius: 0;
    }
  }
</style>
