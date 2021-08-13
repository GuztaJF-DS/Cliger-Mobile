import React from 'react';
import styled from 'styled-components/native';

export const InputArea =styled.View`
    margin-left:5px;
    flex-direction:row;
    align-items:center;
    border-bottom-width: 1px;
    border-bottom-color:#ecb99b;
    border-left-width: 2px;
    border-left-color:#ecb99b;
    height:50px;
    border-bottom-left-radius: 17px
    border-top-left-radius: 12px
    margin-top:7%;
`;

const CustomInput=styled.TouchableOpacity`
    width:90%;
    height:50px;
    flex-direction:row;
    padding-left:15px;
    align-items:center;
    padding:0.1px;
`
const CustomShow=styled.Text`
    margin-left:2.2%;
    font-size:17.5px;
`

export default function DateShow({IconSvg,Color,Opacity,Name,OnPressFunction}){
    return(
    <InputArea>
        <CustomInput onPress={OnPressFunction}>
            <CustomShow style={{color:Color,opacity:Opacity}}>{Name}</CustomShow>
        </CustomInput>
        <IconSvg width="24" height="24"/>
    </InputArea>
    )
}