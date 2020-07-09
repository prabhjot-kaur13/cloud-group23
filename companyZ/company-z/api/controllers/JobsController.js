/**
 * JobsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const axios = require('axios');

module.exports = {

  list: function(req, res) {
    // axios.get('http://companyx-env.eba-azstb5mp.us-east-1.elasticbeanstalk.com/API735/getJobs')
    // .then(response => {
    //     console.log(response);
    //     // res.send(response.data);
    //     res.view('pages/list', {jobs: response.data})
    // })
    // .catch(error => {
    //     console.log(error);
    // });
    let data = [{'id':'job383','partId':383,'qty':33},
      {'id':'job383','partId':384,'qty':35},
      {'id':'job541','partId':541,'qty':55},
      {'id':'job691','partId':691,'qty':66},
      {'id':'job705','partId':705,'qty':78},
      {'id':'job735','partId':735,'qty':77},
      {'id':'job930','partId':930,'qty':99}];
    res.view('pages/list', {jobs: data});
  },

  parts: function(req, res) {
    let jobName = req.params.jobName;
    // let parts = {"partId": [383, 384]};
    // axios.post('http://129.173.67.218:1337/viewParts', parts)
    // .then(response => {
    //     console.log(response);
    //     // res.send(response.data);
    //     res.view('pages/parts', {parts: response.data, jobName: jobName});
    // })
    // .catch(error => {
    //     console.log(error);
    // });

    let jobDetails = [{"id":"job383","partId":383,"qty":33},
      {"id":"job383","partId":384,"qty":35}];
    let partDetails = [{"partid":383,"partName":"mouse","qoh":38},
      {"partid":384,"partName":"printer","qoh":30}];

    res.view('pages/parts', {parts: partDetails, jobDetails: jobDetails, jobName: jobName});
  },

  validate: async function (req, res) {
    var job = await Users.findOne({id:req.body.username, password:req.body.password}).intercept((err)=>{
      err.message = 'Uh oh: '+err.message;
      return res.status(400).send(err.message);
    });
    if(job === undefined){
      res.status(404).send('Invalid Credentials');
      // res.view('pages/order', {message: 'Invalid Credentials'});
    }
    else{
      res.status(200).send('Valid Credentials');
      // res.view('pages/order', {message: 'Order Successful'});
    }
  },

  validateOrder: async function (req, res) {
    console.log(req.body);
    let username = req.body.username;
    let postData = JSON.parse(req.body.parts);
    let partOrders = [];

    let existingOrders = await Jobparts.find({
        jobName: postData.jobName,
        userId: username,
        result: true
    }).intercept((err) => {
        err.message = 'Uh oh: '+err.message;
        return res.status(400).send(err.message);
    });
    console.log(existingOrders);
    if (existingOrders.length > 0) {
        // return res.status(400).send("Due to high demand, we are only allowing ordering of one job per user.");
        return res.view('pages/order', {
          result: 'failure',
          message: 'Due to high demand, we are only allowing ordering of one job per user'
        });
    }
    
    let orderSuccess = postData.tableData.every(element => element.qoh >= element.qty);

    let datetime = new Date().toISOString();
    postData.tableData.forEach(element => {
      partOrders.push({
        jobName: postData.jobName,
        userId: username,
        partId: parseInt(element.partId),
        qty: parseInt(element.qty),
        date: datetime.slice(0,10),
        time: datetime.slice(11,19),
        result: orderSuccess
      });
    });

    let orders = await Jobparts.createEach(partOrders).fetch().intercept((err) => {
      err.message = 'Uh oh: '+err.message;
      return res.status(400).send(err.message);
    });

    console.log("order rows: " + orders.length);

    if (orderSuccess === true) {
      console.log({partOrders});

      //Inform company X about the successful order
      // axios.post('http://companyx-env.eba-c2pbkmaf.us-east-1.elasticbeanstalk.com/API735/createPartsOrder', partOrders)
      //   .then(response => {
      //     console.log("=================Company X success begin===================");
      //     console.log(response);
      //     console.log("=================Company X success end===================");
      //   })
      //   .catch(error => {
      //     console.log("=================Company X failed begin===================");
      //     console.log(error);
      //     console.log("=================Company X failed end===================");
      //   });

        //Inform company Y about the successful order
        // axios.post('http://129.173.67.223:3000/parts541/updatePartOrders', {orders: partOrders})
        // .then(response => {
        //   console.log("=================Company Y success begin===================");
        //   console.log(response);
        //   console.log("=================Company Y success end===================");
        // })
        // .catch(error => {
        //   console.log("=================Company Y failed begin===================");
        //   console.log(error);
        //   console.log("=================Company Y failed end===================");
        // });

      res.view('pages/order', {
        result: 'success',
        message: 'Order Placed Successfully!'
      });
      // res.status(200).send("Order Placed Successfully!");
    } else {
      res.view('pages/order', {
        result: 'failure',
        message: 'Sorry, order could not be placed due to unavailability of parts :('
      });
      // res.status(400).send("Sorry, order could not be placed due to unavailability of parts");
    }
  }
};
