"use strict";
/**
 * Routes admin.js
 * =====================
 * Get all admin-pages from server
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
module.exports = function(app, pool, config, md) {
    app.get('/admin', function(req, res) {
        res.setHeader('content-type', 'text/html');
        res.render('index', {
            "config": config,
            "post": { "page-title": "Admin", "page-content": "Not allowed.", "page-url": "/" }
        });
    });
}