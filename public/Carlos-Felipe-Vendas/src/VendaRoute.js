const vendasController = require("./vendasController");

module.exports = (app) => {
    app.post("/venda", vendasController.post);
    app.put("/venda/:id", vendasController.put);
    app.get("/venda", vendasController.get)
    app.get("/venda/:id", vendasController.getById)
    app.delete("/venda/:id", vendasController.delete)
}

