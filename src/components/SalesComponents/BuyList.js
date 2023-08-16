import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {vw} from 'react-native-expo-viewport-units';

export default function BuyList({selectedData, productData}) {
  let Names = new Array();
  for (var x in productData) {
    for (var y in selectedData.Id) {
      if (productData[x].id == selectedData.Id[y]) {
        let obj = {
          Id: x,
          Name: productData[x].Name,
          Price: productData[x].Value,
          Qtd: selectedData.Amount[y],
          Weight: selectedData.Weight[y],
        };
        Names.push(obj);
      }
    }
  }

  return (
    <View style={{flexDirection: 'column', marginTop: 10, marginBottom: 10}}>
      <View
        style={{
          flexDirection: 'row',
          width: 100,
        }}>
        <Text
          style={{
            color: '#ebb89b',
            fontSize: vw(4),
            width: vw(35),
          }}>
          Nome do Produto
        </Text>
        <Text
          style={{
            color: '#ebb89b',
            fontSize: vw(4),
            width: vw(13.5),
          }}>
          Preço
        </Text>
        <Text
          style={{
            color: '#ebb89b',
            fontSize: vw(4),
            width: vw(13.5),
          }}>
          Qtd.
        </Text>
        <Text
          style={{
            color: '#ebb89b',
            fontSize: vw(4),
            width: vw(13.5),
          }}>
          Peso
        </Text>
      </View>

      <FlatList
        data={Names}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              width: 100,
            }}>
            <Text
              style={{
                color: '#ebb89b',
                fontSize: vw(4),
                width: vw(35),
              }}>
              {item.Name}
            </Text>
            <Text
              style={{
                color: '#ebb89b',
                fontSize: vw(4),
                width: vw(13.5),
              }}>
              R$ {item.Price}
            </Text>
            <Text
              style={{
                color: '#ebb89b',
                fontSize: vw(4),
                width: vw(13.5),
              }}>
              {item.Qtd}
            </Text>
            <Text
              style={{
                color: '#ebb89b',
                fontSize: vw(4),
                width: vw(13.5),
              }}>
              {item.Weight} G
            </Text>
          </View>
        )}
        keyExtractor={item => item.Id}
      />
      <Text
        style={{
          color: '#ebb89b',
          fontSize: vw(4),
          width: vw(35),
        }}>
        {'\n'}Preço Final: {selectedData.TotalCost}
      </Text>
    </View>
  );
}
