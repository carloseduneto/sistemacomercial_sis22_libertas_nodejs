async function connect() {
    if (global.connection && global.connection.state !== "disconnected")
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        {
            host: "54.91.193.137", user: "libertas",
            password: "123456", database: "libertas5per"
        }
    );
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

exports.post = async (req, res, next) => {
    const conn = await connect();
    const sql = "INSERT INTO venda (numeronf, data, quantidade, valor, comissao, idcliente, idproduto) VALUES (?,?,?,?,?,?,?)";

    const values = [req.body.numeronf, req.body.data, req.body.quantidade, req.body.valor, req.body.comissao, req.body.idcliente, idproduto];
    await conn.query(sql, values)
    
    res.status(201).send('Rota POST');
};


exports.put = async (req, res, next) => {
    const conn = await connect();
    let id = req.params.id;
    const sql = "UPDATE venda SET numeronf=?, data=?, quantidade=? ,valor=?, comissao=?, idcliente=?, idproduto=? WHERE idvenda=?";
    
    const values = [req.body.numeronf, req.body.data, req.body.quantidade, req.body.valor, req.body.comissao, req.body.idcliente, idproduto];
    console.log(values)
    await conn.query(sql, values)
    console.log(id)
    
    res.status(201).send(`Rota PUT com ID! ${id}`);
}

exports.delete = async(req, res, next) => {
    let id = req.params.id;
    const conn = await connect();
    const sql = "DELETE FROM venda WHERE idvendas = ?";
    const values = [id];
    
    await conn.query(sql, values)
    res.status(200).send("Rota DELETE com ID! " + id);
}

exports.get = async (req, res, next) => {
    const conn = await connect();
    const pesquisa = req.query.pesquisa;
    const sql = "SELECT * FROM venda " +
                        " WHERE numeronf like ? " +
                        " ORDER BY numeronf";
    const values = ["%" + pesquisa + "%"]
    const [valores] = await conn.query(sql, values)
    res.status(200).send(valores);
}



exports.getById = async(req, res, next) => {
    let id = req.params.id;
    const conn = await connect();
    const sql = "SELECT * FROM venda WHERE idvenda = " + id;

    var [valoresID] = await conn.query(sql)

    if (valoresID.length > 0) {
        res.status(200).send(valoresID[0]);
    } else {
        res.status(404).send("ID não existe");
        
    }

}







