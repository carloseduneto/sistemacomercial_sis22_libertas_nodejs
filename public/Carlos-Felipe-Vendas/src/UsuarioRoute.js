const usuarioController = require("./usuarioController");

module.exports = (app) => {
    app.post("/usuario", usuarioController.post);
    app.put("/usuario/:id", usuarioController.put);
    app.get("/usuario", usuarioController.get)
    app.get("/usuario/:id", usuarioController.getById)
    app.delete("/usuario/:id", usuarioController.delete)
}