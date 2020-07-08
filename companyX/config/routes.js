module.exports.routes= { 
  "/":{ view:"pages/homepage"},
  "GET /API735/getJobs":"LabController.getJobs",
  "GET /API735/getJobInfo/:jobid/:partid":"LabController.getJobByID",
  "GET /API735/getJobByJobName/:jobid":"LabController.getJobByJobName",
  "POST /API735/createJob":"LabController.createJob",
  "POST /API735/deleteJob":"LabController.deleteJob",
  "POST /API735/createPartsOrder":"LabController.createPartOrder",

  "PUT /API735/updateJob":"LabController.updateJob",
  "GET /viewData":"LabController.viewData",
  "GET /addData":{ view:"pages/addData"},
  "POST /addData":"LabController.addData"
};
