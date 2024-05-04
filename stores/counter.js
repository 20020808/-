import {defineStore} from 'pinia'
import {ref,computed} from 'vue'

export const useCounterStore = defineStore('counter',() => {
	const count = ref(0)
	
	const name = ref('小刘')
	
	function increment(){
		count.value++
	}
	
	function decrement(){
		count.value--
	}
	
	const double = computed(()=>{
		return count.value * 2
	})
	
	return {count,name,increment,decrement,double}
})

// export const useCounterStore = defineStore('counter',{
// 	state(){
// 		return{
// 			count:10,
// 			name:'小明'
// 		}
// 	},
// 	actions:{
// 		increment(){
// 			this.count++
// 		},
// 		decrement(){
// 			this.count--
// 		}
// 	},
// 	getters:{
// 		double(){
// 			return this.count* 2
// 		}
// 	}
// })