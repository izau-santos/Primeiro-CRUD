import  express, {request, response} from "express";
import service from '../services/diretorservice.js'

const routes = express.Router();

routes.post('/', (request, response) => {
    //nome_diretor, nacionalidade, dt_nascimento, sexo
    const {nome_diretor, nacionalidade, dt_nascimento, sexo} = request.body;

    service.add_diretor(nome_diretor, nacionalidade, dt_nascimento, sexo);
    return response.status(201).send({message: "Diretor adicionado com sucesso!"})
});

routes.delete("/:id_diretor", async(request, response) => {
    const {id_diretor} = request.params;

    if(id_diretor.length < 1){
        return response.status(400).send({message: "Diretor não encontrado"})
    }

    service.Deletardiretor(id_diretor);
    response.status(201).send({message: "Diretor deletado com sucesso!"});
});

routes.put("/", async (request, response) => {
    const {nome_diretor, nacionalidade, dt_nascimento, sexo, id_diretor} = request.body;

    if(id_diretor === null){
        return response.status(400).send({message: "Atualização não efetuada!"})
    }
    await service.Atualizardiretor(nome_diretor, nacionalidade, dt_nascimento, sexo, id_diretor);
    response.status(201).send({message: "Atualização efetuada com sucesso!"});
});

routes.get("/", async (request, response) => {
    const diretores_banco = await service.Puxardadosdiretor1();

    if(diretores_banco < 1 ){
        return response.status(204).send({mensager: "Sem diretores cadastrados"});
    }
    response.status(200).send({message: diretores_banco})
});

routes.get("/:id_diretor", async (request, response) => {
    const {id_diretor} = request.params;
    const diretores_banco = await service.Puxardadosdiretor2(id_diretor);

    if (diretores_banco < 1){
        return response.status(401).send({message: "Diretor não encontrado!"})
    }
    response.status(200).send({message: diretores_banco})
});

export default routes;