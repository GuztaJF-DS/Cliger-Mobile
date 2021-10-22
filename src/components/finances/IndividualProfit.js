export default function IndividualProfit(
  ProfitUnitCosts,//Custo por Unidade do produto
  FixedCosts,//Custos Fixos
  ProductPrice,//Preço do produto
  Stock//Estoque disponivel do produto do Produto
){
    let profitInfo="";
    let TotalRevenue=[];//Receita Total
    let TotalProfit=[];//Lucro total
    let TotalCosts=[];//Custo Total
    let LowerValue=Stock+1;//teto usado para descobrir o menor valor

    var x=0
    while(x<=Stock){
      TotalRevenue[x]=ProductPrice*x;//Função para pegar a receita, Neste caso o x Representa o preço do produto
      TotalCosts[x]=parseInt(FixedCosts)+(parseInt(ProfitUnitCosts)*parseInt(x))//função para pegar os custos, quando for fazer pro geral não inclua o x
      TotalProfit[x]=TotalRevenue[x]-TotalCosts[x];//função para calcular os lucros
      if(TotalRevenue[x]>=TotalCosts[x]){
        if(LowerValue>x){
          LowerValue=x;
        }
        if(x==LowerValue){
          EstimatedProfit=TotalRevenue[31]-TotalCosts[31];
          profitInfo={"ToSale":x,"EstimatedProfit":EstimatedProfit,"TotalRevenue":TotalRevenue[x]};
          x=Stock;
        }
      }
      x++;
    }
    if(LowerValue==Stock+1){
      profitInfo=`Considerando o Estoque de ${Stock} unidades, não será possivel atingir o ponto de Equilibrio`
    }
    return profitInfo;
  }