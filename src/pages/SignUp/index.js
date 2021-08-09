import React, { useEffect,useState, } from 'react';
import { View,ScrollView,Text, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveImage from "react-native-responsive-image";
import Modal from 'react-native-modal';

/*My Components*/
import Api from '../../Api';
import Input from '../../components/form/Input';
import DateInput from '../../components/form/DateInput';
import DateShow from '../../components/form/DateShow';
import {styles,InputArea,NewText} from '../Style'

/*Icons*/
import Email from '../../Resources/Icons/Email.svg';
import Password from '../../Resources/Icons/Password.svg';
import Birth from '../../Resources/Icons/Birth.svg';
import Phone from '../../Resources/Icons/Phone.svg';
import User from '../../Resources/Icons/User.svg';

export default function Main({ navigation }) {
  const [product,setProduct]=useState([]);
  const [error,setErrors]=useState({});
  const [dados,setDados]=useState({});
  const [modalVisible,setModalVisible]=useState(false);
  var splitedPreviewDate=""
  var PreviewDateColor="black"
  var PreviewDateOpacity=0.45
  

  /*UseEffect: Dados*/
  useEffect(()=>{
    async function fetchData() {
      try{
        if(Object.values(dados).length!=0){
          const response=await Api.post('/auth/register',dados);
          setProduct(response.data);
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[dados]);

  /*UseEffect: Product*/
  useEffect(()=>{
    if(Object.values(product).length!=0){
      if(product.Error!=undefined){
        setErrors(JSON.parse(`{"General":{"message":"${product.Error}"}}`));
      }else if (product.message!=undefined) {
         AsyncStorage.setItem('@MasterToken', product.ConfirmToken);
         navigation.navigate('Main', {
          Id:product.Id,
          BirthDate:dados.BirthDate,
          Email:dados.Email,
          UserName:dados.UserName,
        });
      }
    }
  },[product]);

  
  /*React-Hooks-Form constants*/
  const {control, handleSubmit, formState: { errors }}=useForm();
  
  /*BirthDate Preview*/
  if(control.fieldsRef.current.BirthDate!=undefined){
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    let PreDate=(control.fieldsRef.current.BirthDate._f.value);
    let dataISODataHora = new Date(PreDate);
    let dataFormatada = (((dataISODataHora.getDate()<10)?"0"+dataISODataHora.getDate():dataISODataHora.getDate() )) + "/" + ((meses[(dataISODataHora.getMonth())])) + "/" + dataISODataHora.getFullYear();
    PreviewDateColor="#ebb89b";
    PreviewDateOpacity=1;
    splitedPreviewDate=dataFormatada;
      
  }else{
    splitedPreviewDate='Data de Nascimento'
  }

  /*Submit Form's Function*/
  const onSubmit=(data)=>{
    if(control.fieldsRef.current.BirthDate!=undefined){
      const unsplitedDate=data.BirthDate
      var splitedData=unsplitedDate.toISOString().substring(0, 10);
      let Body={
        UserName:data.UserName,
        Email:data.Email,
        Password:data.Password,
        BirthDate:splitedData,
        PhoneNumber:data.PhoneNumber,
      }
      setDados(Body)
    }
  }

  /*Other Functions*/
  function BirthDateTreatment(){
    if(control.fieldsRef.current.BirthDate==undefined && control.fieldsRef.current.Password!=undefined){
        return "Campo obrigatorio"
    }
  }

  function errorTreatment(Field){
    if(errors[Field]){
      if(errors[Field].type=="pattern"){
        return "O Email está incorreto";
      }else if(errors[Field].type=="minLength"){
        return "O Telefone está Incompleto";
      }
      else{
        return "Campo Obrigatório";
      }
    }
    return null;
  }


  /*Front Page*/
  return (
    <ScrollView style={styles.container}>      
      <View style={styles.Center}>
      <ResponsiveImage 
        source={require('../../Resources/Images/Cliger_Logo_TextOnly.png')}
        style={{marginTop:'5%'}}
        initWidth="180"
        initHeight="68.2"
      />
      </View>
      <Input IconSvg={User} Control={control} Name={"UserName"} Placeholder={"Nome de Usuário"}/>
      {errorTreatment("UserName") && <Text style={styles.TouchableTextStyle}>{errorTreatment("UserName")}</Text>}

      <Input IconSvg={Email} Control={control} Name={"Email"} Placeholder={"Email"}/>
      {errorTreatment("Email") && <Text style={styles.TouchableTextStyle}>{errorTreatment("Email")}</Text>}

      <Input IconSvg={Password} Control={control} Name={"Password"} Placeholder={"Senha"} Password={true}/>
      {errorTreatment("Password") && <Text style={styles.TouchableTextStyle}>{errorTreatment("Password")}</Text>}
      
      <Input IconSvg={Phone} Control={control} Name={"PhoneNumber"} Placeholder={"Número de Telefone"}/>
      {errorTreatment("PhoneNumber") && <Text style={styles.TouchableTextStyle}>{errorTreatment("PhoneNumber")}</Text>}
      
      <DateShow IconSvg={Birth} Name={splitedPreviewDate} Color={PreviewDateColor} Opacity={PreviewDateOpacity} OnPressFunction={() => setModalVisible(true)}/>
      <Modal
        isVisible={modalVisible}
        style={{justifyContent: 'flex-end',height:'10%'}}
      >
        <Button
          title="Sair"
          onPress={() => setModalVisible(false)}
        />
        <DateInput Control={control} Name={"BirthDate"}/>

      </Modal>
      {BirthDateTreatment() && <Text style={styles.TouchableTextStyle}>{BirthDateTreatment()}</Text>}
      <View style={styles.Center}>
        <InputArea 
        underlayColor="#5e2638"
        onPress={handleSubmit(onSubmit)}>
            <NewText>Cadastrar</NewText>
        </InputArea>
      {error['General'] && <Text style={styles.TouchableTextStyle}>{error['General'].message}</Text>}
      </View>
    </ScrollView>
  );
}
