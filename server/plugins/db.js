module.exports = function (app) {

    const mongoose = require("mongoose");
    
    
    mongoose.connect("mongodb+srv://root:a123456@cluster0.bwbos.azure.mongodb.net/moba?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((connection)=>{
    	console.log('数据库连接成功');
    })

}