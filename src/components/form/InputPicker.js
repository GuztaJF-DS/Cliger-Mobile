import React from 'react';
import {View} from 'react-native';
import { Controller } from 'react-hook-form';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';

const InputArea=styled.View`
  width:75%;
  height:40px;
  flex-direction:row;
  padding-left:15px;
  align-items:center;
  padding:0.1px;
  border-bottom-width: 1px;
  border-bottom-color:#ecb99b;
  border-left-width: 2px;
  border-left-color:#ecb99b;
  border-bottom-left-radius: 17px
  border-top-left-radius: 12px
`

export default ({Control,Name})=>{
    return(
      <InputArea>
      <Controller
          control={Control}
          rules={{
           required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                  width:'100%'
              }}
            >
              <Picker
                onBlur={onBlur}
                onValueChange={onChange}
                selectedValue={value}
                style={{color:'white'}}
              >
                <Picker.Item label="Produto" value="Produto"/>
                <Picker.Item label="Serviço" value="Serviço"/>
              </Picker>
            </View>
          )}
          name={Name}
          defaultValue=""
        />
        </InputArea>

    )
}
