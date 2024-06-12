import express, { request, response }  from "express";
import services from "../services/generoservices.js";


const routes = express.Router();
routes.post('/', (request, response) => {
    // genero
    const {genero} = request.body;

    services.genero(genero)
    return response.status(201).send({message: "genero adicionado"});
});

routes.get("/", async (request, response) => {
    const Generosdobanco = await services.Puxargenero1();
   
    if(Generosdobanco.length < 1){
        return response.status(400).send({message: "Sem generos cadastrados"})
    }
    return response.status(200).send({message: Generosdobanco})
});

routes.get("/:id_genero", async (request, response) => {
    const {id_genero} = request.params;
    const Generosdobanco = await services.Puxargenero2(id_genero);
    
    if(Generosdobanco.length < 1){
        return response.status(400).send({message: "Sem generos cadastrados"})
    }
    return response.status(200).send({message: Generosdobanco})
});

routes.put("/", async(request, response) => {
    const {genero, id_genero} = request.body;

    services.Atualizargenero(genero, id_genero);
    return response.status(200).send({message: "Genero atualizado com sucesso!"})
});

routes.delete("/:id_genero", async(request, response) => {
    const {id_genero} = request.params;

    if(id_genero === null){
        return response.status(400).send({message: "id_genero invalido"})
    }
    await services.Deletargenero(id_genero);
    response.status(200).send({message: "Genero deletado com sucesso!"})
});
export default routes;
