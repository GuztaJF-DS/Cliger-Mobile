import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PreLoad from '../pages/Login/PreLoad/index';
import SignUp from '../pages/Login/SignUp/index';
import SignIn from '../pages/Login/SignIn/index';
import EmailSelectChangePassword from '../pages/Login/EmailSelectChangePassword/index'
import EmailCheckToken from '../pages/Login/EmailCheckToken/index'
import PasswordChange from '../pages/Login/PasswordChange/index'
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
