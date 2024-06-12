import database from "../repository/mysql.js"

async function Adicionarfilme (nome, ano, duracao, idgenero, iddiretor) {
    // Codigo MySql que vai ser inserido no banco
    const sql = "INSERT INTO tbl_filme (nome_filme, ano_lancamento, duracao, FK_id_genero, FK_id_diretor) VALUES (?,?,?,?,?)"
    // Array que vai armazenar os valores dos campos do codigo que esta representados por "?"
    const dados = [nome, ano, duracao, idgenero, iddiretor];
    // Criar a conexão com o banco de dados
    const conn = await database.connect();
    await conn.query(sql, dados);
    conn.end();
};

async function Deletarfilme (id_filme){
    const sql = " UPDATE tbl_filme SET deletado = 1 WHERE id_filme = ? "
    
    const conn = await database.connect();
    await conn.query(sql, id_filme);
    conn.end();
};

async function Puxarfilme (){
    const sql = "SELECT * FROM tbl_filme";

    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();
    console.log(rows)
    return rows;
};

async function Puxarfilme_especifico (id_filme) {
    const sql = "SELECT * FROM tbl_filme WHERE deletado = 0 AND id_filme = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, id_filme);
    conn.end();
    console.log(rows);

    return rows;
};

async function Atualizar_filme(nome, ano, duracao, id_filme){
    const sql = "UPDATE tbl_filme SET nome_filme = ?, ano_lancamento = ?, duracao = ? WHERE id_filme = ?"

    const data = [nome, ano, duracao, id_filme];
    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
};

async function Validar_filme(id_filme){
    const sql = "SELECT * FROM tbl_filme WHERE id_filme = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, id_filme)
    conn.end();

    return rows;
};

export default {Adicionarfilme, Deletarfilme, Puxarfilme, Puxarfilme_especifico, Atualizar_filme, Validar_filme};