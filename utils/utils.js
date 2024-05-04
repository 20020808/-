uni.utils = {
	
	toast(title = '数据加载失败',icon = 'none'){
		uni.showToast({
			title,
			icon,
			mask:true,
		})
	}
}