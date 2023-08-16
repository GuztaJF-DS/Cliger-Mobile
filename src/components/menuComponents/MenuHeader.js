import React, {useState, useEffect} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import styled from 'styled-components/native';
import {vh, vw} from 'react-native-expo-viewport-units';
import ResponsiveImage from 'react-native-responsive-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import Logo from '../../assets/Images/Cliger_Logo_TextOnly.png';

const Header = styled.View`
	width: 80%;
	height: ${vh(8.5)}px;
	flex-direction: column;
	justify-content: center;
	background-color: #582536;
`;

const LogOutView = styled.View`
	width: 20%;
	height: ${vh(8.5)}px;
	align-items: center;
	flex-direction: row;
	justify-content: center;
	background-color: #582536;
`;

const CashInfo = styled.Text`
	color: #582536;
	font-size: ${vh(2.5)}px;
	font-weight: bold;
`;
const CashHeader = styled.View`
    border-bottom-left-radius:20px;
    border-bottom-right-radius:20px;
    border-top-left-radius:1.5px;
    border-top-right-radius:1.5px;
    width:100%;
    height:${vh(3.5)}px;
    background-color:#e9f7d6;
    align-items:center;
    justify-content:center;
`;

export default function MenuHeader({userId, refresh, navigation}) {
	const [cash, setCash] = useState(0);
	const [data, setData] = useState('');

	async function LogOut() {
		try {
			await AsyncStorage.removeItem('@MasterToken');
			navigation.reset({
				index: 0,
				routes: [
					{
						name: 'PreLoad',
					},
				],
			});
		} catch (err) {
			console.err(err);
		}
	}

	if (refresh == true) {
		FetchCash();
	}

	useEffect(() => {
		FetchCash();
	}, [data]);
	async function FetchCash() {
		try {
			const response = await Api.post('/finance/getAll', {userId: userId});
			if (Object.values(response.data).length !== 0) {
				let x = response.data.length;
				setCash(response.data[x - 1].CurrentBalance);
				setData('a');
			}
		} catch (err) {
			console.error(err);
		}
	}

	return (
		<>
			<View style={{flexDirection: 'row'}}>
				<Header>
					<ResponsiveImage
						source={Logo}
						initWidth={129}
						initHeight={49.4}
						style={{marginLeft: vw(34.3)}}
					/>
				</Header>
				<LogOutView>
					<TouchableHighlight
						onPress={() => {
							LogOut();
						}}>
						<Text style={{color: '#ebb89b'}}>Sair</Text>
					</TouchableHighlight>
				</LogOutView>
			</View>
			<CashHeader>
				<CashInfo>Saldo: R$ {cash}</CashInfo>
			</CashHeader>
		</>
	);
}
