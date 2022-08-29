/**
 * Issues.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
//estimate
name: 'issues',
  attributes: {
    project: {
      model: 'project',
    },
    title: {
      type: 'string',
      required: true,
    },
    issueType: {
      type: 'string',
      required: true,
      isIn: ['Task', 'Epic']
    },
    description: {
      type: 'string',
    },
    assignee: {
      type: 'string',
    },
    reporter: {
     type: 'string',
    },
    status: {
      type: 'string',
      defaultsTo: 'BACKLOG',
      isIn: ['BACKLOG', 'IN PROGRESS', 'SELECTED FOR DEVELOPMENT', 'DONE']
    },
    priority: {
      type:'string', 
      isIn: ['High', 'Medium', 'Low']
    },
    timeTracking: {
      type: 'number',
    }
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

