<script>
import { nextTick, ref } from 'vue';
export default {
	setup() {
		let isShow = ref(false)
		const open = ()=> {
			isShow.value = !isShow.value;
			console.log('isShow' + isShow.value);
		}
		
		return {
			isShow,
			open
		}
	}
}
</script>
<template>
	<div>
		<div>{{isShow}}</div>
		<div v-if="isShow">faskfldafd</div>
		<button @click="open">按钮</button>
	</div>
</template>