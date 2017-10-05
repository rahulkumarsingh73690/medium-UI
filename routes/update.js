"use strict";
/**
 * Routes update.js
 * =====================
 * Update NodePress.js database schema.
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
module.exports = function(app, pool, config, md) {
    app.get('/update', function(req, res) {
        res.setHeader('content-type', 'text/html');
        res.render('index', {
            "config": config,
            "post": { "page-title": "Update Database", "page-content": "Successful!", "page-url": "/" }
        });
    });
}