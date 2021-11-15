import React,{useState,useEffect} from 'react';
import {View,FlatList} from 'react-native';

import {styles} from '../Style';
import Api from '../../Api';
import SalesList from '../../components/SalesComponets/SalesList';
import SalesContext from '../../contexts/SalesContext';
import MenuHeader from '../../components/menuComponents/MenuHeader';

export default function Sales({route}){
    const {UserId}=route.params;
    const [products,setProducts]=useState();
    const [data,setData]=useState("");
    const [selected,setSelected]=useState([]);

    /*UseEffect: data*/
    useEffect(()=>{
        async function FetchData(){
            try{
                var UserID={"userId":UserId};
                const response=await Api.post('/products/GetAll',UserID);
                setProducts(response.data);
                setData("");
            }
            catch(err){
                console.log(err);
            }
        }
            FetchData();
    },[data]);

    return(
        <View style={styles.container}>
            <MenuHeader userId={UserId}/>
            <SalesContext.Provider value={{data,setData,selected,setSelected}}>
            <View style={styles.ListHeaderStyle}>
            </View>
            {products&&<FlatList
                data={products}
                renderItem={({item, index}) => (
                    <SalesList all={item}/>
                  )}
                  keyExtractor={(item) => item.id}
            />}
            </SalesContext.Provider>
        </View>
    )
    
}