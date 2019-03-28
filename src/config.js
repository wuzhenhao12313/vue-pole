module.exports = {
	title: '破浪电子商务应用系统', //系统标题
	appCode: 'OA', //系统编号
	homePage: '/dashboard/workplace', //首页
	url: {
		cdn: 'http://cdn.polelong.com', //资源服务器
		imgServer: 'http://erpimg1.polelong.com', //图片服务器
		uploadApi: 'http://fxServer.polelong.com/Uploader', //上传接口
		localUploadApi: 'http://fxServer.lpole.com/Uploader', //本地上传接口
		dev: {
			home: 'http://oa.lpole.com:8081/',//前端路由
			service: 'http://fxServer.lpole.com',
			api: 'http://fxServer.lpole.com/api',
			loginApi: 'http://login.lpole.com:8082/#/user/login',
		},
		prod: {
			home: 'http://oa.polelong.com/',//前端路由
			service: 'http://fxServer.polelong.com',
			api: 'http://fxServer.polelong.com/api',
			loginApi: 'http://login.polelong.com/#/user/login',
		},
	},
	getUrl: function(key) {
		if (process.env.NODE_ENV === 'production') {
			return this.url.prod[key];
		} else {
			return this.url.dev[key];
		}
	}
}
