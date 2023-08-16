import MonthFilter from './MonthFilter';

function Revenue(x, AverageRevenue) {
	return AverageRevenue * x;
}

export default function BusinessProfit(Costs, AverageRevenue, Weekend) {
	Weekend = Weekend == 'Fechado aos Sabados e Domingos' ? false : true;
	let profitInfo = '';
	let TotalRevenue = [];
	let TodayDate = new Date();
	let TotalDays = MonthFilter(
		TodayDate.getMonth() + 1,
		TodayDate.getFullYear(),
		Weekend,
	);
	let EstimatedProfit = Revenue(TotalDays, AverageRevenue) - Costs;
	let IsProfitable = false;

	var x = 0;
	while (x <= TotalDays) {
		TotalRevenue[x] = Revenue(x, AverageRevenue);

		if (TotalRevenue[x] >= Costs && EstimatedProfit > 0) {
			profitInfo = {
				IsProfitable: true,
				TotalDays: TotalDays,
				Average: AverageRevenue,
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
			Average: AverageRevenue,
			EstimatedProfit: EstimatedProfit,
		};
	}
	return profitInfo;
}
