module.exports = app => {
  const page = require("../controllers/page.controller.js");

  // Create a new Pages
  app.post("/gasolio/api/pages", page.create);

  // Update Pages with id
  app.put("/gasolio/api/pages/:id", page.update);

  // Retrieve all Pages
  app.get("/gasolio/api/pages", page.findAll);

  // Delete a Pages with id
  app.delete("/gasolio/api/pages/:id", page.delete);

};
