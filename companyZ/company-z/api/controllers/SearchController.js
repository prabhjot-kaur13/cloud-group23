/**
 * SearchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

module.exports = {
  
  search: async function (req, res) {
    var job = req.body.jobName;
    axios.get('http://companyx-env.eba-c2pbkmaf.us-east-1.elasticbeanstalk.com/API735/getJobByJobName/'+job)
    .then(response => {
      if (response.status == 404){
        console.log("No such job exits");
      }
      else if (response.status == 200){
        console.log("Job exits");
      }
    })
    .catch(error => {
      console.log(error);
    });
  //   let datetime = new Date().toISOString();
  //   await Search.create({jobName: job, date: datetime.slice(0,10), time: datetime.slice(11, 19)}).intercept((err)=>{
  //     err.message = 'Uh oh: '+err.message;
  //     return res.status(400).send(err.message);
  //   });
    res.status(200).send("Search item Created");

  },

};

