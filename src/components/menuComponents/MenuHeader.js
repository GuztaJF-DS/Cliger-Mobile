import React,{useState,useEffect} from 'react';
import { View,Text, TouchableHighlight} from 'react-native'
import styled from 'styled-components/native';
import { vh,vw } from 'react-native-expo-viewport-units';
import ResponsiveImage from "react-native-responsive-image";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api'

const Header=styled.View`
    width:80%;
    height:${vh(8.5)}px;
    flexDirection:column;
    justify-content:center;
    backgroundColor:#582536;
`

const LogOutView=styled.View`
    width:20%;
    height:${vh(8.5)}px;
    alignItems:center;
    flexDirection:row;
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

export default function MenuHeader({userId,refresh,navigation,route}){
    const [cash,setCash]=useState(0);
    const [data,setData]=useState('');

    async function LogOut(){
        try{
            await AsyncStorage.removeItem("@MasterToken");
            navigation.reset({
                index: 0,
                routes: [{ 
                    name: 'PreLoad'
                  }],
              });
        }catch(err){
            console.log(err)
        }
    }

    if(refresh==true){
        FetchCash();
    }

    useEffect(()=>{
        FetchCash();
    },[data])
        async function FetchCash(){
            try{
                const response= await Api.post('/finance/getAll',{"userId":userId});
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
        <View
         style={{flexDirection:'row'}}
        >
            <Header>
                <ResponsiveImage 
                    source={require('../../assets/Images/Cliger_Logo_TextOnly.png')}
                    initWidth={129}
                    initHeight={49.4}
                    style={{marginLeft:vw(34.3)}}
                />
            </Header>
            <LogOutView>
            <TouchableHighlight
                onPress={()=>{LogOut()}}
            >
                <Text style={{color:'#ebb89b'}}>Sair</Text>
            </TouchableHighlight>
            </LogOutView>
        </View>
        <CashHeader>
            <CashInfo>Saldo: R$ {cash}</CashInfo> 
        </CashHeader>
        </>
    )
}