import express, { request, response } from "express";
import services from '../services/usuarioService.js';
import { VerifyToken } from "../middleware/JWT.js";

const Routes = express.Router();

Routes.delete("/:id_usuario", VerifyToken, async (request, response) => {
    const {id_usuario} = request.params;

    if (id_usuario == null){
        return response.status(400).send({message: "Id invalido!"})
    }
    await services.Deletardados(id_usuario);
    response.status(200).send({message:"Dados Deletados!"})
});
Routes.put("/", VerifyToken, async(request, response) => {   
    const {email, nome, senha, tipo_Usuario, id_usuario} = request.body;

    services.atualizarDados(email, nome, senha, tipo_Usuario, id_usuario);
    if(nome.length < 3)
        response.status(400).send({message:"Nome com poucos caracteres"})
    
    response.status(201).send({message: "Dados atualizados com sucesso!"})
});

Routes.get("/", VerifyToken, async(request, response) => {
    const usuariosdoBanco = await services.Puxardados1();

    if(usuariosdoBanco.length < 1){
        return response.status(204).end();}
    response.status(200).send({message: usuariosdoBanco})
});

Routes.get('/:id_usuario', VerifyToken, async(request, response) => {
    const {id_usuario} = request.params;
    const usuariosdoBanco = await services.Puxardados2(id_usuario);

    if (usuariosdoBanco.length < 1){
        return response.status(204).end()
    }
    response.status(200).send({message:usuariosdoBanco});
});

Routes.post('/', (request, response) => {
    // nome, email, tipo_usuario
    const {email, senha, nome, tipoUsuario} = request.body;
    services.createUser(email, senha, nome, tipoUsuario);

    return response.status(201).send({message: "Usuario cadastrado com sucesso!"});
});

export default Routes;
