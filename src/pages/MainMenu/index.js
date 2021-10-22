import React,{useEffect, useState} from 'react';
import { View } from 'react-native';
import { styles } from '../Style'
import MenuButton from '../../components/menuComponents/MenuButton';
import MenuHeader from '../../components/menuComponents/MenuHeader';
import MenuAddButton from '../../components/menuComponents/MenuAddButton';

/*My Components*/
import Add from '../../assets/Icons/Add.svg';
import Finances from '../../assets/Icons/Finances.svg';
import Loan from '../../assets/Icons/Loan.svg';
import Schedule from '../../assets/Icons/Schedule.svg';

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
                <MenuButton Type={"Large"} IconSvg={Schedule} Name={"Agenda"}/>
            </View>
            <View style={{alignItems: 'center',flexDirection:'row',justifyContent:'space-around'}}>
            <MenuButton Type={"Normal"} IconSvg={Add}  OnPress={()=>setRoad("Products")} Name={"Ver Serviços/Produtos"}/>
            <MenuButton Type={"Normal"} IconSvg={Loan}  Name={"Simular Emprestimos"}/>
            </View>
            <View style={{alignItems:'flex-end'}}>
                <MenuAddButton/>
            </View>
        </View>
    )
}