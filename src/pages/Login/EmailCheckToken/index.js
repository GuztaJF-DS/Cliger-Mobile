import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import ResponsiveImage from 'react-native-responsive-image';

/*My Components*/
import {styles, InputArea, NewText} from '../../Style';
import Api from '../../../Api';
import Input from '../../../components/form/Input';

/*Icons*/
import Mail from '../../../assets/Icons/Email.svg';

/*Image*/
import Logo from '../../../assets/Images/Cliger_Logo_TextOnly.png';

export default function Main({navigation, route}) {
  const [mail, setMail] = useState({});
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const {Email} = route.params;

  /*Data's UseEffect*/
  useEffect(() => {
    async function FetchData() {
      try {
        if (Object.values(data).length !== 0) {
          const resp = await Api.post('auth/ConfirmToken', data);
          if (resp.data.Error) {
            setError(resp.data);
            return;
          }
          setMail(resp.data);
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
      routes: [
        {
          name: 'PasswordChange',
          params: {
            Email: Email,
            Token: data.Token,
          },
        },
      ],
    });
  }
  /*Mail's UseEffect*/
  useEffect(() => {
    if (Object.values(mail).length !== 0) {
      SendData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mail]);

  /*React-Hooks-Form constants*/
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  /*Submit Form's Function*/
  const onSubmit = data => {
    setData({Email: Email, Token: data.Token});
  };

  /*Other Functions*/
  function errorTreatment(Field) {
    if (errors[Field]) {
      return 'Campo Obrigatório';
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
          Digite o Codigo que você recebeu via Email
        </Text>
      </View>

      <Input
        IconSvg={Mail}
        Control={control}
        Name={'Token'}
        Placeholder={'Token'}
      />
      {errorTreatment('Token') && (
        <Text style={styles.TouchableTextStyle}>{errorTreatment('Token')}</Text>
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
