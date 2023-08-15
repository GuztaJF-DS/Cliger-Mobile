import React from 'react';
import styled from 'styled-components';
import {vw} from 'react-native-expo-viewport-units';

const MenuInput = styled.TouchableHighlight`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${vw(20)}px;
  height: ${vw(20)}px;
  borderradius: ${vw(20) / 2}px;
  bordercolor: #ecb99b;
  alignitems: center;
  borderwidth: 2px;
  position: absolute;
`;

const MenuText = styled.Text`
  color: #ecb99b;
  font-size: ${vw(21) / 1.5}px;
`;

export default function MenuAddButton({onPressFunction}) {
  return (
    <MenuInput onPress={onPressFunction}>
      <MenuText>-</MenuText>
    </MenuInput>
  );
}
