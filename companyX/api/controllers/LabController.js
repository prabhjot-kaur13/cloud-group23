module.exports = {

    getJobs: async function(req, res) {
        let jobs735 = await jobsModel.find();
        let jobsArr = [];
        jobs735 = jobs735.filter(job => {
            if(jobsArr.includes(job.id)) {
                return false;
            } else {
                jobsArr.push(job.id);
                return true;
            }
        });
        res.send (jobs735);
    },
    getJobByID: async function(req, res){
        const jobid = req.params.jobid;
        const partid = parseInt(req.params.partid);
        let jobInfo = await jobsModel.findOne({id: jobid, partId: partid});
        console.log (`jobinfo:${jobInfo}`);
        if(!jobInfo) {
            res.status (404).send(`Job with given jobId:${jobid} and partId:${partid} not found...`);
        } else {
            res.send(jobInfo);
        }
    },
    getJobByJobName: async function(req, res){
        const jobid = req.params.jobid;
        let jobInfo = await jobsModel.find({id: jobid});
        console.log (`jobinfo:${jobInfo}`);
        if(jobInfo.length == 0) {
            res.status (404).send(`Job with given jobId:${jobid} not found...`);
        } else {
            res.send(jobInfo);
        }
    },
    createJob: async function(req, res) {
        if (req.body && req.body.jobId && req.body.partId && req.body.qty) {
            const jobid = req.body.jobId;
            const partid = parseInt(req.body.partId);
            const qty = parseInt(req.body.qty);
            let jobInfo = await jobsModel.findOne({id: jobid, partId: partid});
            console.log(jobid + " "+ partid);
            console.log (`jobinfo:${jobInfo}`);
            if(!jobInfo) {
              await jobsModel.create({
                id: jobid,
                partId: partid,
                qty
            });
              res.send(`New job with jobId:${jobid} and partId:${partid} created successfully`);
            } else {
              res.status (404).send(`Job with given jobId:${jobid}  and partId:${partid} already exists`);
            }
        } else {
            res.status(404).send(`Parameters missing in request body!`);
        }
    },
    updateJob: async function(req, res) {
        if (req.body && req.body.jobId && req.body.partId && req.body.qty) {
            const jobid = req.body.jobId;
            const partid = parseInt(req.body.partId);
            const qty = parseInt(req.body.qty);
            let jobInfo = await jobsModel.findOne({id: jobid, partId: partid});
            console.log (`jobinfo:${jobInfo}`);
            if(jobInfo) {
                await jobsModel.update({id: jobid, partId: partid}).set({
                    qty:qty
                });
                res.send(`Quantity with jobId:${jobid} and partId:${partid} updated successfully!`);
            } else {
              res.status (404).send(`Job with given with jobId:${jobid} and partId:${partid} does not exist!`);
            }
        } else {
            res.status(404).send(`Parameters missing in request body!`);
        }
    },
    viewData: async function(req, res) {
        let jobs735 = await jobsModel.find();
        if(!jobs735) {
            res.send("Cannot find anything to show!");
        }
        if(jobs735) {
            res.view("pages/viewData", {jobs735:jobs735});
        }
    },
    addData: async function(req, res) {
        const jobid = req.body.jobId;
        const partid = parseInt(req.body.partId);
        const qty = parseInt(req.body.qty);
        let jobInfo = await jobsModel.findOne({id: jobid, partId: partid});
        console.log(jobid + " "+ partid);
        console.log (`jobinfo:${jobInfo}`);
        if(!jobInfo) {
            await jobsModel.create({
                id: jobid,
                partId: partid,
                qty
            });
        res.redirect("/viewData");
        } else {
            res.status (404).send(`Job with given jobId:${jobid}  and partId:${partid} already exists`);
        }
    }
}