module.exports = app => {
  const tipoAutomezzo = require("../controllers/tipo.automezzo.controller.js");

  // Create a new Filiale
  app.post("/gasolio/api/tipo-automezzo", tipoAutomezzo.create);

  // Update Filiale with id
  app.put("/gasolio/api/tipo-automezzo/:id", tipoAutomezzo.update);

  // Retrieve all Filiali
  app.get("/gasolio/api/tipo-automezzo", tipoAutomezzo.findAll);

  // Delete a Filiale with id
  app.delete("/gasolio/api/tipo-automezzo/:id", tipoAutomezzo.delete);

};
