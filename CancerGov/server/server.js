#!/usr/bin/env node
var debug = require('debug')('expressapp');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var proxy = require('express-http-proxy');
var querystring = require('querystring');

var app = express();

//We will use handlebars to deal with certain types of templating
//mainly error pages.  THIS SHOULD NOT BE USED FOR WEBSITE CONTENT!!!
//Node is not used for hosting web pages, and as such is not available
//to do templating.  If you need handlebars on the website, then you
//can use the client side version
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: 'server/views/layouts/',
    partialsDir: ['server/views/partials/']
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// Don't know hwat these next 4 app.use statements are for...
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

/** Serve up static content in the public folder **/
app.use('/PublishedContent', express.static(__dirname.replace("server","_dist")));


/** Proxy Content that is not found on the server to www-blue-dev.cancer.gov **/
app.use('*', proxy('www-blue-dev.cancer.gov', {
    forwardPath: function(req, res) {
        return require('url').parse(req.originalUrl).path;
    }
}));

/************************************************************
 * SERVICE ENDPOINTS HERE!
 ************************************************************/

//Follow the pattern below

/*
app.use('/Dictionary.Service/v1/getTerm', proxy('www-blue-dev.cancer.gov', {
    forwardPath: function(req, res) {
        var termID = req.query.termId;
        var language = req.query.language;
        var dictionary = req.query.dictionary;

        var newURL = '/Dictionary.Service/v1/GetTerm?'
                + querystring.stringify({
                    termID: termID,
                    language: language,
                    dictionary: dictionary
                });

        console.log(newURL);

        return newURL;
    }

}));
*/

/************************************************************
 * Error Handlers
 ************************************************************/
// catch unmapped items make a 404 error
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Development error handler will show stack traces
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

/************************************************
 * Start listening on a port
 ************************************************/
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});
