const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;

//log request
app.use(morgan('tiny'));

//mongoDB connection
connectDB();

//parse request(req.body) to body-parser
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
//parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:true}));
//app.use(bodyparser.json({extended:true}));

//set view engine
app.set("view engine","ejs");

//load assets
app.use('/css',express.static(path.resolve(__dirname,"./assets/css")));
app.use('/imgs',express.static(path.resolve(__dirname,"./assets/imgs")));
app.use('/js',express.static(path.resolve(__dirname,"./assets/js")));
//前面的css代表任何後面能成功訪問到的靜態資源任何一個前面加/css也都可以訪問到

//load routers
app.use('/',require('./server/routes/router'));

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});