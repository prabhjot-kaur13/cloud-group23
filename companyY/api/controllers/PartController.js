/**
 * PartsController
 *
 * @description :: Server-side actions for handling incoming req541uests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getParts541: function (req541, res541) {
    Parts.query("select * from Parts", (err, Parts, fields) => {
      if (err) {
        res541.send(500, { error: "Database Error" });
      }
      res541.view("PartsList", { Parts: Parts.rows });
    });
  },

  addPart541: function (req541, res541) {
    res541.view("add");
  },

  findPart541: function (req541, res541) {
    res541.view("find");
  },

  findAPart541: function (req541, res541) {
    Parts.query(
      "Select * from Parts where partId=$1",
      [req541.body.Part.partId],
      (err, Part541, fields) => {
        if (err) {
          res541.send(500, { error: "Database Error" });
        }
        res541.view("uniquePart", { Part: Part541.rows });
      }
    );
  },

  partExists541: function (req541, res541) {
    Parts.query(
      "Select * from Parts where partId=$1",
      [req541.body.partId],
      (err, Part541, fields) => {
        if (err) {
          res541.status(400).json({
            success: false,
            error: err.message,
          });
        }
        if (Part541.rows != "") {
          res541.status(200).json({
            success: true,
            Message: "Part ID exists",
          });
        } else {
          res541.status(404).json({
            success: false,
            Message: "Part ID does not exists",
          });
        }
      }
    );
  },

  createPart541: function (req541, res541) {
    Parts.query(
      "Insert into Parts values ($1, $2, $3)",
      [
        req541.body.Part.partId,
        req541.body.Part.partName,
        req541.body.Part.qoh,
      ],
      (err, response) => {
        if (err) {
          res541.send(500, { error: "Database Error" });
        }
        res541.redirect("/parts541/parts");
      }
    );
  },

  // deletePart541: function (req541, res541) {
  //   Parts.query(
  //     "Delete from Parts where PartName = $1 and partId = $2",
  //     [req541.params.PartName, req541.params.partId],
  //     (err) => {
  //       if (err) {
  //         res541.send(500, { error: "Database Error" });
  //       }
  //       res541.redirect("/Parts/Parts");
  //     }
  //   );
  //   return false;
  // },

  editPart541: function (req541, res541) {
    Parts.query(
      "Select * from Parts where partId=$1",
      [req541.params.partId],
      (err, Part541, fields) => {
        if (err) {
          res541.send(500, { error: "Database Error" });
        }
        res541.view("edit", { Part: Part541.rows });
      }
    );
    return false;
  },

  updatePart541: function (req541, res541) {
    Parts.query(
      "Update Parts set qoh=$2 where partId=$1",
      [req541.params.partId, req541.body.Part.qoh],
      (err, Parts, fields541) => {
        if (err) {
          res541.send(500, { error: "Database Error" });
        }
        res541.redirect("/parts541/parts");
      }
    );
    return false;
  },

  updatePartOrders541: function (req541, res541) {
    Orders.query(
      "Insert into PartOrders Values ($1, $2, $3, $4)",
      [
        req541.body.partId,
        req541.body.jobName,
        req541.body.userId,
        req541.body.qty,
      ],
      (err, PartOrders) => {
        if (err) {
          res541.send(500, { error: "Database Error" });
        }
        res541.send("Entry has been successfully added");
      }
    );
  },
};
