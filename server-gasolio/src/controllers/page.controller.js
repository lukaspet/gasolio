const Page = require("../models/page.model.js");

// Create and Save a new Page
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pages
  const page = new Page({
    name: req.body.name,
    link: req.body.link,
    icon: req.body.icon,
  });

  // Save Pages in the database
  Page.create(page, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Page."
      });
    else res.send(data);
  });
};

// Update Pages
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Page.updateById(
    req.params.id,
    new Page(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Page with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Page with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Retrieve all Pages from the database.
exports.findAll = (req, res) => {
  Page.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pages."
      });
    else res.send(data);
  });
};

// Delete a Page with the specified id in the request
exports.delete = (req, res) => {
  Page.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Page with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Page with id " + req.params.id
        });
      }
    } else res.send({ message: `Page was deleted successfully!`, data });
  });
};

