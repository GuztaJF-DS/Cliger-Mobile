export default function IndividualProfit(
  ProfitUnitCosts,
  FixedCosts,
  ProductPrice,
  Stock
){
    let profitInfo="";
    let TotalRevenue=[];
    let TotalProfit=[];
    let TotalCosts=[];
    let LowerValue=Stock+1;

    var x=0
    while(x<=Stock){
      TotalRevenue[x]=ProductPrice*x;
      TotalCosts[x]=parseInt(FixedCosts)+(parseInt(ProfitUnitCosts)*parseInt(x))
      TotalProfit[x]=TotalRevenue[x]-TotalCosts[x];
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