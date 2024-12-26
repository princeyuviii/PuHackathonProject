const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("database connected ....")
}).catch((err)=>{
    console.log(err)
})

const UserSchema = mongoose.Schema({
    userName:String,
    profilePhoto:String,
    userId:Number,
    formattedData:[{
        date:Date,
        step_count:Number,
        glucose_level:Number,
        blood_pressure:[Number],
        heart_rate:Number,
        weight:Number,
        height_in_cms:Number,
        sleep_hours:Number,
        body_fat_in_percent:Number,
        menstrual_cycle_start:String
        }
    ]
})

const userModel = mongoose.model('userData',UserSchema);

module.exports = userModel;