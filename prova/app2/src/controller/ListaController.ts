 import { folhaPagamento } from "../models/folhaPagamento";
 import { Request,Response } from "express";
 import axios from "axios";
 const listaprocessada : folhaPagamento[] = [];
export class ListaController{
    consultar(request:Request, response:Response){
      

                
    const url= "http://localhost:3333/folha/calcular";
    var ret;
    var folha : folhaPagamento[];


    
    axios.get(url).then((data)=>{
           
           ret = data.data;
           
            
                folha = ret.data;
                folha.forEach((dados)=>{
                    if(dados.ano == parseInt(request.params.ano) && dados.mes == parseInt(request.params.mes) && dados.funcionario.cpf == request.params.cpf){
                        listaprocessada.push(dados);
                        
                        response.status(200).json({message:"sucesso" , data:dados});
                    }
                else {
                    
                    response.status(200).json({message:"erro" , data:"não foi possível encontrar"});
                }
            })
        }).catch();
        
            
        
    }
    listar(request:Request, response:Response){
        var salario =0;
        const url= "http://localhost:3333/folha/calcular";
        var folha:folhaPagamento[];
        axios.get(url).then((data)=>{
folha = data.data.data;
if(listaprocessada.length>0){

    
    listaprocessada.forEach((dados)=>{
        folha.forEach((data,index)=>{
        
        if(data.funcionario.cpf!=dados.funcionario.cpf || data.ano != dados.ano || data.mes != dados.mes){
            
            salario+=data.bruto;
            listaprocessada.push(data);
            return data;
        }else{
            folha.splice(index,1);
        }
       
    })
    
    
})}else{
    folha.forEach(data=>{
        salario+=data.liquido;
        listaprocessada.push(data);
    })
}

if(folha.length==0){
    response.status(200).json({message:"erro" , data:"todos as folhas já processadas"})    
}else{
response.status(200).json({message:"sucesso" , data:folha,salariototal:salario})
}
        }).catch();
    }

}