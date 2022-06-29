import { folhaRepository } from "../Repository/folhaRepository";

import { Request,Response } from "express";
import { folhaPagamento } from "../models/folhaPagamento";
import { RabbitMQService } from "../services/RabbitMQ";

const folhaprocessada:folhaPagamento[]=[];
const folhaRep :folhaRepository = new folhaRepository();
const RabbitMQ:RabbitMQService = new RabbitMQService();
export class folhaController{
cadastrar(request:Request, response:Response){
    const folhapag : folhaPagamento = request.body;
    folhaRep.calcular(folhapag);
    folhaRep.cadastrar(folhapag);
    const payload ={
        mes:folhapag.mes,
        ano:folhapag.ano,
        horas:folhapag.horas,
        valor:folhapag.valor,
        bruto:folhapag.bruto,
        irrf:folhapag.irrf,
        inss:folhapag.inss,
        fgts:folhapag.fgts,
        liquido:folhapag.liquido,
        funcionario:folhapag.funcionario
    };
    RabbitMQ.publish(payload);

    response.status(200).json({ message: "Folha de pagamento cadastrada"});
}

}