const express = require('express');
const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const morgan = require('morgan');
const numeral = require('numeral');
require('express-async-errors');

const app = express();

app.engine('hbs', exphbs({
    helpers: {
        section: hbs_sections(),
    }
}));
app.set('view engine', 'hbs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));



// app.use(require('./middlewares/locals.mdw'));

// require('./middlewares/locals.mdw')(app);
// require('./middlewares/routes.mdw')(app);

app.use((req, res, next) => {
    next();
})

app.get('/', (req, res) => {
    res.render('index');
});
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