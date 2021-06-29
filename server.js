const express       = require('express');
const app           = express();
const ejs           = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path          = require('path');
const PORT          = process.env.PORT || 3300;

//Routes
app.get('/', (req,res)=>{
    //res.send("Hello");
    res.render('home');
});

//Set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

app.listen(PORT , ()=>{
    console.log(`Listening on port ${PORT}`);
})