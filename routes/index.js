"use strict";

const express = require('express');
const router = express.Router();

module.exports = function (config, lang, database, auth) {
    router.get('/:module?', async function (req, res) {
        if (req.params.module && config.installedModules.hasOwnProperty(req.params.module)) {
            let globalData = {
                config,
                lang,
                database,
                theme: 'default'
            }
            res.render('index', { globalData: globalData, module: req.params.module });
        } else {
            res.redirect('/' + config.general.defaultModule);
        }
    });
    return router;
}
