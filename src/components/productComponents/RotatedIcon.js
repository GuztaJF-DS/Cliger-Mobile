import React from 'react';
import { View,Text } from 'react-native';

export default ({Order,Op})=>{
    var deg=
    (Op==1)?
        (Order=="3"||Order=="4")?
            0   
        :(Order=="1")?
        90:-90
    :(Op==2)?
        (Order=="1"||Order=="2")?
            180
        :(Order=="3")?
            90:-90
    :0

    return(
        <View style={{
            transform: [{ rotate: `${deg}deg` }]
        }}>
            <Text style={{color:"#ebb89b"}}>
                {'>'}
            </Text>
        </View>
    )
}
