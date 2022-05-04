import { Router } from "express";
import { ListaController } from "../controller/ListaController";


const routes = Router();

//Default
routes.get("/", (request, response) => {
  response.json({ message: "API de Produtos" });
});

//Produto
routes.get("/folha/consultar/:cpf/:mes/:ano", new ListaController().consultar);
routes.get("/folha/listar", new ListaController().listar);



export { routes };