const mongoose = require('mongoose');

const connectDB = async ()=>{
    //若 try 區塊中的程式碼無任何錯誤，則忽略 catch 區塊中的程式碼；
    //若 try 區塊中的程式碼發生錯誤，則中斷 try 區塊程式碼的執行，並將控制權轉給 catch 區塊的程式碼。
    try{
        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:true,
            useCreateIndex:true,
        })

        console.log(`MongoDB connected:${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
        //To exit with a 'failure' code
    }
}

module.exports = connectDB;