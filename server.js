const express       = require('express');
const app           = express();
const ejs           = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path          = require('path');
const PORT          = process.env.PORT || 3300;


//Set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

//Routes
app.get('/', (req,res)=>{
    //res.send("Hello");
    res.render('home');
});
app.get('/cart', (req,res)=>{
    //res.send("Hello");
    res.render('customers/cart');
});

app.get('/login', (req,res)=>{
    //res.send("Hello");
    res.render('auth/login');
});

app.get('/register', (req,res)=>{
    //res.send("Hello");
    res.render('auth/register');
});


// Assets
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(PORT , ()=>{
    console.log(`Listening on port ${PORT}`);
})