import React,{useState,useEffect} from 'react';
import styled from 'styled-components/native';
import { vh } from 'react-native-expo-viewport-units';
import ResponsiveImage from "react-native-responsive-image";
import Api from '../../Api'

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


export default function MenuHeader(userId){
    const [cash,setCash]=useState(0);
    const [data,setData]=useState('');

    if(userId.refresh==true){
        FetchCash();
    }

    useEffect(()=>{
        FetchCash();
    },[data])
        async function FetchCash(){
            try{
                const response= await Api.post('/finance/getAll',{"userId":userId.userId});
                if(Object.values(response.data).length!=0){
                    let x=response.data.length;
                    setCash(response.data[x-1].CurrentBalance);
                    setData('a');
                }
            }catch(err){
                console.log(err)
            }
        }

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
            <CashInfo>Saldo: R$ {cash}</CashInfo> 
        </CashHeader>
        </>
    )
}