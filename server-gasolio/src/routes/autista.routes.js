module.exports = app => {
  const autista = require("../controllers/autista.controller.js");

  // Create a new Autista
  app.post("/gasolio/api/autista", autista.create);

  // Update Autista with id
  app.put("/gasolio/api/autista/:id", autista.update);

  // Retrieve all Autista
  app.get("/gasolio/api/autista", autista.findAll);

  // Delete a Autista with id
  app.delete("/gasolio/api/autista/:id", autista.delete);

};
