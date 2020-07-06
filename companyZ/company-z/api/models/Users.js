/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    updatedAt: false,
    createdAt: false,
    id: {
      type: 'string',
      columnName: 'user',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },
  datastores: 'default',
};

