"use strict";
/**
 * Routes pages.js
 * =====================
 * Get all pages from server
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
module.exports = function(app, pool, config, md, view, cache) {
    app.get(':page', cache('30 days'), function(req, res) {
        var tpl = view(req, md, "index");
        pool.getConnection(function(err, connection) {
            if (err !== null) {
                res.setHeader('content-type', 'text/html');
                res.status(404).render(tpl, {
                    "config": config,
                    "post": { "page-title": "Error " + err.errno, "page-content": err.code, "page-url": "/" }
                });
            } else {
                connection.query('SELECT * FROM `' + config.dbprefix + '_pages` WHERE `page-url` = ?', [req.path], function(err, rows) {
                    if (err === null && rows.length != 0) {
                        res.setHeader('content-type', 'text/html');
                        res.render(tpl, {
                            "config": config,
                            "post": rows[0]
                        });
                    } else {
                        res.setHeader('content-type', 'text/html');
                        res.status(404).render(tpl, {
                            "config": config,
                            "post": { "page-title": "Error 404", "page-content": "Not Found.", "page-url": "/" }
                        });
                    }
                    connection.release();
                });
            }

        });
    });
}