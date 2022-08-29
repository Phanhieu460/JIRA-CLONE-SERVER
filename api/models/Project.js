/**
 * Project.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  name: 'project',
  attributes: {
    name:{
      type: 'string',
      required: true,
      unique: true
    },
    description: {
      type: 'string',
    },
    url: {
      type: 'string'
    },
    category: {
type: 'string'
    },
    issue: {
      collection: 'issues',
      via:'project'
    }
  },

};

