import React from 'react';
import styled from 'styled-components/native';
import { vh } from 'react-native-expo-viewport-units';
import ResponsiveImage from "react-native-responsive-image";

const Header=styled.View`
    width:100%;
    height:${vh(8.5)}px;
    alignItems:center;
    flexDirection:column;
    justify-content:center;
    backgroundColor:#582536;
`

const CashInfo=styled.Text`
    color:#582536;
    fontSize:${vh(2.5)}px;
    fontWeight: bold;
`
const CashHeader=styled.View`
    borderBottomLeftRadius:20px;
    borderBottomRightRadius:20px;
    borderTopLeftRadius:1.5px;
    borderTopRightRadius:1.5px;
    width:100%;
    height:${vh(3.5)}px
    backgroundColor:#e9f7d6;
    alignItems:center;
    justify-content:center;
`

export default({Cash})=>{
    return(
        <>
        <Header>
            <ResponsiveImage 
                source={require('../../assets/Images/Cliger_Logo_TextOnly.png')}
                initWidth={127.9}
                initHeight={49.4}
            />
        </Header>
        <CashHeader>
            <CashInfo>Saldo: R$ {Cash}</CashInfo> 
        </CashHeader>
        </>
    )
}