module.exports = app => {
  const pompa = require("../controllers/pompa.controller.js");

  // Create a new Pompa
  app.post("/gasolio/api/pompa", pompa.create);

  // Update Pompa with id
  app.put("/gasolio/api/pompa/:id", pompa.update);

  // Retrieve all Pompa
  app.get("/gasolio/api/pompa", pompa.findAll);

  // Delete a Pompa with id
  app.delete("/gasolio/api/pompa/:id", pompa.delete);

};
