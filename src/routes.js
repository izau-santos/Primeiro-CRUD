import express from "express";
import userioController from './controller/usuarioController.js'
import generocontroller from "./controller/generoController.js"
import { VerifyToken } from "./middleware/JWT.js";
import atorcontroller from "./controller/atorController.js"
import diretorcontroller from './controller/diretorController.js'
import filmecontroller from './controller//filmeController.js'
import Filme_atorcontroller from "./controller/Filme_atorController.js";
import loginController from "./controller/loginController.js";

const routes = express();

routes.use('/usuario', userioController);
routes.use('/genero', VerifyToken, generocontroller);
routes.use('/ator', VerifyToken, atorcontroller);
routes.use('/diretor', VerifyToken, diretorcontroller);
routes.use('/filme', VerifyToken, filmecontroller);
routes.use('/filme_ator', VerifyToken, Filme_atorcontroller);
routes.use('/login', VerifyToken, loginController);

export default routes;
