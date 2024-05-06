<template>
	<scroll-view scroll-y="true" :style = "{height:windowHeight + 'px'}">
    <view class="scroll-page-content">
      <slot></slot>
    </view>
	</scroll-view>
</template>

<script setup>
	const {windowHeight} = uni.getSystemInfoSync()
</script>

<style lang="scss">
  .scroll-page-content {
    padding-bottom: env(safe-area-inset-bottom);
  }
</style>