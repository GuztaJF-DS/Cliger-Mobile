import React from "react";
import styled from "styled-components";
import { vw } from "react-native-expo-viewport-units";

const InputView=styled.View`
    width:${vw(7)}px;
    height:${vw(7)}px;
    borderRadius:${vw(7)/2}px;
    justify-content:center;
    alignItems:center;
`

const CloseInput=styled.TouchableOpacity`
    width:${vw(7)}px;
    height:${vw(7)}px;
    borderRadius:${vw(7)/2}px;
    borderColor:#610204;
    borderWidth:1px;
    elevation:2;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    backgroundColor:#960306;
`

const MenuText=styled.Text`
    color:#ffffff;
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