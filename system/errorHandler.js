"use strict";

// Catch 404 and forward to error handler
module.exports.catch404 = (lang) => {
    return async (req, res, next) => {
        let err = new Error(lang.errorPage.type_404.name);
        err.status = 404;
        next(err);
    }
}

// Error handler
module.exports.initialize = (controller) => {
    return async (err, req, res, next) => {
        let status = err.status || 500;
        res.status(status).render('index', {
            globalData: controller,
            module: 'error',
            httpStatus: status
        });
    }
}
