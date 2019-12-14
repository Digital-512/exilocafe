const express = require('express');
const router = express.Router();

module.exports = function (config, lang, database, login) {
    router.get('/:module?', function (req, res) {
        if (req.params.module && config.installedModules.hasOwnProperty(req.params.module)) {
            res.render('index', { config, lang, database, module: req.params.module });
        } else {
            res.redirect('/' + main.config.general.defaultModule);
        }
    });
    return router;
}
