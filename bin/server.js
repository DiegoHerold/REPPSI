require("dotenv").config(); 
const app = require("../src/api");

app.use((req,res,next)=>{
    next();
});
