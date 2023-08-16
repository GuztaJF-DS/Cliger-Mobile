import React from 'react';
import {View} from 'react-native';
import {Controller} from 'react-hook-form';
import styled from 'styled-components/native';
// import { Picker } from '@react-native-picker/picker';

const InputArea = styled.View`
  height: 45px;
  flex-direction: row;
  padding-left: 15px;
  align-items: center;
  padding: 0.1px;
  border-bottom-width: 1px;
  border-bottom-color: #ecb99b;
  border-left-width: 2px;
  border-left-color: #ecb99b;
  border-bottom-left-radius: 17px;
  border-top-left-radius: 12px;
  margin-top: 10px;
`;

export default function InputPicker({Control, Name, Values}) {
  return (
    <InputArea>
      <Controller
        control={Control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View
            style={{
              width: '100%',
            }}>
            {/* <Picker
              onBlur={onBlur}
              onValueChange={onChange}
              selectedValue={value}
              style={{ color: 'white' }}
              placeholder={'Picker'}
            >
              {Values.map((Item) => (
                <Picker.Item key={Item.indexOf(Item)} label={Item} value={Item} />
              ))}
            </Picker> */}
          </View>
        )}
        name={Name}
        defaultValue={Values[0]}
      />
    </InputArea>
  );
}
