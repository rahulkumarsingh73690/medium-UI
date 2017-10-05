"use strict";
/**
 * Routes install.js
 * =====================
 * First install of database
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
module.exports = function(app, pool, config, md) {
    app.get('/install', function(req, res) {
        pool.getConnection(function(err, connection) {
            connection.query("CREATE TABLE `" + config.database + "`." + config.dbprefix + "`_pages` (`page-id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'unique id of page',`page-title` VARCHAR(140) NULL COMMENT 'title of page',`page-content` LONGTEXT NULL COMMENT 'html content of page',`page-url` VARCHAR(140) NULL COMMENT 'url of page, home page is single slash',`page-image` VARCHAR(140) NULL COMMENT 'name of image of header post',PRIMARY KEY (`page-id`)  COMMENT '')", function(err, rows) {});
            connection.release();
        });
        res.setHeader('content-type', 'text/html');
        res.render('index', {
            "config": config,
            "post": { "page-title": "First Install", "page-content": "Successful!", "page-url": "/" }
        });
    });
}