import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  VictoryLine,
  VictoryChart,
  VictoryVoronoiContainer,
} from 'victory-native';
import Api from '../../Api';

export default function LineGraphic({data}) {
  var obj = [];
  let type = data.Type;
  let FormattedData = data.RawData === undefined ? '' : data.RawData;
  let LabelName = '';
  const [productSales, setProductSales] = useState();
  const [proData, setProData] = useState();

  useEffect(() => {
    async function FetchData() {
      try {
        const Json = {
          userId: FormattedData.userId,
          ProductId: FormattedData.ProductId,
        };
        const resp = await Api.post('/SalesRecord/GetOneProduct', Json);
        setProductSales(resp.data);
        setProData('');
      } catch (err) {
        console.error(err);
      }
    }
    if (FormattedData.length != 0) {
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
      let total = 1;
      LabelName = 'Vendas do Dia';
      for (var i in FormattedData) {
        if (i != FormattedData.length - 1) {
          if (
            i < FormattedData.length - 1 &&
            FormattedData[i].createdAt ==
              FormattedData[parseInt(i) + 1].createdAt
          ) {
            total++;
          } else {
            obj.push({
              date: FormattedData[i].createdAt,
              x: new Date(FormattedData[i].createdAt),
              y: total,
            });
            total = 1;
          }
        }
      }
      break;
    }

    case 'Finance': {
      LabelName = 'Saldo';
      let FinanceCoordinates = FormattedData.map(
        ({CurrentBalance}) => CurrentBalance,
      );
      for (var f in FinanceCoordinates) {
        obj.push({
          date: FormattedData[f].createdAt,
          x: f,
          y: FinanceCoordinates[f],
        });
      }
      break;
    }
    case 'Product': {
      let total2 = 0;
      for (var p in productSales) {
        if (productSales.length == 1) {
          total2 = total2 + parseInt(productSales[p].Amount);
        }
        if (p == productSales.length - 2) {
          total2 = total2 + parseInt(productSales[parseInt(p) + 1].Amount);
        }
        if (
          p < productSales.length - 1 &&
          productSales[p].createdAt == productSales[parseInt(p) + 1].createdAt
        ) {
          total2 = total2 + parseInt(productSales[p].Amount);
        } else {
          obj.push({
            date: productSales[p].createdAt,
            x: new Date(productSales[p].createdAt),
            y: total2,
          });
          total2 = 0;
        }
      }

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
