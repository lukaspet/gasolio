const TipoAutomezzo = require("../models/tipo.automezzo.model.js");

// Create and Save a new TipoAutomezzo
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a TipoAutomezzo
  const tipoAutomezzo = new TipoAutomezzo({
    tipoAutomezzo: req.body.tipoAutomezzo,
  });

  // Save TipoAutomezzo in the database
  TipoAutomezzo.create(tipoAutomezzo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TipoAutomezzo."
      });
    else res.send(data);
  });
};

// Update TipoAutomezzo
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  TipoAutomezzo.updateById(
    req.params.id,
    new TipoAutomezzo(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found TipoAutomezzo with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating TipoAutomezzo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Retrieve all TipoAutomezzo from the database.
exports.findAll = (req, res) => {
  TipoAutomezzo.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tipoAutomezzo."
      });
    else res.send(data);
  });
};

// Delete a TipoAutomezzo with the specified id in the request
exports.delete = (req, res) => {
  TipoAutomezzo.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TipoAutomezzo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete TipoAutomezzo with id " + req.params.id
        });
      }
    } else res.send({ message: `TipoAutomezzo was deleted successfully!` });
  });
};

