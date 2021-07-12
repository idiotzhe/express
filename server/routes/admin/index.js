module.exports = function (app) {
    const express = require("express");
    const inflection = require("inflection");
	const jwt = require('jsonwebtoken')
	var assert = require('http-assert')
	const AdminUser = require('../../models/AdminUser')

    // 子路由
    const router = express.Router({
        mergeParams: true
    })

	const authMiddlewrare =  require('../../middleware/auth')

	const resourceMiddlewrare = require('../../middleware/resource')
	
	router.post('/', async (req, res) => {
	  const model = await req.Model.create(req.body)
	  res.send(model)
	})
	
   /* router.get('/', authMiddlewrare(), async (req, res) => {
        const items = await req.Model.find().populate('parent').limit(10)
        res.send(items)
    })*/
    
    router.get('/', async (req, res) => {
      const queryOptions = {}
      if (req.Model.modelName === 'Category') {
        queryOptions.populate = 'parent'
      }
      const items = await req.Model.find().setOptions(queryOptions).limit(100)
      res.send(items)
    })

    router.get('/:id', async (req, res) => {
        const items = await req.Model.findById(req.params.id)
        res.send(items)
    })
    router.put('/:id', async (req, res) => {
        const items = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(items)
    })
    router.delete('/:id', async (req, res) => {
        const items = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    // 子路由
    app.use('/admin/api/rest/:resource', authMiddlewrare(), resourceMiddlewrare(), router) 

    //use 里面定义的参数 在router里面吗使用 所以加mergeParams

	const multer = require("multer")
	
	
	
	const multerStorage = multer.diskStorage({
		destination: (req, file, cb)=>{
			// cb(null, __dirname+"/../../uploads")
			cb(null, "uploads")
		},
		filename: (req, file, cb)=>{
			const ext = file.mimetype.split('/')[1];
			// cb(null, `user-${req.user.id}-${Date.now()}-${ext}`);
			cb(null, `${Date.now()}.${ext}`);
		}
	})
	const multerFilter = (req, file, cb)=>{
		if(file.mimetype.startsWith('image')){
			cb(null, true)
		}else{
			
		}
	}
	const upload = multer({
		storage: multerStorage,
		fileFilter: multerFilter
	})
	

	app.use('/admin/api/upload',/*authMiddlewrare(),*/ upload.single("file"), async(req, res, next)=>{
		const file = req.file
		file.url = `http://localhost:3000/uploads/${file.filename}`
		console.log(req.file);
		console.log(req.body);
		res.send(file)
    }, router) 

 	app.post('/admin/api/login', async(req, res)=>{
		 const {username, password} = req.body
		 const user = await AdminUser.findOne({
			username: username
		 }).select('+password')
		 
		assert(user, 422, '用户不存在')


/* 		 if(!user){
			return res.status(422).send({
				message: "用户不存在"
			})
		 }
 */
		const isValid = require('bcryptjs').compareSync(password, user.password)
		assert(isValid , 422, '密码错误')

	/* 	if( !isValid ){
			return res.status(4232).send({
				message: "密码错误"
			})
		} */

		const token = jwt.sign({
			id: user._id
		}, app.get('secret'))

		res.send({
			token: token
		})

	}) 

	//错误处理
	app.use(async(err, req, res, next)=>{
		res.status(err.statusCode || 500).send({
			message: err.message
		})
	})


}



