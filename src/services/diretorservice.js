import database from '../repository/mysql.js'

async function add_diretor(nome_diretor, nacionalidade, dt_nascimento, sexo) {
    const adicionarDiretor =  "INSERT INTO tbl_diretor(nome_diretor, nacionalidade, dt_nascimento, sexo) VALUES(?,?,?,?);"

    const dados = [nome_diretor, nacionalidade, dt_nascimento, sexo];

    const conn = await database.connect();
    await conn.query(adicionarDiretor, dados)
    conn.end();
};

async function Deletardiretor (id_diretor){
    const sql = "UPDATE tbl_diretor SET deletado = 1 WHERE id_diretor = ?"

    const conn = await database.connect();
    await conn.query(sql, id_diretor);
    conn.end();
};

async function Atualizardiretor (nome_diretor, nacionalidade, dt_nascimento, sexo, id_diretor){
    const sql = "UPDATE tbl_diretor SET nome_diretor = ?, nacionalidade = ?, dt_nascimento = ?, sexo = ? WHERE id_diretor = ? "

    const updiretor = [nome_diretor, nacionalidade, dt_nascimento, sexo, id_diretor];
    const conn = await database.connect();
    await conn.query(sql, updiretor);
    conn.end();
};

async function Puxardadosdiretor1(){
    const sql = "SELECT * FROM tbl_diretor WHERE deletado = 0"

    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();

    return [rows]
};

async function Puxardadosdiretor2(id_diretor){
    const sql = "SELECT * FROM tbl_diretor WHERE deletado = 0 AND id_diretor = ? "

    const conn = await database.connect();
    const [rows] = await conn.query(sql, id_diretor);
    conn.end();

    return [rows]
};

async function ValidarDiretor(diretor){
    const sql = "SELECT * FROM tbl_diretor WHERE nome_diretor = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, diretor);
    conn.end();

    return rows;
};

export default {add_diretor, Deletardiretor, Atualizardiretor, Puxardadosdiretor1, Puxardadosdiretor2, ValidarDiretor};