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
    'GET /user/listUser': 'UserController.getAll',
    'GET /user/:id': 'UserController.getUserById',
    'PATCH /user/:id': 'UserController.update',
    

    //Project
    'GET /projects': 'ProjectController.getAllProject',
    'GET /projects/:id': 'ProjectController.getProjectById',
    'POST /projects': 'ProjectController.create',
    'PATCH /projects/:id': 'ProjectController.update',
    'DELETE /projects/:id': 'ProjectController.delete',


    //Issue
    'GET /issues/:projectId/listIssue': 'IssuesController.getAll',
    'POST /issues': 'IssuesController.create',
    'DELETE /issues/:id': 'IssuesController.delete',
    'PATCH /issues/:id': 'IssuesController.update',
    'GET /projects/:id/issues/search': 'IssuesController.search'
};
