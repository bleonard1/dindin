
var hapi    = require('hapi');
var sqlite3 = require('sqlite3');
var db      = new sqlite3.Database('./dindin.sqlite');
var server  = new hapi.Server();

var validateFunc = function(token, cb) { // fn must be named as is.
	var sql = 'SELECT * FROM users WHERE token = ?';

	db.get(sql, [token], function(err, result) {
		// If query err'd, don't authenticate
		if (err) return cb(err, false);

		var user = result;

		// If no record found, don't authenticate
		if (typeof user === 'undefined') return cb(null, false);

		cb(null, true, {
			id: user.id,
			username: user.username
		})
	});
};

server.connection({port: 4000});
server.bind({db: db});

server.register(require('hapi-auth-bearer-token'), function(err) {
	
	if (err) throw err;

	server.auth.strategy('api', 'bearer-access-token', {
		validateFunc: validateFunc
	});

	// Some routes need reference to authentication, added after plugin loads
	server.route(require('./routes'));

	server.start(function() {
		console.log('Server listening at ', server.info.uri);
	});

});







































