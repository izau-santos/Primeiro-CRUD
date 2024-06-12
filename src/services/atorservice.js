import database from '../repository/mysql.js'

async function add_ator(nome_ator, sexo, dt_nascimento){
    const add = "INSERT INTO tbl_ator(nome_ator, sexo, dt_nascimento) VALUES(?,?,?)"

    const dataUser = [nome_ator, sexo, dt_nascimento];
    
    const conn = await database.connect();
    await conn.query(add, dataUser);
    conn.end();
};

async function Deletarator (id_ator){
    const sql = "UPDATE tbl_ator SET deletado = 1 WHERE id_ator = ? "

    const conn = await database.connect();
    conn.query(sql, id_ator);
    conn.end();
};

async function Atualizarator(nome_ator, sexo, dt_nascimento, id_ator){
    const sql = "UPDATE tbl_ator SET nome_ator = ?, sexo = ?, dt_nascimento = ? WHERE id_ator = ?"

    const upp = [nome_ator, sexo, dt_nascimento, id_ator];
    const conn = await database.connect();
    conn.query(sql, upp);
    conn.end();
};

async function PuxarAtor1(id_ator){
    const sql = "SELECT * FROM tbl_ator"

    const conn = await database.connect();
    const [rows] = await conn.query(sql)
    conn.end();

    return rows;
};

async function PuxarAtor2(id_ator){
    const sql = "SELECT * FROM tbl_ator WHERE id_ator = ? "

    const conn = await database.connect();
    const [rows] = await conn.query(sql, id_ator)
    conn.end();

    return rows;
};

async function Validar_ator(id_ator){
    const sql = "SELECT * FROM tbl_ator WHERE id_ator = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, id_ator);
    console.log(rows);
    conn.end();

    return rows;
};

export default {add_ator, Deletarator, Atualizarator, PuxarAtor1, PuxarAtor2, Validar_ator};