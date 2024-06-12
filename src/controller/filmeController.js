import express, { Router, request, response } from "express";
import servicesfilme from "../services/filmeservices.js";
import servicesgenero from "../services/generoservices.js";
import servicesdiretor from "../services/diretorservice.js";

const routes = express.Router();

routes.post("/", async(request, response) => {
    const {nome, ano, duracao, nome_genero, nome_diretor} = request.body;

    const genderdata = await servicesgenero.Validargenero(nome_genero);
    const diretordata = await servicesdiretor.ValidarDiretor(nome_diretor);

    if(genderdata.length < 1){
        return response.status(400).send({message: "Genero não encontrado!"})
    }
    if(diretordata.length < 1){
        return response.status(400).send({message: "Diretor não encontrado"})
    }
   
    const {id_genero} = genderdata[0];
    const {id_diretor} = diretordata[0];

    await servicesfilme.Adicionarfilme(nome, ano, duracao, id_genero, id_diretor);
    return response.status(201).send({message: "Filme adicionado com sucesso!"});
});

routes.delete("/:id_filme", async(request, response) => {
    const {id_filme} = request.params;

    if (id_filme.length < 1){
        return response.status(400).send({message: "Filme não encontrado!"})
    }
    servicesfilme.Deletarfilme(id_filme);
    response.status(201).send({message: "Filme deltado com sucesso!"})
});

routes.get("/", async (request, response) => {
    const Filmesdobanco = await servicesfilme.Puxarfilme();

    if (Filmesdobanco.length < 1){
        response.status(400).send({message: "Filme não encontrado!"})
    };
    response.status(200).send({message: Filmesdobanco});
});

routes.get("/:id_filme", async (request, response) => {
    const {id_filme} = request.params;
    const filme = await servicesfilme.Puxarfilme_especifico(id_filme);
    
   if ( id_filme === null || " "){
        return response.end();
    };
    
    response.status(201).send({message: filme});
});

routes.put("/", async(request, response) => {
    const {nome, ano, duracao, id_filme} = request.body;

    if(id_filme === null || " "){
        return response.status(400).send({message:"Id invalido!"})
    }

    await servicesfilme.Atualizar_filme(nome, ano, duracao, id_filme);
    return response.status(200).send({message : "Filme atualizado com sucesso!"})
});

export default routes;
