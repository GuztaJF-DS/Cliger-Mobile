import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {vw} from 'react-native-expo-viewport-units';
import RotatedIcon from './RotatedIcon';
import ProductContext from '../../contexts/ProductContext';

export default function ProductsOrder({Order, Op, Name}) {
  const {orderNum, setOrder, setOrderNum, products} =
    useContext(ProductContext);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          products.message != 'Not Found'
            ? Op == 1
              ? orderNum != 1
                ? setOrder(
                    products.sort((a, b) => a.Name.localeCompare(b.Name)),
                  ) + setOrderNum(1)
                : setOrder(
                    products.sort((a, b) => b.Name.localeCompare(a.Name)),
                  ) + setOrderNum(2)
              : orderNum != 3
              ? setOrder(
                  products.sort((a, b) => {
                    return a.Value - b.Value;
                  }),
                ) + setOrderNum(3)
              : setOrder(
                  products.sort((a, b) => {
                    return b.Value - a.Value;
                  }),
                ) + setOrderNum(4)
            : null;
        }}>
        <Text style={{width: vw(80.4), color: '#ebb89b'}}>
          {Name}
          <RotatedIcon Order={Order} Op={Op} />
        </Text>
      </TouchableOpacity>
    </View>
  );
}
