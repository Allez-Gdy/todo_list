<script setup>
import { ref, reactive } from "vue";
import api from "../../api/index"
import Notify from "../../wxcomponents/vant/dist/notify/notify";
function trim(str){ //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
const submitForm = ()=> {
	if(email.value == '' || password.value == '') {
		Notify({type: "warning", message: "请输入完整信息"})
		return
	}
	api.login({
		email: email.value,
		password: password.value
	}).then(res=> {
		if(res.data.code !== 200) {
			Notify({type: "warning", message: res.data.message})
		}else {
			uni.setStorageSync("todoToken", res.data.data.token)
			uni.setStorageSync("username", res.data.data.user.username)
			uni.setStorageSync("uid", res.data.data.user.id)
			Notify({type: "success", message: res.data.message})
			setTimeout(() => {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}, 1000);
		}
	})
}
const signUp = ()=> {
	uni.navigateTo({
		url: "/pages/signUp/signUp"
	})
}
const email = ref('2965157945@qq.com');
const password = ref('123456');

const emailOnChange = (event)=> {
	email.value = trim(event.detail)
}
const pdOnChange = (event)=> {
	password.value = trim(event.detail)
}
// const loginImg = ref(require('../../assets/images/loginImg.png'));
</script>

<template>
	<div class="login_page">
		<van-notify id="van-notify" />
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
					:value="email"
					@change="emailOnChange"
					placeholder="请输入邮箱"
					border="true"
					label="邮箱"
				/>
			</div>
			<div class="form-item">
				<van-field
					:value="password"
					password
					@change="pdOnChange"
					placeholder="请输入密码"
					border="true"
					label="密码"
				/>
			</div>
			<div class="form-item">
				<van-button type="info" block @click="submitForm">登录</van-button>
			</div>
			<div class="form-item" style="margin-top: 50rpx;">
				<span style="color: #666;" @click="signUp">没有账号？去注册</span>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.login_page {
    .login-img {
			display: flex;
			justify-content: center;
      image {
        width: 500rpx;
				height: 500rpx;
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