/**
 * Issues.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
//project, priority, estimate
  attributes: {
    title: {
      type: 'string',
      required: true,
      unique: true
    },
    issueType: {
      type: 'string',
      required: true,
      isIn: ['Task', 'Bug']
    },
    description: {
      type: 'string',
    },
    assignee: {
      type: 'string',
      required: true
    },
    reporter: {
      type: 'string',
      required: true
    },
    status: {
      type: 'string',
      required: true,
      isIn: ['To Do', 'In Progress', 'Testing', 'Cancel', 'Done']
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

