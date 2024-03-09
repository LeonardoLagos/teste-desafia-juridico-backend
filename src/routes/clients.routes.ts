import { Router } from "express";
import { ClientsController } from "../controllers/clientsController";

const routes = Router();

routes.get("/clients/register", new ClientsController().registeUser);
routes.get("/clients/getAll", new ClientsController().getAllclients);

export default routes;