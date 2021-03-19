const Pompa = require("../models/pompa.model.js");

// Create and Save a new Pompa
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pompa
  const pompa = new Pompa({
    numeroPompa: req.body.numeroPompa,
    filialeId: req.body.filialeId,
    giacenza: req.body.giacenza,
  });

  // Save Pompa in the database
  Pompa.create(pompa, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pompa."
      });
    else res.send(data);
  });
};

// Update Pompa
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Pompa.updateById(
    req.params.id,
    new Pompa(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pompa with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Pompa with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Retrieve all Pompa from the database.
exports.findAll = (req, res) => {
  Pompa.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pompa."
      });
    else res.send(data);
  });
};

// Delete a Pompa with the specified id in the request
exports.delete = (req, res) => {
  Pompa.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pompa with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Pompa with id " + req.params.id
        });
      }
    } else res.send({ message: `Pompa was deleted successfully!`, data });
  });
};

