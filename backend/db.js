
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://exam-site:pqyP03Be5WIcJUlD@cluster0.sbxfw.mongodb.net/exam1' ,{

}).then(() =>{
  console.log("CONNECTED TO MOGO");
}).catch((error) =>{
  console.error('MongoDB connection error:' , error);
});

const studentSchema = mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true,
    trim : true,
    minlength : 3,
    maxlength : 50
  },
  password:{
    type : String,
    required : true
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],  // Email validation
  },
  rollNo : {
    type : Number,
    required : true,
    min : 1,
    max : 9999  
  }
});
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin', 'moderator'], // Define possible roles
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update `updatedAt` on save
adminSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Student = mongoose.model('Student' , studentSchema);
const Admin = mongoose.model('Admin' , adminSchema)
module.exports = {
  Student,
  Admin
}

