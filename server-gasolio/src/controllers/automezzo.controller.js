const Automezzo = require("../models/automezzo.model.js");

// Create and Save a new Automezzo
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Automezzo
  const automezzo = new Automezzo({
    tagMezzo: req.body.tagMezzo,
    targa: req.body.targa,
    marcaModello: req.body.marcaModello,
    tipoAutomezzoId: req.body.tipoAutomezzoId,
    kmOre: req.body.kmOre,
    freqTagliando: req.body.freqTagliando,
    kmUltimoTagliando: req.body.kmUltimoTagliando,
    scadenzaBollo: req.body.scadenzaBollo,
    scadenzaAssicurazione: req.body.scadenzaAssicurazione,
    scadenzaCollaudo: req.body.scadenzaCollaudo,
    filialeId: req.body.filialeId,
    kmUltimoRifornimento: req.body.kmUltimoRifornimento,
    fringeBenefit: req.body.fringeBenefit,
    accise: req.body.accise,
    scadenzaTachigrafo: req.body.scadenzaTachigrafo,
  });

  // Save Automezzo in the database
  Automezzo.create(automezzo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Automezzo."
      });
    else res.send(data);
  });
};

// Update Automezzo
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Automezzo.updateById(
    req.params.id,
    new Contact(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Automezzo with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Automezzo with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Retrieve all Automezzo from the database.
exports.findAll = (req, res) => {
  Automezzo.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving automezzo."
      });
    else res.send(data);
  });
};

// Delete a Automezzo with the specified id in the request
exports.delete = (req, res) => {
  Automezzo.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Automezzo with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Automezzo with id " + req.params.id
        });
      }
    } else res.send({ message: `Automezzo was deleted successfully!`, data });
  });
};

