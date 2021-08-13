import React from 'react';
import styled from 'styled-components/native';
import { vw,vh } from 'react-native-expo-viewport-units';

const Header=styled.View`
    width:100%;
    height:${vh(7.5)}px
    backgroundColor:#582536;
`

const TestXT=styled.Text`
    color:black
`
const CashHeader=styled.View`
    width:100%;
    height:${vh(3)}px
    backgroundColor:#e9f7d6;
`

export default({Cash})=>{
    return(
        <>
        <Header>
            <TestXT>{Cash}</TestXT> 
        </Header>
        <CashHeader>
            <TestXT>{Cash}</TestXT> 
        </CashHeader>
        </>
    )
}