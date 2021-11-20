import React from 'react';
import styled from 'styled-components';
import { vw } from 'react-native-expo-viewport-units';

const MenuInput=styled.TouchableHighlight`
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:${vw(20)}px;
    height:${vw(20)}px;
    borderRadius:${vw(20)/2}px;
    borderColor:#ecb99b;
    alignItems:center;
    borderWidth:2px;
    position:absolute;
`

const MenuText=styled.Text`
    color:#ecb99b;
    font-size:${vw(21)/1.5}px;
`

export default({onPressFunction})=>{
    return(
            <MenuInput onPress={onPressFunction}>
            <MenuText>-</MenuText>
            </MenuInput>
    )
}