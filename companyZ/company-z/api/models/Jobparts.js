/**
 * Jobparts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    createdAt: false,
    updatedAt: false,
    partId: {
      type: 'number', required: true
    },
    jobName: {
      type: 'string', required: true
    },
    userId: {
      type: 'string', required: true
    },
    qty: {
      type: 'number', required: true,
    },
  },
  datastores: 'default',
};
