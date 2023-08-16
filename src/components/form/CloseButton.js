import React from 'react';
import styled from 'styled-components';
import {vw} from 'react-native-expo-viewport-units';

const InputView = styled.View`
  width: ${vw(7)}px;
  height: ${vw(7)}px;
  border-radius: ${vw(7) / 2}px;
  justify-content: center;
  align-items: center;
`;

const CloseInput = styled.TouchableOpacity`
  width: ${vw(7)}px;
  height: ${vw(7)}px;
  border-radius: ${vw(7) / 2}px;
  border-color: #610204;
  border-width: 1px;
  elevation: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #960306;
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
