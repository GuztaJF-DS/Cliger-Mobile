import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PreLoad from '../pages/PreLoad/index';
import SignUp from '../pages/SignUp/index';
import SignIn from '../pages/SignIn/index';
import EmailSelectChangePassword from '../pages/EmailSelectChangePassword/index'
import EmailCheckToken from '../pages/EmailCheckToken/index'
import PasswordChange from '../pages/PasswordChange/index'
import Main from '../pages/MainMenu/index';

export default()=>{
  const Stack=createStackNavigator();

  return(
    <Stack.Navigator
      initialRouteName="PreLoad"
      screenOptions={{
	  		headerShown:false
	  	}}
    >
    <Stack.Screen name="PreLoad" component={PreLoad}/>
    <Stack.Screen name="SignUp" component={SignUp}/>
    <Stack.Screen name="SignIn" component={SignIn}/>
    <Stack.Screen name="EmailSelectChangePassword" component={EmailSelectChangePassword}/>
    <Stack.Screen name="EmailCheckToken" component={EmailCheckToken}/>
    <Stack.Screen name="PasswordChange" component={PasswordChange}/>
    <Stack.Screen name="Main" component={Main}/>
    </Stack.Navigator>
  )
}
