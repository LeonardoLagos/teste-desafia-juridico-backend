import { Router } from "express";
import { ClientsController } from "../controllers/clientsController";

const routes = Router();

//Rota que adiciona um registro ao banco
routes.put("/clients/register", new ClientsController().registeUser);
//Rota que atualiza um registro do banco
routes.post("/clients/update", new ClientsController().updateUser);
//Rota que retorna todos os registros do banco
routes.get("/clients/getAll", new ClientsController().getAllclients);
//Rota que retorna a rota calculada
routes.get("/clients/getRoute", new ClientsController().getRoute)

//Rota para cadastar varios clientes ao banco, útil para testes
routes.post("/clients/randomRegisters", new ClientsController().generateRandomClients)
export default routes;