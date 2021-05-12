var Userdb = require("../model/model");

//create and save new user
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"Content can not be empty!"});
        return;
    }
    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })
    
    //save user in the database -> 上面只是拿到request傳來的資料 但還沒save到mongodb
    user
        .save(user)
        //save會回傳promise物件包含data 所以可以繼續.then實現async(異步)
        .then((data)=>{
            res.redirect('/add_user');
        })
        //如果.then報錯則執行.catch err為物件裡面包含err.message
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while creating a create operaion"
            });
        });
    
      
}

//retrieve and return all users/ retrive and return a single user
exports.find = (req,res)=>{
   if(req.query.id){
    const id = req.query.id;
    Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id"+id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving!"})
        })
          
   }else{
    Userdb.find()
        .then((user)=>{
            res.send(user)
        })
        .catch(err=>{
        //status(500) is internal server error
            res.status(500).send({
                message: err.message || "Error occured while retriving user information"
            })
        })
   }
}

//Update a new idntified user by user id 
exports.update = (req,res)=>{
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }
    //update user
    //This property is an object containing properties mapped to the named route “parameters”. 
    //For example, if you have the route /user/:name, then the “name” property is available as req.params.name. This object defaults to {}.
    const id = req.params.id;
    //findByIdAndUpdate() is a method to update the mongodb
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Update user with ${id}, Maybe user not found!`})
            }else{
                res.redirect('/update_user');
            }
        })
        .catch(err=>{
            res.status(500).send({message:'Error Update user information'})
        })

}

//Delete a user with specified user id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Delete with id:${id}. Maybe id is wrong!`});
            }else{
                res.send({
                    message:"User was deleted successfully!"
                })
                // res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"Could not delete User with id=" + id
            })
        })
}