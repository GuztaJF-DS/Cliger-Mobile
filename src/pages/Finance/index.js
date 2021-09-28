import React,{ useEffect,useState } from "react";
import { View } from "react-native"

import Api from '../../Api';
import { styles } from "../Style";
import MenuHeader from '../../components/menuComponents/MenuHeader'
import LineGraphic from '../../components/finances/LineGraphic'

export default function Finance({route,navigation}){
    const {UserId}=route.params;
    const [salesData,setSalesData]=useState('');
    const [data,setData]=useState('');
    

    useEffect(()=>{
            async function fetchData(){
                try{
                    const response=await Api.post('/finance/getAll',{"userId":UserId});
                    setSalesData(response.data);
                    setData('')
                }catch(err){
                    console.log(err);
                }
            }
            fetchData();
    },[data])

    return(
        <View style={styles.container}>
            <MenuHeader userId={UserId}/>
            <LineGraphic data={salesData}/>
        </View>
    )
}