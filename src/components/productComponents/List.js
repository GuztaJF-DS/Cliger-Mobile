import React, {useEffect, useContext} from 'react';
import ProductContext from '../../contexts/ProductContext';
import styled from 'styled-components';
import {vw} from 'react-native-expo-viewport-units';

export const ProductViewName = styled.View`
  justifycontent: center;
  borderleftcolor: #ebb89b;
  borderleftwidth: 2px;
  borderbottomcolor: #ebb89b;
  borderbottomwidth: 2px;
`;

export const ProductViewValue = styled.View`
  backgroundcolor: #68293f;
  width: ${vw(19)}px;
  justifycontent: center;
  borderrightcolor: #ebb89b;
  borderrightwidth: 2px;
  borderleftcolor: #ebb89b;
  borderleftwidth: 2px;
  borderbottomcolor: #ebb89b;
  borderbottomwidth: 2px;
`;

export const ProductPress = styled.TouchableHighlight`
  flexdirection: row;
`;

export const ProductText = styled.Text`
  font-size: ${vw(4)}px;
  margin-left: 3px;
  color: #ebb89b;
`;

export default function ListProducts({all}) {
  const {setModalVisible, setProductData, ProductData, products} =
    useContext(ProductContext);

  useEffect(() => {
    if (all.id == ProductData.id) {
      setProductData(all);
    }
  }, [products]);

  return (
    <ProductPress
      key={all.Id}
      onPress={() => {
        setModalVisible(true), setProductData(all);
      }}
      underlayColor="#3d1322">
      <>
        <ProductViewName style={{width: vw(80)}}>
          <ProductText style={{fontSize: 22}}>{all.Name}</ProductText>
        </ProductViewName>
        <ProductViewValue>
          <ProductText style={{textAlign: 'center'}}>{all.Value}$</ProductText>
        </ProductViewValue>
      </>
    </ProductPress>
  );
}
