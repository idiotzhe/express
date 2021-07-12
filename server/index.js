const express = require("express")
const app = express()
const expressLayouts = require('express-ejs-layouts')
app.use(express.json())
app.use(require('cors')())
app.set('secret','adfadsfasdfsdafasdfadsf');


app.use("/uploads", express.static(__dirname+"/uploads"))
app.use(express.static('public'))


app.use(expressLayouts)
app.set('layout', './layouts/main')
app.set('view engine','ejs')
app.set('views','./views')
require("./plugins/db")(app)
require("./routes/admin")(app)
app.use('/',require('./routes/front/index'))

app.all('*', (req, res, next)=>{
	res.render('error',{title:'404'})
})

app.use( (err, req, res, next)=>{
	err.statusCode = error.statusCode || 500;
	err.status = error.status || 'error';
	
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message
	})
} )

module.exports = app;