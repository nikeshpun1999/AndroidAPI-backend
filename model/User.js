const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

const userSchema=mongoose.Schema({
    Fname:{
        type:String
    },
    Mname:{
        type:String
    },
    Lname:{
        type:String
    },
    Username:{
        type:String
    },
    Password:{
        type:String
    },
    UserDesc:{
        type:String
    },
    ProfilePic:{
        type:String
    },
    Age:{
        type:Number
    },
    
    Sex:{
        type:String
    },
    Nationality:{
        type:String
    },
    Rating:{
        type:Number
    },
    Recipies:{
        type:String
    },
    Badge1:{
        type:String
    },
    Badge2:{
        type:String
    },
    Badge3:{
        type:String
    },
    Badge4:{
        type:String
    },
    Badge5:{
        type:String
    },
    Badge6:{
        type:String
    },
    tokens:[{
        token:{
        type:String,
        required:true
        }
    }]
});

userSchema.statics.checkCredentialsDb=async(Username,Password)=>
{
  
    const user1=await User.findOne({Username:Username,Password:Password})
    return user1;

}

userSchema.methods.generateAuthToken=async function(){
    
    console.log("token");
  
    const user=this
    const token=jwt.sign({ _id:user._id.toString()},'thisismynewcourse')
    
    console.log(token);
    user.tokens=user.tokens.concat({token:token})
    await user.save()
    return token
}


const User=mongoose.model("User",userSchema);
module.exports=User;