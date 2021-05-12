const express = require('express');
const route = express.Router();
const services = require('../services/render')
const controller = require("../controller/controller")
//可以從app.js那邊分離出router的部分

/**
 * @description Root Route
 * @method GET/
 */

route.get('/',services.homeRoutes)

/**
 * @description Root Route
 * @method GET/add_user
 */
route.get('/add_user',services.add_user)

/**
 * @description Root Route
 * @method GET/
 */
route.get('/update_user',services.update_user)

//API
//path 不能在前面加 ./ 因為他是一段字串也就是localhost:3000之後要自己加的route
route.post("/api/users",controller.create);
route.get("/api/users",controller.find);
route.put("/api/users/:id",controller.update);
//put 跟 post 最大得差異是side effect 
//post有side effect
//如用PUT來更新使用者基本資料，只要附加於請求的資訊相同，一次或多次請求的副作用都會是相同，也就是使用者資訊保持為指定的最新狀態。
route.delete("/api/users/:id",controller.delete);

module.exports = route;