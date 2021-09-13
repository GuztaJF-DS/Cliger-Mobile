import React from "react";
import styled from "styled-components";
import { vw } from "react-native-expo-viewport-units";

const InputView=styled.View`
    width:${vw(7)}px;
    height:${vw(7)}px;
    borderRadius:${vw(7)/2}px;
    borderColor:#db0408;
    justify-content:center;
    alignItems:center;
    borderWidth:2px;
`

const CloseInput=styled.TouchableOpacity`
    width:100%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const MenuText=styled.Text`
    color:#db0408;
    font-size:${vw(7)/2}px;
`

export default function CloseButton({OnPressfunction}){
    return(
        <InputView>
            <CloseInput onPress={OnPressfunction}>
                <MenuText>X</MenuText>
            </CloseInput>
        </InputView>
    )
   
}