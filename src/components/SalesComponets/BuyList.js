import React from 'react';
import { Text,View,FlatList } from 'react-native'
import { vw } from 'react-native-expo-viewport-units';

export default function BuyList({selectedData,productData}){
    let Names=new Array;
    let fontSize=vw(3.8);
    for(var x in productData){
        for(var y in selectedData.Id){
            if(productData[x].id==selectedData.Id[y]){
                let obj={
                    "Id":x,
                    "Name":productData[x].Name,
                    "Price":productData[x].Value,
                    "Qtd":selectedData.Amount[y],
                    "Weight":selectedData.Weight[y],
                }
                Names.push(obj)
            }
        }
    }
    console.log(Names)

    return(
        <View 
            style={{flexDirection:"column",marginTop:10,marginBottom:10}}
        >
            <View style={{
                        flexDirection:"row",
                        width:100
                      }}>
                    <Text style={{
                        color: '#ebb89b',
                        fontSize:vw(4),
                        width:vw(35),
                        fontSize:fontSize
                    }}>
                        Nome do Produto
                    </Text>
                    <Text style={{
                        color: '#ebb89b',
                        fontSize:vw(4),
                        width:vw(13.5),
                        fontSize:fontSize
                    }}>
                        Preço            
                    </Text>
                    <Text style={{
                        color: '#ebb89b',
                        fontSize:vw(4),
                        width:vw(13.5),
                        fontSize:fontSize
                    }}>
                        Qtd.           
                    </Text>
                    <Text style={{
                        color: '#ebb89b',
                        fontSize:vw(4),
                        width:vw(13.5),
                        fontSize:fontSize
                    }}>
                        Peso           
                    </Text>
                    </View>

            <FlatList                
                data={Names}
                renderItem={({item, index}) => (
                    <View style={{
                        flexDirection:"row",
                        width:100
                      }}>
                    <Text style={{
                        color: '#ebb89b',
                        fontSize:vw(4),
                        width:vw(35),
                        fontSize:fontSize
                    }}>
                        {item.Name}
                    </Text>
                    <Text style={{
                        color: '#ebb89b',
                        fontSize:vw(4),
                        width:vw(13.5),
                        fontSize:fontSize
                    }}>
                        R$ {item.Price}            
                    </Text>
                    <Text style={{
                        color: '#ebb89b',
                        fontSize:vw(4),
                        width:vw(13.5),
                        fontSize:fontSize
                    }}>
                        {item.Qtd}            
                    </Text>
                    <Text style={{
                        color: '#ebb89b',
                        fontSize:vw(4),
                        width:vw(13.5),
                        fontSize:fontSize
                    }}>
                        {item.Weight} G          
                    </Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.Id}
            />
            <Text style={{
                color: '#ebb89b',
                fontSize:vw(4),
                width:vw(35),
                fontSize:fontSize
            }}>          
                {"\n"}Preço Final: {selectedData.TotalCost}
            </Text>
        </View>
    )
}