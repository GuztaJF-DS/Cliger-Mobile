import { StyleSheet } from "react-native";
import styled from 'styled-components/native';
import { vw, vh } from 'react-native-expo-viewport-units';

export const InputArea=styled.TouchableHighlight`
  margin-top:${vh(4)}px;
  alignItems: center;
  width:${vw(60)}px;
  borderRadius:10px;
  border: 1px #ebb89b;
  padding: 10px;
`

export const NewText=styled.Text`
  font-Size:${vw(7)}px;
  color:#ebb89b;
`

export const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#68293f',
        padding:2,
    },
    ImageStyle:{
        marginTop:vh(3),
        marginBottom:vh(1),
        alignItems: 'center',
    },
    TouchableTextStyle:{
        color:'#ebb89b'
    },
    TouchableBoldTextStyle:{
        color:'#ebb89b',
        fontWeight:'bold'
    },
    Center:{
        alignItems: 'center'
    }
})