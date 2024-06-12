import express, { request, response } from "express";
import servicesfilme_ator from "../services/Filme_atorservice.js";
import servicesfilme from "../services/filmeservices.js";
import servicesator from "../services/atorservice.js";

const routes = express.Router();

routes.post("/", async (request, response) => {
    const {fk_id_ator, fk_id_filme} = request.body;
    const id_ator_data = await servicesator.Validar_ator(fk_id_ator);
    const id_filme_data = await servicesfilme.Validar_filme(fk_id_filme);

    if (id_ator_data < 1) {
        return response.status(400).send({message: "id_ator invalido!"});
    };
    if (id_filme_data < 1){
        return response.status(400).send({message: "id_filme invalido!"});
    };

    const {id_ator} = id_ator_data[0]; 
    const {id_filme} = id_filme_data[0];
    
    await servicesfilme_ator.Adicionar_filme_ator(id_ator, id_filme);
    return response.status(201).send({message: "Filme_ator adicionado com sucesso!"});
});

routes.delete("/", async(request, response) => {
    const {fk_id_ator, fk_id_filme} = request.body;

    if(fk_id_ator < 1){
        return response.send({message: "Id_ator invalido!"});
    };

    if(fk_id_filme < 1){
        return response.send({message: "Id_filme invalido!"});
    };

    await servicesfilme_ator.Deletar_filme_ator(fk_id_ator, fk_id_filme);
    response.status(201).send({message: "Filme deletado com sucesso!"});
});

routes.put("/", async (request, response) => {
        // Definindo qual vai ser o nome das variaveis que iremos utilizar no Front-end...
        const{nome_ator_filme, nome_filme_ator, where_ator, where_filme} = request.body;

        // Validação ator 
        const id_ator_data = await servicesfilme_ator.Validar_nome_ator(nome_ator_filme);
        if(id_ator_data.length === " "){
            return response.send({message: "Ator não encontrado!"})
        }
        const {id_ator} = id_ator_data[0];

        // Validação Filme
        const id_filme_data = await servicesfilme_ator.Validar_filme_ator(nome_filme_ator);
        if(id_filme_data.length === null){
            return response.send({message: "Filme não encontrado!"})
        }
        const {id_filme} = id_filme_data[0];
 
        await servicesfilme_ator.Update_actor(id_ator, id_filme, where_ator, where_filme);
        response.status(200).send({message: "Filme_ator Atualizado com sucesso!"});
    });

routes.get("/", async(request, response) => {
    const date = await servicesfilme_ator.Movie_actor_select();

    if(date.length < 1){
        return response.status(401).send({message: "Filmes_atores não encontrados!"})
    }
    return response.status(200).send({message: date})
});


export default routes;