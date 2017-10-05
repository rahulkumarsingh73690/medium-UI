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
module.exports = function(app, pool, config, md, path) {
    app.get('/sitemap.xml', function(req, res) {
        pool.getConnection(function(err, connection) {
            if (err !== null) {
                res.setHeader('content-type', 'text/html');
                res.status(404).render('index', {
                    "config": config,
                    "post": { "page-title": "Error 404", "page-content": "Not Found.", "page-url": "/" }
                });
            } else {
                connection.query('SELECT * FROM `' + config.dbprefix + '_pages`', function(err, rows) {
                    if (err === null && rows.length != 0) {
                        var sitemap = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">';
                        for (var key in rows) {
                            sitemap += '<url>';
                            if (rows[key]['page-url'] == "/")
                                sitemap += '<loc>' + config['site-url'] + '</loc>';
                            else
                                sitemap += '<loc>' + config['site-url'] + rows[key]['page-url'] + '</loc>';
                            sitemap += '<changefreq>weekly</changefreq>';
                            sitemap += '<lastmod>2015-01-03</lastmod>';
                            if (rows[key]['page-url'] == "/")
                                sitemap += '<priority>1.0</priority>';
                            else
                                sitemap += '<priority>0.8</priority>';
                            sitemap += '</url>';
                        }
                        sitemap += '</urlset>';
                        res.setHeader('content-type', 'application/xml');
                        res.send(sitemap);
                    } else if (rows.length == 0) {
                        res.setHeader('content-type', 'text/html');
                        res.status(404).render('index', {
                            "config": config,
                            "post": { "page-title": "Error 404", "page-content": "Not Found.", "page-url": "/" }
                        });
                    }
                    connection.release();
                });
            }
        });
    });

    app.get('/robots.txt', function(req, res) {
        res.setHeader('content-type', 'text/plain');
        res.sendFile(path.join(__dirname, '../robots.txt'));
    });
}