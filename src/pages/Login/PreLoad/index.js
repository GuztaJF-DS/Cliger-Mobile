import React,{ useEffect, useState } from 'react';
import { ScrollView,View,Text } from 'react-native';
import ResponsiveImage from "react-native-responsive-image";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vw } from 'react-native-expo-viewport-units';

/*My Components*/
import { styles } from '../../Style';
import Api from '../../../Api';

export default function Main({navigation}){
    const [error,SetError]=useState({});

    /*Empty UseEffect*/
    useEffect(()=>{
        async function CheckToken(){
            try{
                let value=await AsyncStorage.getItem('@MasterToken');
                const Body={
                        "ConfirmToken":`${value}`
                };
                let resp=await Api.post('auth/GetUserbyToken',Body);
                
                if(resp){
                    if(resp.data.Error){
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SignIn' }],
                          });
                    }else{
                        navigation.reset({
                            index: 0,
                            routes: [{ 
                                name: 'Main',
                                params: { 
                                    Id:resp.data.id,
                                    BirthDate:resp.data.BirthDate,
                                    Email:resp.data.Email,
                                    UserName:resp.data.UserName,
                                }
                              }],
                          });
                    }
                }
                    
            }catch(err){
                if(err.message=="Network Error"){
                    SetError({Error:"não foi possível se conectar"});
                }
                console.log(err);
            }
        }
        CheckToken()
    },[])

    /*Front Page*/
    return(
        <ScrollView style={styles.container}>
            <ResponsiveImage
                source={require('../../../assets/Images/CligerBigLogo.png')}
                style={styles.ImageStyle}
                initWidth="418"
                initHeight="270"
            />
            <View style={styles.Center}>
                {(Object.values(error).length==0)?<Text style={{fontSize:vw(4.5),color:"#ebb89b"}}>Carregando</Text>:<Text style={{fontSize:vw(4.5),color:"#ebb89b"}}>{error.Error}</Text>}
            </View>
        </ScrollView>
    )
}