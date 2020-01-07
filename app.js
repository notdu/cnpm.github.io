const express = require('express');
const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const morgan = require('morgan');
const numeral = require('numeral');
require('express-async-errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
}
));

app.use(express.static('public'));

app.get('/', async (req, res) => {

    res.render('home',{
     
       });
      
     })

// app.use(require('./middlewares/locals.mdw'));

// require('./middlewares/locals.mdw')(app);
// require('./middlewares/routes.mdw')(app);

app.use((req, res, next) => {
    // res.render('vwError/404');
    res.send('You\'re lost');
})

//
// default error handler

app.use((err, req, res, next) => {
    // res.render('vwError/index');
    console.error(err.stack);
    res.status(500).send('View error on console.');
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})