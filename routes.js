var recipes = require('./handlers/recipes');
var users   = require('./handlers/users');

module.exports = [{
	method: 'GET',
	path: '/api/recipes',
	handler: recipes.find
},
{
	method: 'GET',
	path: '/api/recipes/{id}',
	handler: recipes.findOne
},
{
	method: 'POST',
	path: '/api/recipes',
	config: {
		auth: 'api',
		payload: {
			output: 'data'
		}
	},
	handler: recipes.create
},
{
	method: 'POST',
	path: '/api/recipes/{id}/star',
	config: {
		auth: 'api',
		payload: {
			output: 'data'
		}
	},
	handler: recipes.addStar
},
{
	method:'GET',
	path: '/api/users', 
	handler: users.getUsers
}];