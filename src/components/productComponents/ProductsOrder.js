import React from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import RotatedIcon from './RotatedIcon';

export default ({Order,Op,Name})=>{

    return(
    <View>
        <TouchableOpacity onPress={()=>{/*
            (orderNum!=1)?setOrder(products.sort((a,b)=>a.Name.localeCompare(b.Name)))+setOrderNum(1)
            :setOrder(products.sort((a,b)=>b.Name.localeCompare(a.Name)))+setOrderNum(2)*/
            console.log('a')
        }}>
            <Text style={{width:vw(80.4),color:"#ebb89b"}}>
                {Name}
                <RotatedIcon Order={Order} Op={Op}/>
            </Text>
        </TouchableOpacity>
        
    </View>
    )
}
