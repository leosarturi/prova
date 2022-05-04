 import { folhaPagamento } from "../models/folhaPagamento";
 import { Request,Response } from "express";
 import axios from "axios";
 const listaprocessada : folhaPagamento[] = [];
export class ListaController{
    consultar(request:Request, response:Response){
        var dataret;
        var mess;

                
                const url= "http://localhost:3333/folha/calcular";
      var ret;
      var folha : folhaPagamento[];
       axios.get(url).then((data)=>{
           
           ret = data.data;
           
            
                folha = ret.data;
                folha.forEach((dados)=>{
                    if(dados.ano == parseInt(request.params.ano) && dados.mes == parseInt(request.params.mes) && dados.funcionario.cpf == request.params.cpf){
                        listaprocessada.push(dados);
                        
                        response.status(200).json({message:"sucesso" , data:"dados"})
                    }
                else {
                    mess="erro";
                    dataret = "não foi possivel encontrar";
                }
           
       
           
       
    }
}).catch();
    }
    listar(request:Request, response:Response){
        var salario =0;
        const url= "http://localhost:3333/folha/calcular";
        var folha:folhaPagamento[];
        axios.get(url).then((data)=>{
folha = data.data.data;
folha.forEach(data=>{
    salario+=data.bruto;
})
response.status(200).json({message:"sucesso" , data:folha,salariototal:salario})
        }).catch();
    }

}