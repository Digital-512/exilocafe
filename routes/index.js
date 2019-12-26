const express = require('express');
const router = express.Router();

module.exports = function (config, lang, database, auth) {
    router.get('/:module?', function (req, res) {
        if (req.params.module && config.installedModules.hasOwnProperty(req.params.module)) {
            res.render('index', { config: config, lang: lang, database: database, module: req.params.module });
        } else {
            res.redirect('/' + config.general.defaultModule);
        }
    });
    return router;
}
