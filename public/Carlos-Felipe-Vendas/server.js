const express = require("express");
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json());

//adiciona pasta pública
app.use(express.static("Public"))

require("./src/index")(app);
app.listen(3333); //porta