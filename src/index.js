const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
const connect = require("../src/app/connect/connect");
const { createProxyMiddleware } = require("http-proxy-middleware");
//router
const userRouter = require("./router/userRouter");
const categoriesRouter = require("./router/categoriesRouter");
const porductRouter = require("./router/productRouter");
const cart = require("./router/cartRouter");
const stripe = require("./router/script");
const payment = require("./router/paymentRouter");
const order = require("./router/orderRouter");
const searchRouter = require("./router/searchRouter");
const bannerRouter = require("./router/bannerRouter");
const dealRouter = require("./router/DealSaleRouter");
const commentRouter = require("./router/commentRouter");
const techSpecsRouter = require("./router/techSpecsRouter");
const reviewRouter = require("./router/reviewRouter");
const vnpayRouter = require("./router/vnpayRouter");
const socketIo = require('socket.io');
const port = 8080;

dotenv.config();
app.use(cookieParser());



//change text in jason
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(methodOverride("_method"));
app.use(morgan("combined"));

//router
app.use("/search", searchRouter);
app.use("/user", userRouter);
app.use("/category", categoriesRouter);
app.use("/product", porductRouter);
app.use("/banners", bannerRouter);
app.use("/dealSale", dealRouter);
app.use("/comment", commentRouter);
app.use("/techSpecs", techSpecsRouter);
app.use("/review", reviewRouter);
//file status
app.use("/banners", express.static("banners"));
app.use("/uploads", express.static("uploads"));

// app.use('/', homeRouter)
app.use("/cart", cart);
app.use("/stripe", stripe);
app.use("/payment", payment);
app.use("/order", order);
app.use(
  "/vnpay",vnpayRouter
);
app.get('/health-check', (req, res) => {
  res.status(200).send('Server is running!');
});

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});
