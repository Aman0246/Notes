const express = require("express");
const multer  = require('multer')
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const comments=require('./routes/comment')
const mongoose = require("mongoose");
dotenv.config();
app.use(express.json());
var cors = require('cors')
app.use(cors({origin: true, credentials: true}));
app.use(express.urlencoded({extended:false}))
mongoose
  .connect(process.env.MONGOCONNECT)
  .then(() => console.log("MongoDb connected.."))
  .catch((err) => console.log(err));

//--------------------------------------------------------------

//--------------------------------------------------------------
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comment", comments);
app.use("/categories", categoryRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}......`);
});
