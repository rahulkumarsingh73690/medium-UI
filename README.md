# NodePress.js

NodePress.js is a small nodejs-cms with use of HTML5 pushState for get content items (without refrash pages).
The project relies small alternative of Wordpress, Joomla and other "fat" cms.

## Install
* Download: `git clone --recursive git@github.com:nodepressjs/nodepressjs.git`
* Linux packages: `sudo apt-get install nodejs npm mariadb-server`
* Rename `config.js.tpl` to `config.js` and edit file.
* Install nodejs packages: `sudo npm install`
* Run nodejs in development-mode: `sudo npm run start-dev app.js`
* Install clean database, run: `http://localhost:8080/install` (8080 is default port on config.js.tpl)

## What does it do?

* Simply installation/use.
* CMS without refrash page.
* Mobile version with responsive and standalone.
* Simply development for small project and website.
* Security with pdo, regex and.
* Personalizable and scalable.

## Browser support (default theme only)

* Google Chrome (latest)
* Mozilla Firefox (latest)
* Apple Safari 6+
* Internet Explorer 8+

## Using the github issue tracker

The issue tracker is the preferred channel, but please respect the following restrictions:

* Please **do not** use the issue tracker for personal support requests.

* Please **do not** derail or troll issues. Keep the discussion on topic and respect the opinions of others.

## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful, thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** – check if the issue has already been reported.

2. **Check if the issue has been fixed in stable release** – try to reproduce it using
   the latest `master` branch in the repository.

2. **Check if the issue has been fixed in develop release** – try to reproduce it using
   the latest `develop` branch in the repository.

4. **Isolate the problem** – create a live example and [write issue](https://github.com/nodepressjs/issues)
   on nodepressjs official repository.

### Documentation

Documentation is code. Directory "docs" have convert code-comments with phpdoc lib.
Guidelines for good code-comment, example:

```
/**
 * Test Function
 * =====================
 * Test function description, example for good code-comment.
 *
 * @author:     Patryk Rzucidlo (@PTKDev)         <info@ptkdev.it> https://ptkdev.it
 * 				Test User       (@twitter_accunt) <emailme@gmail.com> http://www.mywebsite.it
 * @license:    This code and contributions have 'GNU Affero General Public License v3'
 * @version:    0.1
 * @category:   test
 * @reference:  https://nodepressjs.ptkdev.io/docs/test.html#test_func
 *
 * @param:      int    $id   mysql id of name
 * 				string $name name of user
 *
 * @return:		bool   true: id and name exist on database. false: not find it.
 *
 * @errors:     string "err_config_empty"                    empty array of configs
 *
 * @changelog:  0.2 add err_config_empty
 *				v0.1 initial release
 *
 */
function test($id, $name){
	<-- CODE HERE -->

	return false;
}
```

## GIT Branches
- `master` is the latest, deployed version.
- `beta` is merge from develop branch (if is stable) and receved only hotfix.
- `develop` is where development happens and all pull requests should be submitted.

## License

GNU Affero General Public License v3 - [read me](http://www.gnu.org/licenses/agpl-3.0.html)

## Acknowledgements

NodePress.js is a project by [Patryk Rzucidlo (PTKDev)](https://ptkdev.it)
