const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const path = require('path');
const cookieParser = require('cookie-parser');
const initializeDatabases = require('./db');
const index = require('./routes/index');
const config = require('./config/config.json');
const lang = require('./config/language/' + config.general.defaultLanguage + '.json');
const app = express();
const port = config.general.port;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use gzip compression and security patch
app.use(compression());
app.use(helmet());

// Initialize public directory
app.use(express.static(path.join(__dirname, 'public')));

// Support parsing of application/json type post data
app.use(express.json());
// Support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));
// Support cookie parsing
app.use(cookieParser());

const startApp = async function () {
    // Initialize databases
    const dbs = await initializeDatabases().catch((err) => {
        console.error('Failed to make all database connections!');
        console.error(err);
        process.exit(1);
    });

    // Initialize routes
    app.use('/', index(config, lang, dbs));

    app.listen(port, () => {
        console.log('App running on port ' + port);
    });

    // Catch 404 and forward to error handler
    app.use((req, res, next) => {
        let err = new Error(lang.errorPage.type_404.name);
        err.status = 404;
        next(err);
    });

    // Error handler
    app.use((err, req, res) => {
        res.status(err.status || 500);
        let type = lang.errorPage['type_' + err.status];
        res.render('error', {
            status: (type) ? err.status : 500,
            type: (type) ? type.name : lang.errorPage.internalError,
            lang,
            config
        });
    });
}

startApp();
