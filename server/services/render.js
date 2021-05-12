const axios = require("axios");

exports.homeRoutes = (req,res)=>{
    axios.get("http://localhost:3000/api/users")
        .then(response=>{
            //console.log(response);
            res.render('index',{users:response.data});//把users object 丟到index.ejs裡 就可以使用 => 而users裡包著 Userdb.find()裡包著的data
        })
        .catch(err=>{
            res.send(err);
        })
}

exports.add_user = (req,res)=>{
    res.render("add_user");
}

exports.update_user = (req,res)=>{
    axios.get("http://localhost:3000/api/users",{params:{id:req.query.id}})
        .then(function(userdata){
            res.render("update_user",{user:userdata.data});
        })
        .catch(err=>{
            res.send(err);
        })

}