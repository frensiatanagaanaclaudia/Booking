//import module
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const path = require("path");
// connection to MongoDb
const connectDB = require("./database/db")
// import router
const categoryRouter = require("./router/categoryRouter")
const itemRouter = require("./router/itemRouter")
const bankRouter = require("./router/bankRouter")
const featureRouter = require("./router/featureRouter")
const infoRouter = require("./router/infoRouter")
const customerRouter = require("./router/customerRouter")
const bookingRouter = require("./router/bookingRouter")
const userRouter = require("./router/userRouter")
const dashboardRouter = require("./router/dashboardRouter")
const homeRouter = require("./router/homeRouter")






connectDB();
// setting cord dan morgan
app.use(cors());
app.use(logger("dev"));
//setup postjson
app.use(express.json());
//setup encoded
app.use(express.urlencoded({extended:false}))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Authorization, authorization, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});
//setting folder public url for file
app.use(express.static(path.join(__dirname,'public')));

// url
app.use("/api/category",categoryRouter)
app.use("/api/bank",bankRouter)
app.use("/api/item",itemRouter)
app.use("/api/item/feature",featureRouter)
app.use("/api/item/info",infoRouter)
app.use("/api/customer",customerRouter)
app.use("/api/booking",bookingRouter)
app.use("/api/user",userRouter)
app.use("/api/dashboard",dashboardRouter)
//client
app.use("/api/client",homeRouter)





const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});
