import { Router } from "express";
import { folhaController } from "../controller/folhaController";

const routes = Router();

//Default
routes.get("/", (request, response) => {
  response.json({ message: "API de Produtos" });
});

//Produto
routes.post("/folha/cadastrar", new folhaController().cadastrar);
routes.get("/folha/calcular", new folhaController().listar);



export { routes };