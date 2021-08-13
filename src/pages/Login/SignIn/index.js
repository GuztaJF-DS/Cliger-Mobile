/*Components*/
import React,{ useState,useEffect } from 'react';
import { View,ScrollView,Text,TouchableOpacity} from 'react-native';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveImage from "react-native-responsive-image";

/*My Components*/
import {styles,InputArea,NewText} from '../../Style';
import Api from '../../../Api';
import Input from '../../../components/form/Input';

/*Icons*/
import Email from '../../Resources/Icons/Email.svg';
import Password from '../../Resources/Icons/Password.svg';

export default function Main({ navigation }) {
  const [login,setLogin]=useState({});
  const [data,setData]=useState({});
  const [error,setError]=useState({});

  /*UseEffect: data*/
  useEffect(()=>{
    async function FetchData(){
      try{
        if(Object.values(data).length!=0){
          const resp=await Api.post('auth/authenticate',data);
          if(resp.data.Error){
            setError(resp.data);
            return;
          }
          setLogin(resp.data);
          setError("{}");
          AsyncStorage.setItem('@MasterToken', resp.data.ConfirmToken);

        }
      }catch(err){
        console.log(err);
        setError(err);
      }
    }
    FetchData();
  },[data]);

  /*UseEffect: Login*/
  useEffect(()=>{
    async function SendData(){
      navigation.navigate('Main', {
        Id:login.id,
        BirthDate:login.BirthDate,
        Email:login.Email,
        UserName:login.UserName,
      });
    }
    if(Object.values(login).length!=0){
      SendData();
    }
  },[login])

  /*React-Hooks-Form constants*/
  const {control, handleSubmit, formState: { errors }}=useForm();
  
  /*Submit Form's Function*/
  const onSubmit=(data)=>{
      let Body={
        Email:data.Email,
        Password:data.Password
      }
      setData(Body);
  }

  /*Other Functions*/
  function errorTreatment(Field){
    if(errors[Field]){
      if(errors[Field].type=="pattern"){
        return "O Email está incorreto";
      }
      else{
        return "Campo Obrigatório";
      }
    }
  }

  /*Front Page*/
  return (
    <ScrollView style={styles.container}>
      <View style={styles.Center}>
        <ResponsiveImage 
          source={require('../../Resources/Images/Cliger_Logo_TextOnly.png')}
          style={styles.ImageStyle}
          initWidth="218"
          initHeight="83.5"
        />
      </View>
        <Input IconSvg={Email} Control={control} Name={"Email"} Placeholder={"Email"} keyboardType={"email-address"}/>
        {errorTreatment("Email") && <Text style={styles.TouchableTextStyle}>{errorTreatment("Email")}</Text>}
        <Input IconSvg={Password}  Control={control} Name={"Password"} Placeholder={"Senha"} Password={true}/>
        {errorTreatment("Password") && <Text style={styles.TouchableTextStyle}>{errorTreatment("Password")}</Text>}
        {error["Error"] && <Text style={styles.TouchableTextStyle}>{error["Error"]}</Text>}

        <View style={styles.Center}>
          <InputArea 
          underlayColor="#5e2638"
          onPress={handleSubmit(onSubmit)}>
              <NewText>Entrar</NewText>
          </InputArea>
        </View>
        

        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{marginTop:'7%',justifyContent:'center',flexDirection:'row'}}
        >
        <Text style={styles.TouchableTextStyle}>Não Possui Uma Conta?,</Text><Text style={styles.TouchableBoldTextStyle}> Clique Aqui Para Se Cadastrar</Text>
        
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate('EmailSelectChangePassword')}
          style={{marginTop:'7%',justifyContent:'center',flexDirection:'row'}}
        >
        <Text style={styles.TouchableTextStyle}>Esqueceu a senha?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
