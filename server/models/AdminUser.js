
const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

const bcryptjs = require('bcryptjs');


const schema = new mongoose.Schema({
	username: {type: String},
	password: {
		type: String,
		select: false,
		set(val){
			return bcryptjs.hashSync(val, 10)
		}
	}

})
// set 处理后
	
// 	select: false 编辑页面不被查询出来，防止二次bcrypt

module.exports = mongoose.model('AdminUser', schema)