import { folhaRepository } from "../Repository/folhaRepository";

import { Request,Response } from "express";
import { folhaPagamento } from "../models/folhaPagamento";

const folhaprocessada:folhaPagamento[]=[];
const folhaRep :folhaRepository = new folhaRepository();
export class folhaController{
cadastrar(request:Request, response:Response){
    const folhapag : folhaPagamento = request.body;
    folhaRep.cadastrar(folhapag);

    response.status(200).json({ message: "Folha de pagamento cadastrada"});
}
listar(request:Request, response:Response){
        response.status(200).json({ message: "Lista de folhas de pagamento", data: folhaRep.listar() });
    
}
}