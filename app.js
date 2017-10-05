"use strict";
/**
 * NodePress.js - NodeJS CMS
 * =====================
 * NodeJS app.js file
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @file:       app.js
 * @version:    0.1
 *
 * @license:    Code and contributions have 'GNU Affero General Public License v3'
 *              This program is free software: you can redistribute it and/or modify
 *              it under the terms of the GNU Affero General Public License as published by
 *              the Free Software Foundation, either version 3 of the License, or
 *              (at your option) any later version.
 *              This program is distributed in the hope that it will be useful,
 *              but WITHOUT ANY WARRANTY; without even the implied warranty of
 *              MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *              GNU Affero General Public License for more details.
 *              You should have received a copy of the GNU Affero General Public License
 *              along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @link        Homepage:     https://nodepressjs.ptkdev.io
 *              GitHub Repo:  https://github.com/nodepressjs
 *              README:       https://nodepressjs.ptkdev.io/README.md
 *              DOCS:         https://nodepressjs.ptkdev.io/docs/
 */

/**
 * NodeJS server library
 * =====================
 * Set config, library, template engine and nodejs port
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
var express = require('express'),
    compression = require('compression'),
    path = require('path'),
    mysql = require('mysql'),
    twig = require('twig'),
    md = require('mobile-detect'),
    apicache = require('apicache'),
    version = require(__dirname + '/version'),
    config = require(__dirname + '/config'),
    port = config.port,
    cache = apicache.middleware,
    app = express();

app.use(compression());
app.engine('html', twig.renderFile);
app.set('view engine', 'html');
app.set('view cache', true);
app.set('views', __dirname + '/themes/' + config.theme + '/views');
if (config.nginx === false) {
    app.use('/style', express.static(path.join(__dirname, 'themes/' + config.theme + '/css')));
    app.use('/js', express.static(path.join(__dirname, 'themes/' + config.theme + '/js')));
    app.use('/img', express.static(path.join(__dirname, 'themes/' + config.theme + '/img')));
    app.use('/assets', express.static(path.join(__dirname, 'themes/' + config.theme + '/assets')));
    app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
    app.use('/favicon.png', express.static(path.join(__dirname, 'themes/' + config.theme + '/img/favicon.png')));
    app.use('/favicon.ico', express.static(path.join(__dirname, 'themes/' + config.theme + '/img/favicon.ico')));
}
app.use('/cookie', express.static(path.join(__dirname, 'themes/' + config.theme + '/cookie.txt')));

/**
 * NodeJS mysql config
 * =====================
 * Change mysql password, host, user, database here
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @link:       https://github.com/felixge/node-mysql
 * @changelog:  0.1 initial release
 *
 */
var pool = mysql.createPool({
    connectionLimit: config.conn_limit,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

var view = function get_view(req, md, view) {
    var is_mobile = new md(req.headers['user-agent']);
    var tpl = view;

    return tpl;
}

function logger(err) {
    var d = new Date();
    var logtime = d.getUTCDate() + "/" + (d.getUTCMonth() + 1) + "/" + d.getUTCFullYear() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
    console.log("[" + logtime + "] " + err);
}

/**
 * Routes
 * =====================
 * Require routes and app.get function
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
require(__dirname + '/themes/' + config.theme + '/routes')(app, pool, config);
require(__dirname + '/routes/api')(app, pool, config, md, cache);
require(__dirname + '/routes/admin')(app, pool, config, md);
require(__dirname + '/routes/install')(app, pool, config, md);
require(__dirname + '/routes/update')(app, pool, config, md);
require(__dirname + '/routes/seo')(app, pool, config, md, path);
require(__dirname + '/routes/pages')(app, pool, config, md, view, cache);

/**
 * Start NodeJS Server
 * =====================
 * Status node js server
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
var server = app.listen(port);
logger("NodePress.js Server started on port " + port);

/**
 * Server errors
 * =====================
 * Not auto-kill nodejs on Exception
 *
 * @author:     Patryk Rzucidlo (@ptkdev) <info@ptkdev.it> https://ptkdev.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @changelog:  0.1 initial release
 *
 */
process.on('uncaughtException', function(err) {
    logger(err);
    if (server._handle !== null)
        server.close();
});

process.on('SIGTERM', function(err) {
    server.close();
});

process.on('SIGINT', function(err) {
    server.close();
});