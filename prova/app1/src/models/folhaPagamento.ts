import { Funcionario } from "./funcionario";

export interface folhaPagamento{
    mes : number;
    ano : number;
    horas: number;
    valor:number;
    bruto:number;
    irrf:number;
    inss:number;
    fgts:number;
    liquido:number;
    funcionario : Funcionario;

}