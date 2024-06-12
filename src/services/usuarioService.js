import database from '../repository/mysql.js';


async function Deletardados (id_usuario) {
    const sql = "UPDATE tbl_usuario SET deletado = 1 WHERE id_usuario = ?"

    const conn = await database.connect();
    conn.query(sql, id_usuario);
    conn.end();
};

async function Puxardados1(){
    const sql = "SELECT * FROM tbl_usuario WHERE deletado = 0";
    
    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

async function Puxardados2(id_usuario){
    const sql = "SELECT * FROM tbl_usuario WHERE deletado = 0 AND id_usuario = ?";
    
    const conn = await database.connect();
    const [rows] = await conn.query(sql, id_usuario);
    conn.end();

    return rows;
}

async function createUser(email, senha, nome, tipoUsuario){
    const sql = "INSERT INTO tbl_usuario(email, nome, senha, tipo_usuario) VALUES(?,?,?,?)"

    const dataUser = [email, senha, nome, tipoUsuario];
    const conn = await database.connect();
    await conn.query(sql, dataUser);
    conn.end();
}

async function atualizarDados (email, nome, senha, tipoUsuario, id_usuario){
    const up = "UPDATE tbl_usuario SET email = ?, nome = ?, senha = ?, tipo_Usuario = ? WHERE id_usuario = ?"

    const updata = [email, nome, senha, tipoUsuario, id_usuario];
    const conn = await database.connect();
    await conn.query(up, updata);
    conn.end();
};

export default {createUser, Puxardados1, Puxardados2, atualizarDados, Deletardados};