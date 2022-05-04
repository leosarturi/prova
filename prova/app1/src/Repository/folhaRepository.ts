import { folhaPagamento } from "../models/folhaPagamento";

const folhasPagamento: folhaPagamento[]=[];
export class folhaRepository{
    cadastrar(folha:folhaPagamento):folhaPagamento[]{
        
        folhasPagamento.push(folha);
        return folhasPagamento;
    }
    
    listar():folhaPagamento[]{
        folhasPagamento.forEach((folhaf)=>{
this.calcular(folhaf);
        })
        return folhasPagamento;
    }
    calcular(folha : folhaPagamento){
        
        folha.bruto = folha.valor*folha.horas;


        if(folha.bruto<=1693.72){
                folha.inss= (folha.bruto /100)*8;
        }
        if(folha.bruto >=1693.73 && folha.bruto <=2822.90){
            folha.inss= (folha.bruto /100)*9;
        }
        if(folha.bruto >=2822.91 && folha.bruto <=5645.80){
            folha.inss= (folha.bruto /100)*11;
        }
        if(folha.bruto >=5641.81){
            folha.inss= 621.03;
        }

        folha.fgts = (folha.bruto/100)*8;
        if(folha.bruto <=1903.98){
            folha.irrf = 0;
        }
        if(folha.bruto>=1903.99 && folha.bruto<=2826.65){
            folha.irrf = (folha.bruto/100)*7,5  - 142,80;
        }
        if(folha.bruto>=2826.66 && folha.bruto<=3751.05){
            folha.irrf = (folha.bruto/100)*15  - 354.80;
        }
        if(folha.bruto>=3751.06 && folha.bruto<=4664.68){
            folha.irrf = (folha.bruto/100)*22.5  - 636.13;
        }
        if(folha.bruto>4664.69){
            folha.irrf = (folha.bruto/100)*27.5  - 869.36;
        }
        folha.liquido = folha.bruto-folha.inss-folha.irrf;

    }
}