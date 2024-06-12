import database from "../repository/mysql.js";

async function Adicionar_filme_ator(fk_id_ator, fk_id_filme){
    // Codigo de execução do Mysql...
    const sql = "INSERT INTO tbl_filme_ator (fk_id_ator, fk_id_filme) VALUES (?, ?)"

    const data = [fk_id_ator, fk_id_filme]; // array que vai aramezenar os valores do banco 
    const conn = await database.connect(); // Fazendo a conexão com o Mysql
    await conn.query(sql, data); // Implementando o codigo INSERT e colocando os valores 
    conn.end(); // fechando o banco de dados dps de executar o codigo todo..
};
async function Deletar_filme_ator (fk_id_ator, fk_id_filme){
    const sql = "DELETE FROM tbl_filme_ator WHERE FK_id_ator = ? AND FK_id_filme = ?"
    console.log(" = ", fk_id_ator, fk_id_filme)
    const data = [fk_id_ator, fk_id_filme];
    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
};
async function Update_actor (fk_id_ator, fk_id_filme, where_ator, where_filme) {
    // Codigo inserindo no banco de dados...
    const sql = "UPDATE tbl_filme_ator SET FK_id_ator = ?, FK_id_filme = ? WHERE FK_id_ator = ? AND FK_id_filme = ?"

    // Array criado para armazenar os valores das chaves, que depois sera inserido no codigo "sql" na função query.
    const data = [fk_id_ator, fk_id_filme, where_ator, where_filme];
    // Criar a conexão com o banco de dados...
    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
};
async function Validar_nome_ator(nome_ator){
    const sql = "SELECT * FROM tbl_ator WHERE nome_ator = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, nome_ator);
    conn.end();

    return rows;
};
async function Validar_filme_ator (nome_filme){
    const sql = "SELECT * FROM tbl_filme WHERE nome_filme = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, nome_filme);
    conn.end();

    return rows;
};
async function Movie_actor_select(){
    const sql = "SELECT * FROM tbl_filme_ator"

    const conn = await database.connect();
    const [rows] = await conn.query(sql)
    conn.end();

    return rows;
};

export default {Adicionar_filme_ator, Deletar_filme_ator, Update_actor, Validar_nome_ator, Validar_filme_ator, Movie_actor_select};