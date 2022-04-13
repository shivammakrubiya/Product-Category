const mongoose  = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shivam')
.then(()=>{
    console.log("Database connection successfull");
})
.catch(()=>{
    console.log("error occur in connection");
})