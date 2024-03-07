const  mongoose = require("mongoose");

mongoose.connect('mongodb+srv://kushalchaudhary052:mkthQURpVZfERPPO@cluster0.tv2u4si.mongodb.net/PayTm')

const userSchema =new mongoose.Schema({
    username :{
        type : String,
        required:true,
        unique: true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    firstName:{
        type : String,
        required: true
    },
    lastName:{
        type : String,
        required: true
    },
    password:{
        type : String,
        required: String ,
        minLength:6
    }
})


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'user',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const user = mongoose.model('user', userSchema);
// const User = mongoose.model('User', userSchema);

module.exports = {
	user,
  Account,
};