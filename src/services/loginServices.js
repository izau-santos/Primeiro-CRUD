import database from "../repository/mysql.js";

async function ValidateLogin (email, password){
    const sql = "SELECT * FROM tbl_usuario WHERE email = ? AND senha = ? AND deletado = 0";

    const data = [email, password];
    const conn = await database.connect();
    const [rows] = await conn.query(sql, data);
    conn.end();

    return rows;
};

export default {ValidateLogin};