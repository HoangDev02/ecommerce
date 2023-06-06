const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const methodOverride = require('method-override')
const dotenv = require('dotenv');
const app = express()
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const jwt = require('jsonwebtoken');
const cors = require("cors");


const connect = require("../src/app/connect/connect")

//router
const userRouter = require('./router/userRouter')
const categoriesRouter = require('./router/categoriesRouter')
const porductRouter = require('./router/productRouter')
const cart = require('./router/cartRouter')
const port = 8080;
dotenv.config()

app.use(cors());
app.use(cookieParser());

//change text in jason
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(methodOverride('_method'))
app.use(morgan('combined'))

// app.engine('hbs', 
//   handlebars.engine({
//   extname: '.hbs',
//   helpers: {
//     // sum: (a, b) => a+ b
//   }
// }));
//   app.set('view engine', 'hbs');
//   app.set('views', path.join(__dirname, 'resource', 'views'));

//router
app.use('/user', userRouter)
app.use('/category', categoriesRouter)
app.use('/product', porductRouter)
// app.use('/', homeRouter)
app.use('/cart', cart)

// app.get('/cookies', (req, res) => {
//   const cookieId = req.cookies.refreshToken;
//   const kq =jwt.verify(cookieId, process.env.JWT_ACCESS_KEY)
//   var idToken = kq.id
//   res.send(`Cookie ID: ${idToken}`);
// });


app.listen(port, () => {
    connect()
    console.log(`Example app listening on port ${port}`)
})