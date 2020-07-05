/**
 * JobsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const axios = require('axios');

module.exports = {
  
    list: function(req, res) {
        axios.get('http://companyx-env.eba-azstb5mp.us-east-1.elasticbeanstalk.com/API735/getJobs')
        .then(response => {
            console.log(response);
            res.send(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }
};

