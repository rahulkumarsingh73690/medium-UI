"use strict";
/**
 * Routes api.js
 * =====================
 * Get all pages from server (ajax request)
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
module.exports = function(app, pool, config, md, cache) {
    app.get('/api/*', cache('30 days'), function(req, res) {
        pool.getConnection(function(err, connection) {
            if (err !== null) {
                res.setHeader('content-type', 'application/json');
                res.status(404).send('{ "page-title":"Error "+err.errno, "page-content":err.code, "page-url":"/"}');
            } else {
                var str = req.url;
                var url = str.split("/");
                var page = "/" + url[4];
                if (page === "/?source=fb_ads")
                    page = "/";
                connection.query('SELECT * FROM `' + config.dbprefix + '_pages` WHERE `page-url` = ?', [page], function(err, rows) {
                    if (err === null && rows.length != 0) {
                        res.setHeader('content-type', 'application/json');
                        res.send(rows[0]);
                    } else {
                        res.setHeader('content-type', 'application/json');
                        res.status(404).send('{ "page-title":"Error 404", "page-content":"Not Found.", "page-url":"/"}');
                    }
                    connection.release();
                });
            }
        });
    });
}