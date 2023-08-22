import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
	VictoryLine,
	VictoryTheme,
	VictoryChart,
	VictoryVoronoiContainer,
} from 'victory-native';
import Api from '../../Api';

export default function LineGraphic({data}) {
	let obj = [];
	let type = data.Type;
	let FormattedData = data.RawData === undefined ? '' : data.RawData;
	let LabelName = '';
	const [productSales, setProductSales] = useState();
	const [proData, setProData] = useState();

	useEffect(() => {
		async function FetchData() {
			try {
				const Json = {
					userId: FormattedData?.userId,
					ProductId: FormattedData?.ProductId,
				};
				const resp = await Api.post('/SalesRecord/GetOneProduct', Json);
				setProductSales(resp.data);
				setProData('');
			} catch (err) {
				console.error(err);
			}
		}
		if (FormattedData.length !== 0) {
			FetchData();
		}
	}, [proData]);

	if (Object.values(FormattedData).length == 0) {
		type = 'Nothing';
	}

	const getDaysRangeArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
	};

	switch (type) {
		case 'Nothing':
			obj.push({x: 0, y: 0});
			break;

		case 'Sales': {
			obj = [];
			LabelName = 'Vendas';
			let totalAmount = 0;
			let totalMoney = 0;
			FormattedData.map((item, index)=>{
				if (
					index < FormattedData.length - 1 &&
						item?.createdAt ==
						FormattedData[parseInt(index) + 1]?.createdAt
				) {
					totalAmount+=item.Amount;
					totalMoney+=item.TotalCost;
				} else {
					const FormattedDate = item.createdAt.replace(/(\/)/g, '-')+'T00:00:00';
					totalAmount+=item.Amount;
					totalMoney+=item.TotalCost;
					obj.push({
						date: item.createdAt,
						x: new Date(FormattedDate),
						y: totalAmount,
						moneyMade:totalMoney
					});
					totalAmount = 0;
					totalMoney=0;
				}
			})
			const dates = getDaysRangeArray(obj?.[0]?.x, new Date())
			dates.map((date,index)=>{
				const alreadyIn = !!obj.find((objDate)=>{
					return new Date(objDate.x).getTime()===new Date(date).getTime();
				});
				if(!alreadyIn){
					obj.splice(index+1,0,{date:date.toISOString().slice(0, 10), x:date, y:0, moneyMade:0})
				}
			})
			break;
		}

		case 'Finance': {
			LabelName = 'Saldo';
			obj = [];
			FormattedData.map((item, index)=>{
				obj.push({
					date: item?.createdAt,
					x: index,
					y: item.CurrentBalance,
				});
			})
			break;
		}
		case 'Product': {
			obj = [];
			let totalProd = 0;
			productSales?.map((prod,id)=>{
				const FormattedDate = prod.createdAt.replace(/(\/)/g, '-')+'T00:00:00';
				if(prod.createdAt == productSales[id+1]?.createdAt){
					totalProd+=prod.Amount;
				}
				else{
					totalProd+=prod.Amount;
					obj.push({
						date: prod.createdAt,
						x: new Date(FormattedDate),
						y: totalProd,
					});
					totalProd = 0;
				}
			});

			break;
		}
	}
	const chartTheme = {
	...VictoryTheme.material,
  axis: {
    style: {
      tickLabels: {
        fill: 'white',
      },
			grid: {
				fill: "none",
				stroke: "none",
				pointerEvents: "painted",
			},
    },
  },
};
	return (
		<View>
			{type == 'Nothing' ? (
				<Text>Você ainda não registrou nenhuma venda</Text>
			) : (
				<VictoryChart
					theme={ chartTheme }
					height={285}
					containerComponent={
						<VictoryVoronoiContainer
							voronoiDimension="x"
							labels={({datum}) =>{
								const fixRegex = /(19|20\d{2})\-((?:\d{1})?[1-9]|1[1,2])\-(0[1-9]|[12][0-9]|3[01])/g;
								function replacer(match, p1, p2, p3){
									if(!p2.match(/(0[1-9]|1[1,2])/)){
										return `${p3}/0${p2}/${p1}`
									}
									return `${p3}/${p2}/${p1}`
								}
								const FormattedDatum =  datum.date.replace(fixRegex, replacer);
								if(type==='Sales'){
									return `Data: ${FormattedDatum}\n ${LabelName}:${datum.y}\n Ganhos: ${datum?.moneyMade} R$`
								}
								return `Data: ${FormattedDatum}\n ${LabelName}:${datum.y}`
							}
							}
						/>
					}>
					<VictoryLine
						style={{data: {stroke: '#cc8d46', strokeWidth: 4}}}
						data={obj}
					/>
				</VictoryChart>
			)}
		</View>
	);
}
