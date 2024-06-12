import express, { request, response }  from "express";
import services from "../services/atorservice.js"

const routes = express.Router();
routes.post('/', (request, response) => {
    //ator
    const {nome_ator, sexo, dt_nascimento} = request.body;

    services.add_ator(nome_ator, sexo, dt_nascimento);
    return response.status(201).send({message: "ator adicionado"});
});

routes.delete("/:id_ator", (request, response) => {
    const {id_ator} = request.params;

    if(id_ator == null){
        return response.status(400).send({message: "Id invalido!"})
    }
    
    services.Deletarator(id_ator);
    return response.status(200).send({message: "Ator deletado com sucesso!"})
});

routes.put("/", (request, response) => {
    const {nome_ator, sexo, dt_nascimento, id_ator} = request.body;

    services.Atualizarator(nome_ator, sexo, dt_nascimento, id_ator);
    return response.status(200).send({message: "Ator atualizado com sucesso!"})
});

routes.get("/", async(request, response) => {
    const Atordobanco = await services.PuxarAtor1();

    if(Atordobanco < 1){
        return response.status(204).end();
    }
    response.status(200).send({message: Atordobanco});
});

routes.get("/:id_ator", async(request, response) => {
    const {id_ator} = request.params;
    const Atordobanco = await services.PuxarAtor2(id_ator);

    if(Atordobanco.lenght < 1){
        return response.status(204).end();
    }
    response.status(200).send({message: Atordobanco});
});

export default routes;