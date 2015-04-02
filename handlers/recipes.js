exports.find = function(req, reply) {

	var sql = 'SELECT * FROM recipes';
	var params = [];

	if (req.query.cuisine) {
		sql += ' WHERE cuisine = ? COLLATE NOCASE';
		params.push(req.query.cuisine);
	}

	this.db.all(sql, params, function(err, results) {
		if (err) throw err;
		reply(results);
	});

};

exports.findOne = function(req, reply) {
	var sql = 'SELECT * FROM recipes WHERE id = ?';

	this.db.get(sql, [req.params.id], function(err, result) {
		if (err) throw err;

		if (typeof result !== 'undefined') {
			reply(result);
		} else {
			reply ('Not found').code(404);
		}
	});
};

exports.create = function(req, reply) {
	var sql = 'INSERT INTO recipes (name, cooking_time, prep_time, serves, cuisine, ingredients, directions, user_id) VALUES (?,?,?,?,?,?,?,?)';

	this.db.run(sql, 
	[
		request.payload.name,
		request.payload.cooking_time,
		request.payload.prep_time,
		request.payload.serves,
		request.payload.cuisine,
		request.payload.ingredients,
		request.payload.directions,
		request.auth.credentials.id
	],
	function(err) {
		if (err) throw err;

		reply({status: 'ok'});
	});

}

//increment star rating by 1
exports.addStar = function(req, reply) {
	var sql = '';

	this.db.run(sql,
	[
	],
	function(err) {
		if (err) throw err;

		reply({status: 'ok'});
	});
}