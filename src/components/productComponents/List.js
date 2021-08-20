import React from 'react';
import styled from 'styled-components';
import { vw } from 'react-native-expo-viewport-units';


const ProductViewName=styled.View`
    backgroundColor:#68293f;
    width:${vw(80)}px;
    borderLeftColor:#ebb89b;
    borderLeftWidth:2px;
    borderBottomColor:#ebb89b;
    borderBottomWidth:2px;
`

const ProductViewValue=styled.View`
    backgroundColor:#68293f;
    width:${vw(19)}px;
    justifyContent:center;
    borderRightColor:#ebb89b;
    borderRightWidth:2px;
    borderLeftColor:#ebb89b;
    borderLeftWidth:2px;
    borderBottomColor:#ebb89b;
    borderBottomWidth:2px;
`

const ProductPress=styled.TouchableHighlight`
    flexDirection:row;
`

const ProductText=styled.Text`
    font-size:${vw(4)}px;
    margin-left:3px;
    color:#ebb89b;
`

export default ({Name,Value,Id})=>{
    return(
        <ProductPress
            key={Id}
            onPress={() => console.log(Value)}>
            <>
                <ProductViewName>
                        <ProductText>{Name}</ProductText>
                </ProductViewName>
                <ProductViewValue>
                        <ProductText style={{textAlign:"center"}}>{Value}$</ProductText>
                </ProductViewValue>
            </>
        </ProductPress>
    )
}