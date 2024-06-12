import exprees, { request, response } from "express";
import serviceLogin from  "../services/loginServices.js";
import { CreateTokenJWT } from "../middleware/JWT.js";

const routes = exprees.Router();

routes.post("/", async (request, response) => {
    // o que iremos fazer a busca no insominia 
    const {email_front, password} = request.body;
    // Fazer a validação do login
    const login = await serviceLogin.ValidateLogin(email_front, password);
    if(login.lenght < 1){
        return response.status(400).send({message: "Login Invalido!"})
    }

    // os dados que eu irei criptografar no token
    const {id_usuario, nome, email, tipo_usuario} = login[0];
    
    // Criemail token
    const token = CreateTokenJWT(id_usuario, nome, email, tipo_usuario);
    return response.status(200).send({message: "Login realizado com sucesso!", token})
});
export default routes;