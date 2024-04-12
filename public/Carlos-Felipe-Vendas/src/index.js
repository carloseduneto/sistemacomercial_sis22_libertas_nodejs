const usuarioRoute = require("./UsuarioRoute");
const VendaRoute = require("./VendaRoute");

module.exports = app => {
    usuarioRoute(app);
    VendaRoute(app);
};


