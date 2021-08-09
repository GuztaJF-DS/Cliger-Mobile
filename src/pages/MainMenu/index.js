import React from 'react';
import { View,Text } from 'react-native';

export default function Main({navigation,route}){

    const { UserName }=route.params;

    return(
        <View>
            <Text>Menu principal Ainda em construção, senhor {UserName}</Text>
        </View>
    )
}