"use strict";

const express = require('express');
const router = express.Router();

module.exports = (controller) => {
    let config = controller.config;
    router.get('/:module?', async (req, res) => {
        if (req.params.module && config.installedModules.hasOwnProperty(req.params.module)) {
            res.render('index', {
                globalData: controller,
                module: req.params.module,
                httpStatus: res.statusCode
            });
        } else {
            res.redirect('/' + config.general.defaultModule);
        }
    });
    return router;
}
