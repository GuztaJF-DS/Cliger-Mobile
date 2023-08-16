import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveImage from 'react-native-responsive-image';

/*My Components*/
import {styles, InputArea, NewText} from '../../Style';
import Api from '../../../Api';
import Input from '../../../components/form/Input';

/*Icons*/
import Email from '../../../assets/Icons/Email.svg';
import Password from '../../../assets/Icons/Password.svg';
import Phone from '../../../assets/Icons/Phone.svg';
import User from '../../../assets/Icons/User.svg';

/*Image*/
import Logo from '../../../assets/Images/Cliger_Logo_TextOnly.png';
import BirthdayComponent from '../../../components/form/BirthdayComponent';

export default function Main({navigation}) {
	const [product, setProduct] = useState([]);
	const [error, setErrors] = useState({});
	const [dados, setDados] = useState({});

	/*UseEffect: Dados*/
	useEffect(() => {
		async function fetchData() {
			try {
				if (Object.values(dados).length !== 0) {
					const response = await Api.post('/auth/register', dados);
					console.log('response', response);
					setProduct(response.data);
				}
			} catch (err) {
				console.error(err);
			}
		}
		fetchData();
	}, [dados]);

	/*UseEffect: Product*/
	useEffect(() => {
		if (Object.values(product).length !== 0) {
			if (product.Error !== undefined) {
				setErrors(JSON.parse(`{"General":{"message":"${product.Error}"}}`));
			} else if (product.message !== undefined) {
				AsyncStorage.setItem('@MasterToken', product.ConfirmToken);
				navigation.navigate('Main', {
					Id: product.Id,
					BirthDate: dados.BirthDate,
					Email: dados.Email,
					UserName: dados.UserName,
				});
			}
		}
	}, [product]);

	/*React-Hooks-Form constants*/
	const {
		control,
		handleSubmit,
		formState: {errors},
	} = useForm();

	/*Submit Form's Function*/
	const onSubmit = data => {
		console.log(control._fields);
		if (control?._fields?.BirthDate !== undefined) {
			const unSplittedDate = data.BirthDate;
			var splittedData = unSplittedDate.toISOString().substring(0, 10);
			let Body = {
				UserName: data.UserName,
				Email: data.Email,
				Password: data.Password,
				BirthDate: splittedData,
				PhoneNumber: data.PhoneNumber,
			};
			setDados(Body);
		}
	};

	function errorTreatment(Field) {
		if (errors[Field]) {
			if (errors[Field].type == 'pattern') {
				if (Field == 'Email') {
					return 'O Email está incorreto';
				} else if (Field == 'Password') {
					return 'A Senha precisa Conter um Caractere Maiusculo';
				}
			} else if (errors[Field].type == 'minLength') {
				if (Field == 'PhoneNumber') {
					return 'O Telefone está Incompleto';
				} else if (Field == 'Password') {
					return 'A Senha precisa Ter pelo menos 8 Digitos';
				}
			} else {
				return 'Campo Obrigatório';
			}
		}
		return null;
	}

	/*Front Page*/
	return (
		<ScrollView style={styles.container}>
			<View style={styles.Center}>
				<ResponsiveImage
					source={Logo}
					style={{marginTop: '5%'}}
					initWidth="180"
					initHeight="68.2"
				/>
			</View>

			<Input
				IconSvg={User}
				Control={control}
				Name={'UserName'}
				Placeholder={'Nome de Usuário'}
			/>
			{errorTreatment('UserName') && (
				<Text style={styles.TouchableTextStyle}>
					{errorTreatment('UserName')}
				</Text>
			)}

			<Input
				IconSvg={Email}
				Control={control}
				Name={'Email'}
				Placeholder={'Email'}
				keyboardType={'email-address'}
			/>
			{errorTreatment('Email') && (
				<Text style={styles.TouchableTextStyle}>{errorTreatment('Email')}</Text>
			)}

			<Input
				IconSvg={Password}
				Control={control}
				Name={'Password'}
				Placeholder={'Senha'}
				Password={true}
				SignUp={true}
			/>
			{errorTreatment('Password') && (
				<Text style={styles.TouchableTextStyle}>
					{errorTreatment('Password')}
				</Text>
			)}

			<Input
				IconSvg={Phone}
				Control={control}
				Name={'PhoneNumber'}
				Placeholder={'Número de Telefone'}
				maxLength={11}
				keyboardType={'phone-pad'}
			/>
			{errorTreatment('PhoneNumber') && (
				<Text style={styles.TouchableTextStyle}>
					{errorTreatment('PhoneNumber')}
				</Text>
			)}

			<BirthdayComponent control={control} />

			<View style={styles.Center}>
				<InputArea underlayColor="#5e2638" onPress={handleSubmit(onSubmit)}>
					<NewText>Cadastrar</NewText>
				</InputArea>
				{error['General'] && (
					<Text style={styles.TouchableTextStyle}>
						{error['General'].message}
					</Text>
				)}
			</View>
		</ScrollView>
	);
}
