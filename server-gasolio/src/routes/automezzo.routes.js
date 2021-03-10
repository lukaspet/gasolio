module.exports = app => {
  const automezzo = require("../controllers/automezzo.controller.js");

  // Create a new Automezzo
  app.post("/gasolio/api/automezzo", automezzo.create);

  // Update Automezzo with id
  app.put("/gasolio/api/automezzo/:id", automezzo.update);

  // Retrieve all Automezzo
  app.get("/gasolio/api/automezzo", automezzo.findAll);

  // Delete a Automezzo with id
  app.delete("/gasolio/api/automezzo/:id", automezzo.delete);

};
