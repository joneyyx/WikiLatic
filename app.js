let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');
// let usersRouter = require('./routes/users');
let overallRouter = require('./routes/overall');
let individualRouter = require('./routes/individual');
let authorRouter = require('./routes/author');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

// express-session
let session = require('express-session');
app.use(session({
    secret: 'wikilatic',
    cookie: {maxAge: 6000000},
    resave: false,
    saveUninitialized: false
}));

// flash
let flash = require('connect-flash');
app.use(flash());

// connect to local mongoDB
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikilatic');
let db = mongoose.connection;
// connection success
db.on('open', function () {
    console.log('MongoDB Connection Successed');
});
// connection failed
db.on('error', function () {
    console.log('MongoDB Connection Error');
});

// body-parser
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/overall', overallRouter);
app.use('/individual', individualRouter);
app.use('/author', authorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;