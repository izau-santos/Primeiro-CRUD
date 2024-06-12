import database from "../repository/mysql.js"

async function genero(genero){
    const add = "INSERT INTO tbl_genero(genero) VALUES(?)"

    const conn = await database.connect();
    await conn.query(add, genero);
    conn.end();
};

async function Puxargenero1(){
    const sql = "SELECT * FROM tbl_genero WHERE deletado = 0"

    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
};

async function Puxargenero2(id_genero){
    const sql = "SELECT * FROM tbl_genero WHERE deletado = 0 AND id_genero = ? "

    const conn = await database.connect();
    const [rows] = await conn.query(sql, id_genero);
    conn.end();

    return rows;
};

async function Atualizargenero(genero, id_genero){
    const sql = "UPDATE tbl_genero SET genero = ? WHERE id_genero = ?"
    
    const upgenero = [genero, id_genero];
    const conn = await database.connect();
    await conn.query(sql, upgenero)
    conn.end();
};

async function Deletargenero(id_genero){
    const sql = "UPDATE tbl_genero SET deletado = 1 WHERE id_genero = ?"

    const conn = await database.connect();
    await conn.query(sql, id_genero);
    conn.end();
};

async function Validargenero (genero){
    const sql = " SELECT * FROM tbl_genero WHERE genero = ? "

    const conn = await database.connect();
    const [rows] = await conn.query(sql, genero);
    conn.end();

    return rows;
};
export default {genero, Puxargenero1, Puxargenero2, Atualizargenero, Deletargenero, Validargenero};