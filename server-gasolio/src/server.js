const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();

// Init environment
dotenv.config();

app.use(cors());
// var corsOptions = {
//   origin: "http://localhost:3120"
// };

// app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
const PORT = process.env.PORT || 3220;
require("./routes/automezzo.routes.js")(app);
require("./routes/autista.routes.js")(app);
require("./routes/filiale.routes.js")(app);
require("./routes/tipo.automezzo.routes.js")(app);
require("./routes/page.routes.js")(app);
require("./routes/pompa.routes.js")(app);
// set port, listen for requests
app.listen(PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
