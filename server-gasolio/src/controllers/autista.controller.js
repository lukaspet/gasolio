const Autista = require("../models/autista.model.js");

// Create and Save a new Autista
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Automezzo
  const autista = new Autista({
    tesseraAutista: req.body.tesseraAutista,
    cognome: req.body.cognome,
    nome: req.body.nome,
    filialeId: req.body.filialeId
  });

  // Save Autista in the database
  Autista.create(autista, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Autista."
      });
    else res.send(data);
  });
};

// Update Autista
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Autista.updateById(
    req.params.id,
    new Autista(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Autista with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Autista with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Retrieve all Autista from the database.
exports.findAll = (req, res) => {
  Autista.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving autista."
      });
    else res.send(data);
  });
};

// Delete a Autista with the specified id in the request
exports.delete = (req, res) => {
  Autista.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Autista with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Autista with id " + req.params.id
        });
      }
    } else res.send({ message: `Autista was deleted successfully!`, data });
  });
};

