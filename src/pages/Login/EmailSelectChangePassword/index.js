import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import ResponsiveImage from 'react-native-responsive-image';
import Modal from 'react-native-modal';
import {vw} from 'react-native-expo-viewport-units';

/*My Components*/
import {styles, InputArea, NewText} from '../../Style';
import Api from '../../../Api';
import Input from '../../../components/form/Input';

/*Icons*/
import Email from '../../../assets/Icons/Email.svg';

/*Image*/
import Logo from '../../../assets/Images/Cliger_Logo_TextOnly.png';

export default function Main({navigation}) {
  const [mail, setMail] = useState({});
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [modalView, setModalView] = useState(false);

  /*Data's UseEffect*/
  useEffect(() => {
    async function FetchData() {
      try {
        if (Object.values(data).length != 0) {
          setModalView(true);
          const resp = await Api.post('auth/forgotPass', data);
          if (resp.data.Error) {
            setModalView(false);
            setError(resp.data);
            return;
          }
          setModalView(false);
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
          name: 'EmailCheckToken',
          params: {
            Email: data.Email,
          },
        },
      ],
    });
  }

  /*Mail's UseEffect*/
  useEffect(() => {
    if (Object.values(mail).length != 0) {
      SendData();
    }
  }, [mail]);

  /*React-Hooks-Form constants*/
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  /*Submit Form's Function*/
  const onSubmit = data => {
    setData({Email: data.Email});
  };

  /*Other Functions*/
  function errorTreatment(Field) {
    if (errors[Field]) {
      if (errors[Field].type == 'pattern') {
        return 'O Email está incorreto';
      } else {
        return 'Campo Obrigatório';
      }
    }
  }

  /*Front Page*/
  return (
    <ScrollView style={styles.container}>
      <Modal
        isVisible={modalView}
        style={{justifyContent: 'center', alignItems: 'center', height: '10%'}}>
        <View style={styles.Center}>
          <Text style={{fontSize: vw(4.5), color: '#ebb89b'}}>Carregando</Text>
        </View>
      </Modal>

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
          Insira seu email para procurar a sua conta.
        </Text>
      </View>

      <Input
        IconSvg={Email}
        Control={control}
        Name={'Email'}
        Placeholder={'Email'}
      />
      {errorTreatment('Email') && (
        <Text style={styles.TouchableTextStyle}>{errorTreatment('Email')}</Text>
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
