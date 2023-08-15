import MonthFilter from './MonthFilter';

function Revenue(x, AvarageRevenue) {
  return AvarageRevenue * x;
}

export default function BusinessProfit(Costs, AvarageRevenue, Weekend) {
  Weekend = Weekend == 'Fechado aos Sabados e Domingos' ? false : true;
  let profitInfo = '';
  let TotalRevenue = [];
  let TodayDate = new Date();
  let TotalDays = MonthFilter(
    TodayDate.getMonth() + 1,
    TodayDate.getFullYear(),
    Weekend,
  );
  let EstimatedProfit = Revenue(TotalDays, AvarageRevenue) - Costs;
  let IsProfitable = false;

  var x = 0;
  while (x <= TotalDays) {
    TotalRevenue[x] = Revenue(x, AvarageRevenue);

    if (TotalRevenue[x] >= Costs && EstimatedProfit > 0) {
      profitInfo = {
        IsProfitable: true,
        TotalDays: TotalDays,
        Avarage: AvarageRevenue,
        ToSale: x,
        EstimatedProfit: EstimatedProfit,
        TotalRevenue: TotalRevenue[x],
      };
      IsProfitable = true;
      x = TotalDays;
    }
    x++;
  }
  if (IsProfitable == false) {
    profitInfo = {
      IsProfitable: false,
      TotalDays: TotalDays,
      Avarage: AvarageRevenue,
      EstimatedProfit: EstimatedProfit,
    };
  }
  return profitInfo;
}
