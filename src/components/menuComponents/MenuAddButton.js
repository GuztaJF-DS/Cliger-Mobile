import React from 'react';
import styled from 'styled-components';
import { vw } from 'react-native-expo-viewport-units';

const InputArea=styled.View`
    width:${vw(20)}px;
    height:${vw(20)}px;
    borderRadius:${vw(20)/2}px;
    borderColor:#ecb99b;
    alignItems:center;
    borderWidth:2px;
    position:absolute;
`
const MenuInput=styled.TouchableOpacity`
    width:100%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const MenuText=styled.Text`
    color:#ecb99b;
    font-size:${vw(20)/1.5}px;
`

export default()=>{
    return(
        <InputArea>
            <MenuInput>
            <MenuText>+</MenuText>
            </MenuInput>
        </InputArea>
    )
}