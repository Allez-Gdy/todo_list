import Request from '../utils/request'
let request = new Request().http

//全局定义请求头
export default {
	// 判断验证码
	judgeCode: function(data) {
		return request({
			url: '/email/judgecode',
			method: 'POST',
			data: data,
		})
	},
	// 获取验证码
	getemailcode: function(data) {
		console.log(data);
		return request({
			url: '/email/getemailcode',
			method: "GET",
			data: data
		})
	},
	// 注册
	register: function(data) {
		return request({
			url: "/user/register",
			method: "POST",
			data: data
		})
	},
	login: function(data) {
		return request({
			url: "/user/login",
			method: "POST",
			data: data
		})
	},
	findAll: function(data) {
		return request({
			url: "/matter/all",
			method: "POST",
			data: data
		})
	},
	findNoFinish: function(data) {
		return request({
			url: "/matter/allnofinish",
			method: "POST",
			data: data
		})
	},
	findFinish: function(data) {
		return request({
			url: "/matter/allfinish",
			method: "POST",
			data: data
		})
	},
	findSort: function(data) {
		return request({
			url: "/matter/allsort",
			method: "POST",
			data: data
		})
	},
	findSubtodo: function(data) {
		return request({
			url: "/matter/getsubtodo",
			method: "POST",
			data: data
		})
	},
	addTodo: function(data) {
		return request({
			url: "/matter/add",
			method: "POST",
			data: data
		})
	},
	updateTodo: function(data) {
		return request({
			url: "/matter/updatetodo",
			method: "POST",
			data: data,
			Headers: {
				"Content-Type": "application/json"
			}
		})
	},
	insterSubtodo: function(data) {
		return request({
			url: "/matter/insterSubtodo",
			method: "POST",
			data: data
		})
	},
	deleteSubTodo: function(data) {
		return request({
			url: "/matter/deletesubtodo",
			method: "GET",
			data: data
		})
	},
	// 更新事项状态
	updataTodoStatus: function(data) {
		return request({
			url: "/matter/updataTodoStatus",
			method: "POST",
			data: data
		})
	},
	// 跟新子事项
	updataSubTodoStatus: function(data) {
		return request({
			url: "/matter/updateSubTodoStatus",
			method: "POST",
			data: data
		})
	}
	
}
/*
请求样式：
    自定义名字: function(data) {
        return request({
            url: "/banner", //请求头
            method: "GET", //请求方式 
            data: data,    //请求数据
            token: token, // 可传  
            hideLoading: false, //加载样式
        })
    },
*/