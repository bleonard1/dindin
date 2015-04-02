exports.getUsers = function(req, reply) {

	this.db.all('SELECT * FROM users', function(err, results) {
		if (err) throw err;
		reply(results);
	});

};