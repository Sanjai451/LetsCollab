const mongoose = require("mongoose")

const connectDB = ()=>{
    mongoose.connect("mongodb://localhost/google-docs-clone")
    .then(()=> console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))
}

module.exports = connectDB