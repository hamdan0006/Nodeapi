const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type :String,
        require : true
    },
    phone : {
        type :String,
        require : true
    },
    email : {
        type :String,
        require : true
    },
    
    salary : {
        type :String,
        require : true
    },
    hiddenData1 : {
        type :String,
       
    },
    hiddenData2 : {
        type :String,
       
    },
   
})
const WebUser = new mongoose.model("WebUser",userSchema);
module.exports = WebUser;