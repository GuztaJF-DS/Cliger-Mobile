import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import ResponsiveImage from 'react-native-responsive-image';

/*My Components*/
import {styles, InputArea, NewText} from '../../Style';
import Api from '../../../Api';
import Input from '../../../components/form/Input';

/*Icons*/
import Password from '../../../assets/Icons/Password.svg';

/*Image*/
import Logo from '../../../assets/Images/Cliger_Logo_TextOnly.png';

export default function Main({navigation, route}) {
  const [password, setPassword] = useState({});
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const {Email, Token} = route.params;

  /*Data's UseEffect*/
  useEffect(() => {
    async function FetchData() {
      try {
        if (Object.values(data).length !== 0) {
          const resp = await Api.post('auth/ChangePass', data);
          if (resp.data.Error) {
            setError(resp.data);
            return;
          }
          setPassword(resp.data);
          setError({});
        }
      } catch (err) {
        console.error(err);
      }
    }
    FetchData();
  }, [data]);

  async function SendData() {
    navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
  }

  /*Password's UseEffect*/
  useEffect(() => {
    if (Object.values(password).length !== 0) {
      SendData();
    }
  }, [password]);

  /*React-Hooks-Form constants*/
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  /*Submit Form's Function*/
  const onSubmit = data => {
    setData({Email: Email, Token: Token, Password: data.Password});
  };

  /*Other Functions*/
  function errorTreatment(Field) {
    if (errors[Field]) {
      console.error(errors[Field]);
      if (errors[Field].type == 'pattern') {
        if (Field == 'Password') {
          return 'A Senha precisa conter  um caractere maiúsculo';
        }
      } else if (errors[Field].type == 'minLength') {
        if (Field == 'Password') {
          return 'A Senha precisa conter pelo menos 8 dígitos';
        }
      } else {
        return 'Campo Obrigatório';
      }
    }
  }

  /*Front Page*/
  return (
    <ScrollView style={styles.container}>
      <View style={styles.Center}>
        <ResponsiveImage
          source={Logo}
          style={styles.ImageStyle}
          initWidth="218"
          initHeight="83.5"
        />
      </View>
      <View style={styles.Center}>
        <Text style={{marginTop: '2%', color: '#ebb89b'}}>
          Digite a Sua Nova Senha
        </Text>
      </View>

      <Input
        IconSvg={Password}
        Control={control}
        Name={'Password'}
        Placeholder={'Senha'}
        SignUp={true}
        Password={true}
      />
      {errorTreatment('Password') && (
        <Text style={styles.TouchableTextStyle}>
          {errorTreatment('Password')}
        </Text>
      )}

      <View style={styles.Center}>
        <InputArea underlayColor="#5e2638" onPress={handleSubmit(onSubmit)}>
          <NewText>Entrar</NewText>
        </InputArea>
      </View>
      {error['Error'] && (
        <Text style={styles.TouchableTextStyle}>{error['Error']}</Text>
      )}
    </ScrollView>
  );
}
