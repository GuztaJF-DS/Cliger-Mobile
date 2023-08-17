import React from 'react';
import styled from 'styled-components/native';
import {vw, vh} from 'react-native-expo-viewport-units';

const MenuInput = styled.TouchableOpacity`
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const MenuText = styled.Text`
	text-align: center;
	font-size: ${vw(4)}px;
	color: #ecb99b;
`;

export default function MenuButton({Name, IconSvg, Type, OnPress}) {
	const Size = Type == 'Large' ? 90 : 40;
	const IconWidth = Type == 'Large' ? 35 : 20;

	const MenuInputArea = styled.View`
		margin-top: ${vh(3)}px;
		width: ${vw(Size)}px;
		justify-content: center;
		align-items: center;
		border-width: 2.5px;
		border-color: #ecb99b;
		border-radius: 10px;
		padding: 1px;
	`;

	return (
		<MenuInputArea>
			<MenuInput onPress={OnPress}>
				<IconSvg width={vw(IconWidth)} height={vh(15)} />
				<MenuText>{Name}</MenuText>
			</MenuInput>
		</MenuInputArea>
	);
}
