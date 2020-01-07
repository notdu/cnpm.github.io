const express = require('express');
const exphbs = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const morgan = require('morgan');
const numeral = require('numeral');
const session = require('express-session');
const userModel = require('./models/user.model');
require('express-async-errors');

const app = express();

app.use(express.static('resources'));
app.set('view engine', 'hbs');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    helpers: {
        section: hbs_sections(),
    }
}));

app.use(express.static('public'));



// app.use(require('./middlewares/locals.mdw'));

// require('./middlewares/locals.mdw')(app);
 require('./middlewares/routes.mdw')(app);



app.get('/login', (req, res) => {
    if (typeof(req.session.user) == 'undefined') {
        var { errorLogin } = req.session;
        if (errorLogin) {
            res.locals.errorLogin = true;
            res.locals.errorMessage = "Invalid username or password";
        }
        return res.render('login', { layout: false });
    }
    res.redirect('/')
})
app.post('/login', async(req, res) => {
    var { username, password } = req.body;


    if (username === 'admin' && password === '1') {
        req.session.user = { username, isAdmin: true };
        return res.redirect('/');
    }

    var user = await userModel.singleByUsername(username);
    console.log(user);
    if (user.length > 0) {
        user = user[0];
        if (password == user.password) {
            delete user.password;
            user.isAdmin = false;
            req.session.user = user;
            return res.redirect('/');
        }
    }
    req.session.errorLogin = true;
    res.redirect('/login');
})
app.use((req, res, next) => {
    if (typeof(req.session.user) == 'undefined') {
        return res.redirect('/login');
    }
    next();
})


app.get('/', (req, res) => {
    res.render('index.hbs');
});
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