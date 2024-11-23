const express = require("express");
const morgan = require("morgan");
const app = express();
const userRoute = require('../routes/userRoutes')


// ========middleware======
app.use(morgan("dev"));
//pass incomming data amd destructure json
app.use(express.json());


//Routes
app.use('/api/user', userRoute)



module.exports = app;