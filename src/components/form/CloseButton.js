import React from 'react';
import styled from 'styled-components';
import {vw} from 'react-native-expo-viewport-units';

const InputView = styled.View`
  width: ${vw(7)}px;
  height: ${vw(7)}px;
  borderradius: ${vw(7) / 2}px;
  justify-content: center;
  alignitems: center;
`;

const CloseInput = styled.TouchableOpacity`
  width: ${vw(7)}px;
  height: ${vw(7)}px;
  borderradius: ${vw(7) / 2}px;
  bordercolor: #610204;
  borderwidth: 1px;
  elevation: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backgroundcolor: #960306;
`;

const MenuText = styled.Text`
  color: #ffffff;
  font-size: ${vw(7) / 2}px;
`;

export default function CloseButton({OnPressFunction}) {
  return (
    <InputView>
      <CloseInput onPress={OnPressFunction}>
        <MenuText>X</MenuText>
      </CloseInput>
    </InputView>
  );
}
