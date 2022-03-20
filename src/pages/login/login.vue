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
    // const loginImg = ref(require('../../assets/images/loginImg.png'));

		return {
			submitForm,
      // loginImg
     
		}
	}
}
</script>

<template>
	<div class="login_page">
		<div class="login-img">
      <image src="/static/img/loginImg.png"></image>
		</div>
    <div class="login-title">
      <div class="login-title">
        登录
      </div>
    </div>
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
    .login-img {
      image {
        height: 400px;
        width: 400px;
      }
    }
    .login-title {
      padding-left: 12px;
      font-size: 20px;
      font-weight: 600;   
    }
    .login_form {
      padding: 10px 20px;
    }
	}
</style>