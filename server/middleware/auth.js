module.exports = function (options) {
	const jwt = require('jsonwebtoken')
	var assert = require('http-assert')
	const AdminUser = require('../models/AdminUser')

	return async(req, res, next)=>{
		const token = String(req.headers.authorization || '').split(' ').pop()

		assert(token, 401, '请提供token')

		// req.app == app

		const tokenData = jwt.verify(token, req.app.get('secret'));
		assert(tokenData, 401, 'token 无效')

		// 得到当初加密的用户ID
		req.user = await AdminUser.findById(tokenData.id)

		assert(req.user, 401, '用户不存在')

		
		await next()
	}

} 