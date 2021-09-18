require('dotenv').config()
const express       = require('express')
const app           = express()
const ejs           = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path          = require('path')
const mongoose      = require('mongoose')
const PORT          = process.env.PORT || 3300
const session       = require('express-session')
const flash         = require('express-flash')
const MongoDbStore  = require('connect-mongo')
const passport      = require('passport')


//DB connection
const connectDB = require('./app/config/db');
connectDB();


//session config includeing Session store
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({ mongoUrl: process.env.MONGO_CONNECTION_URL,collection: 'sessions'}),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))

// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


//express flash
app.use(flash())

// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//Set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

//set Routes
require('./routes/web')(app)


app.listen(PORT , ()=>{
    console.log(`Listening on port ${PORT} @ http://localhost:3300/`);
})