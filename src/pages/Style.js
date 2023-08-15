import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {vw, vh} from 'react-native-expo-viewport-units';

export const InputArea = styled.TouchableHighlight`
  margin-top: ${vh(4)}px;
  alignitems: center;
  width: ${vw(60)}px;
  borderradius: 10px;
  border: 1px #ebb89b;
  padding: 6px;
`;

export const NewText = styled.Text`
  font-size: ${vw(7)}px;
  textalign: center;
  color: #ebb89b;
`;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#68293f',
    padding: 2,
  },
  ImageStyle: {
    marginTop: vh(3),
    marginBottom: vh(1),
    alignItems: 'center',
  },
  TouchableTextStyle: {
    color: '#ebb89b',
    marginLeft: 6,
  },
  TouchableBoldTextStyle: {
    color: '#ebb89b',
    fontWeight: 'bold',
  },
  Center: {
    alignItems: 'center',
  },
  ListHeaderStyle: {
    borderBottomColor: '#ebb89b',
    borderBottomWidth: 2,
    flexDirection: 'row',
    marginTop: vh(2),
  },
});
