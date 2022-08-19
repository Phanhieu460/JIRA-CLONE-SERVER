/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    'POST /user/login': 'UserController.login',
    'POST /user/register': 'UserController.register',
    

    //Project
    'POST /projects': 'ProjectController.create',
    'PATCH /projects/:id': 'ProjectController.update',
    'DELETE /projects/:id': 'ProjectController.delete',


    //Issue
    'GET /issues': 'IssuesController.getAll',
    'POST /issues': 'IssuesController.create',
    'DELETE /issues/:id': 'IssuesController.delete',
    'PATCH /issues/:id': 'IssuesController.update'
};
