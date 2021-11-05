import React,{useEffect, useState} from 'react';
import { View } from 'react-native';
import { styles } from '../Style'
import MenuButton from '../../components/menuComponents/MenuButton';
import MenuHeader from '../../components/menuComponents/MenuHeader';
import MenuAddButton from '../../components/menuComponents/MenuAddButton';

/*My Components*/
import Add from '../../assets/Icons/Add.svg';
import Finances from '../../assets/Icons/Finances.svg';
import See from '../../assets/Icons/See.svg';

export default function Main({navigation,route}){
    const[road,setRoad]=useState('');
    const { Id }=route.params;

  /*UseEffect: road*/
    useEffect(()=>{
        if(Object.values(road).length!=0){
            navigation.navigate(road,{
                UserId:Id
            })
            setRoad('');
        }
    },[road])

  /*Front Page*/
    return(
        <View style={{flex:1,backgroundColor:'#68293f',}}>
            <MenuHeader userId={Id}/>
            <View style={styles.Center}>
                <MenuButton Type={"Large"} IconSvg={Finances} OnPress={()=>setRoad("Finances")} Name={"Dados Financeiros"}/>
                <MenuButton Type={"Large"} IconSvg={Add}  OnPress={()=>setRoad("Products")} Name={"Ver Produtos/Serviços"}/>
                <MenuButton Type={"Large"} IconSvg={See} Name={"Adicionar Venda"}/>
            </View>
        </View>
    )
}