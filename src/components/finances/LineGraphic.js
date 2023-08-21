import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
	VictoryLine,
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

	switch (type) {
		case 'Nothing':
			obj.push({x: 0, y: 0});
			break;

		case 'Sales': {
			obj = [];
			LabelName = 'Vendas';
			let total = 0;
			FormattedData.map((item, index)=>{
				if (
					index < FormattedData.length - 1 &&
						item?.createdAt ==
						FormattedData[parseInt(index) + 1]?.createdAt
				) {
					total+=item.Amount;
				} else {
					const FormattedDate = item.createdAt.replace(/(\/)/g, '-')+'T00:00:00';
					total+=item.Amount;
					obj.push({
						date: item.createdAt,
						x: new Date(FormattedDate),
						y: total,
					});
					total = 0;
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
	return (
		<View>
			{type == 'Nothing' ? (
				<Text>Você ainda não registrou nenhuma venda</Text>
			) : (
				<VictoryChart
					height={285}
					containerComponent={
						<VictoryVoronoiContainer
							voronoiDimension="x"
							labels={({datum}) =>
								`Data: ${datum.date},\n ${LabelName}:${datum.y}`
							}
						/>
					}>
					<VictoryLine
						style={{data: {stroke: '#3fd458', strokeWidth: 4}}}
						data={obj}
					/>
				</VictoryChart>
			)}
		</View>
	);
}
