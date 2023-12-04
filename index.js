const express = require("express");
const cors = require("cors");
const db = require("./configs/config.db");
const app = express();
const dotenv = require("dotenv");
const http = require("http");

const userRouter = require("./routers/userRouter");
const roomRouter = require("./routers/roomRouter");

dotenv.config();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// kết nối DB
db.connectDb();

// chạy trên local ở cổng 8000
const port = process.env.PORT || 8000;

// use middlewire

// router here

app.use(userRouter, function (req, res, next) {
  next();
});

app.use(roomRouter);

app.use("/", function (req, res, next) {
  res.status(200).json({
    result: "success",
    message: "oke oke",
  });
});

app.listen(port, () => {
  console.log(`Your app listening at http://localhost:${port}`);
});
