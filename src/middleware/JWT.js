import { response } from "express";
import jwt from "jsonwebtoken";

function CreateTokenJWT(id_usuario, nome, email, tipo_usuario){
    // A chave que eu vou utillizar para descriptografar
    const myKey = "Ch@vedoz@z@u"
    // o que eu vou criptografar (no caso id_usuario, nome, email, tipo_usuario), myKey é a minha chave de "Segurança" e expiresin é o tempo para expirar a chave...
    const token = jwt.sign({id_usuario, nome, email, tipo_usuario}, myKey, {expiresIn: 60 })

    return token;
};

function VerifyToken(){
    const myKey = "Ch@vedoz@z@u";
    // authorization é o nome da variavel que iremos colocar no header...
    const token = Request.headers.authorization;
    jwt.verify(token, myKey, (error, decoded) => {
        if (error){ // Se colocar somente o nome da variavel, vai ser a msm coisa de colocar Error === true...
            return response.status(401).send({message: "Token Invalido, Usuario não autorizado!"});
        };

    next();
    });
};

export {CreateTokenJWT, VerifyToken}


