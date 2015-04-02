// var hapi = require('hapi');
// var server = new hapi.Server(); 
// // var sqlite3 = require('sqlite3');
// // var db = new sqlite3('./dindin.sqlite');

// server.connection({port: 4000});

// server.route({
// 	method: 'GET',
// 	path: '/echo',
// 	handler: function (req, reply) {
// 		reply({hello: 'World'}); 
// 		console.log(req);
// 		console.log(reply);
// 	}
// })

// db.all('SELECT * FROM recipes', function (err, results) {
//  
//    if (err) {                                                   //#A
//        throw err;                                               //#A
//    }                                                            //#A
//  
//    for(var i = 0; i < results.length; i++) {                    //#B
//        console.log(results[i].name);                            //#B
//    }                                                            //#B
// });
// 
// server.register({                                               //#A
//    register: require('good'),                                   //#B
//    options: {                                                   //#C
//        reporters: [{                                            //#D
//            reporter: require('good-console'),                   //#E
//            args:[{ response: '*' }]                             //#F
//        }]
//    }
// }, function (err) {                                             //#G
//  
//    if (err) {                                                   //#H
//        throw err;                                               //#H
//    }                                                            //#H
//  
//    server.start(function () {                                   //#I
//        console.log('Server running at:', server.info.uri);      //#J
//    });                                                          //#I
//  
// });
// 
// 
// 

var hapi = require('hapi');
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./dindin.sqlite');

var server = new hapi.Server();
server.connection({port: 4000});

server.route([{
	method: 'GET',
	path: '/api/recipes',
	handler: function(req, reply) {
		db.all('SELECT * FROM recipes', function(err, results) {
			if (err) { throw err; }

			reply(results);
		});
	}
}]);

server.start(function() {
	console.log('Server listening at ', server.info.uri);
});






































