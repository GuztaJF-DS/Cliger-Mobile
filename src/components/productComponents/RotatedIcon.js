import React from 'react';
import { View,Text } from 'react-native';

export default ({Order,Op})=>{
    var Color="#ebb89b";
    var deg=
    (Op==1)?
        (Order=="3"||Order=="4")?
            Color='#68293f' && 0
        :(Order=="1")?
        0:180
    :(Op==2)?
        (Order=="1"||Order=="2")?
            Color='#68293f' && 0
        :(Order=="3")?
            0:180
    :0

    return(
        <View style={{
            transform: [{ rotateZ: `${deg}deg`}]
        }}>
            <Text style={{color:Color}}>
                {'▲'}
            </Text>
        </View>
    )
}
