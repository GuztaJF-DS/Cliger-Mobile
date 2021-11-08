import React from 'react';
import styled from 'styled-components/native';
import { vw,vh } from 'react-native-expo-viewport-units';

const MenuInput=styled.TouchableOpacity`
    width:100%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
const MenuText=styled.Text`
    textAlign:center;
    font-size:${vw(4)}px;
    color:#ecb99b;
`


export default ({Name,IconSvg,OnPress})=>{

    const MenuInputArea=styled.View`
        marginTop:${vh(3)}px;
        width:${vw(90)}px; 
        justify-content:center;
        align-items:center;
        border-width: 2.5px;
        border-color:#ecb99b;
        border-radius:10px;
        padding:1px;
    `
    
    return(
        <MenuInputArea>
            <MenuInput
                onPress={OnPress}
            >
                <IconSvg width={vw(35)} height={vh(15)}/>
                <MenuText>{Name}</MenuText>
            </MenuInput>
        </MenuInputArea>
    )
}
