import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainStack from './src/stack/MainStack';

export default()=>{
  return(
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  )
}
