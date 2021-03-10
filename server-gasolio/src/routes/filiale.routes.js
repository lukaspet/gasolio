module.exports = app => {
  const filiale = require("../controllers/filiale.controller.js");

  // Create a new Filiale
  app.post("/gasolio/api/filiale", filiale.create);

  // Update Filiale with id
  app.put("/gasolio/api/filiale/:id", filiale.update);

  // Retrieve all Filiali
  app.get("/gasolio/api/filiale", filiale.findAll);

  // Delete a Filiale with id
  app.delete("/gasolio/api/filiale/:id", filiale.delete);

};
