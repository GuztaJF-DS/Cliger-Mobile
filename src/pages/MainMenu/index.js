import React from 'react';
import { View } from 'react-native';
import { styles } from '../Style'
import MenuLargeButton from '../../components/menuComponents/MenuLargeButton';
import MenuHeader from '../../components/menuComponents/MenuHeader';
import MenuAddButton from '../../components/menuComponents/MenuAddButton';

import Add from '../../assets/Icons/Add.svg';
import Finances from '../../assets/Icons/Finances.svg';
import Loan from '../../assets/Icons/Loan.svg';
import Schedule from '../../assets/Icons/Schedule.svg';

export default function Main({navigation,route}){

    const { UserName }=route.params;

    return(
        <View style={{flex:1,backgroundColor:'#68293f',}}>
            <MenuHeader Cash={"20"}/>
            <View style={styles.Center}>
                <MenuLargeButton Type={"Large"} IconSvg={Finances} Name={"Dados Financeiros"}/>
                <MenuLargeButton Type={"Large"} IconSvg={Schedule} Name={"Agenda"}/>
            </View>
            <View style={{alignItems: 'center',flexDirection:'row',justifyContent:'space-around'}}>
            <MenuLargeButton Type={"Normal"} IconSvg={Add} Name={"Adiconar Serviços/Produtos"}/>
            <MenuLargeButton Type={"Normal"} IconSvg={Loan} Name={"Simular Emprestimos"}/>
            </View>
            <View style={{alignItems:'flex-end'}}>
                <MenuAddButton/>
            </View>
        </View>
    )
}