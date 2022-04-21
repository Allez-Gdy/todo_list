<script setup>
import Notify from '../../wxcomponents/vant/dist/notify/notify'
import api from '../../api/index'
import { ref } from 'vue';
	const email = ref('');
	const emailCode = ref('')
	const username = ref('')
	const password1 = ref('')
	const password2 = ref('')
	const isEmail = ref(true)
	const time = ref(60);
	const codetitle = ref('发送验证码')
	const isGetCode = ref(true);
	const goLogin = ()=> {
		uni.navigateBack({
			delta: 1
		})
	}
	// 下一步
	const judgeEmailCode = async()=> {
		await api.judgeCode({
			email: email.value,
			emailCode: emailCode.value
		}).then(res=> {
			console.log(res);
			if(res.data.code !== 200) {
				Notify({ type: 'warning', message: res.data.message });
			}else {
				Notify({type: "success", message: res.data.message});
				isEmail.value = false
			}
		})
	}
	// 获取验证码
	const getEmailCode = async ()=> {
	  await	api.getemailcode({
			email: email.value
		})
		.then((result) => {
			if(result.data.code !== 200) {
				Notify({ type: 'warning', message: result.data.message });
			}else {
				Notify({ type: 'success', message: result.data.message });
				isGetCode.value = false;
				const timer = setInterval(()=> {
					codetitle.value = `${time.value}秒`
					time.value--;
					if(time.value === -1) {
						clearInterval(timer);
						isGetCode.value = true;
						codetitle.value = "发送验证码"
						time.value = 60
					}
				},1000)
			}
		}).catch((err) => {
			console.log(err);
		});
	}
	// 
	const emailOnChage = (event)=> {
		email.value = trim(event.detail)
	}
	const emailCodeOnChage = (event)=> {
		emailCode.value = trim(event.detail)
	}
	const nameOnChange = (event)=> {
		username.value = trim(event.detail)
	}
	const p1OnChange = (event)=> {
		password1.value = trim(event.detail)
	}
	const p2OnChange = (event)=> {
		password2.value = trim(event.detail)
	}
	function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	const submit = async ()=> {
		if(username.value == '' || password1.value == '' || password2.value == '') {
			Notify({type:"warning",message:"请完整输入信息"});
			return
		}
		if(password1.value !== password2.value) {
			Notify({type: "warning",message:"输入的两次密码不一样"})
			return
		}
		await api.register({
			username: username.value,
			password: password1.value,
			email: email.value
		}).then(res=> {
			if(res.data.code !== 200) {
				Notify({ type: 'warning', message: res.data.message });
			}else {
				Notify({ type: 'success', message: res.data.message });
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000);
			}
		})
	}
</script>
<template>
	<div class="signup_page">
		<van-notify id="van-notify" />
		<div class="signup-img">
			<image src="/static/img/Login-rafiki.png"></image>
		</div>
    <div class="signup-title">
      <div class="signup-title">
        注册
      </div>
    </div>
		<div v-if="isEmail" class="get-code-box">
			<div class="form-item get-code-item">
				<van-field
					:value="email"
					placeholder="请输入要注册的邮箱"
					border="true"
					label="邮箱"
					use-button-slot
					title-width="4em"
					@change="emailOnChage"
				>
					<template v-slot:button>
						<van-button size="small" type="default" :disabled="!isGetCode" @click="getEmailCode">
							{{codetitle}}
						</van-button>
					</template>
				</van-field>
			</div>
			<div class="form-item">
				<van-field 
					placeholder="请输入收到的验证码"
					border="true"
					label="验证码"
					title-width="4em"
					:value="emailCode"
					@change="emailCodeOnChage"
				/>
			</div>
			<div class="form-item">
				<van-button type="info" block @click="judgeEmailCode">下一步</van-button>
			</div>
		</div>
		<div v-else class="signup_form">
			<div class="form-item">
				<van-field
					:value="username"
					placeholder="请输入用户名"
					border="true"
					label="用户名"
					maxlength="10"
					title-width="4em"
					@change="nameOnChange"
				/>
			</div>
			<div class="form-item">
				<van-field
					:value="password1"
					title-width="4em"
					placeholder="请输入密码"
					border="true"
					label="密码"
					password
					@change="p1OnChange"
				/>
			</div>
			<div class="form-item">
				<van-field
					:value="password2"
					title-width="4em"
					placeholder="请再次输入密码"
					border="true"
					label="确认密码"
					password
					@change="p2OnChange"
				/>
			</div>
			<div class="form-item">
				<van-button type="info" block @click="submit">提交</van-button>
			</div>
			<div class="form-item" style="margin-top: 50rpx;">
				<span style="color:#666;" @click="goLogin">已有账号？去登录</span>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	.signup_page {
		.signup-img {
			display: flex;
			justify-content: center;
      image {
        width: 500rpx;
				height: 500rpx;
      }
    }
		.signup-title {
      padding-left: 12px;
      font-size: 20px;
      font-weight: 600;   
    }
		.signup_form,.get-code-box {
      padding: 10px 20px;
    }
	}
</style>