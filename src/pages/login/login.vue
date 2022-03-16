<script>
import { ref, reactive } from "vue";
import api from "../../api/api.js"
export default {
	setup() {
		const submitForm = ()=> {
			uni.switchTab({
				url: "/pages/index/index"
			})
		}

		return {
			submitForm
		}
	}
}
</script>

<template>
	<div class="login_page">
		<!-- <div>
			<img src="" alt="">
		</div> -->
		<div class="login_form">
			<div class="form-item">
				<van-field
					placeholder="请输入用户名"
					border="true"
					label="用户名"
				/>
			</div>
			<div class="form-item">
				<van-field
					placeholder="请输入密码"
					border="true"
					label="密码"
				/>
			</div>
			<div class="form-item">
				<van-button type="info" block @click="submitForm">登录</van-button>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.login_page {
		 .login_form {
			 padding: 10px 20px;
			 
		 }
	}
</style>