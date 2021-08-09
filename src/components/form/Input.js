import React from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components/native';

const InputArea=styled.View`
  margin-top:7%;
  margin-left:5px;
  width:97%;
  height:50px;
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

const FormInput =styled.TextInput`
  width:90%;
  font-size:18px;
  margin-left:5px;
`

export default ({IconSvg,Control,Name,Placeholder,Password})=>{
    return(
      <InputArea>
      <Controller
          control={Control}
          rules={{
           required: true,
           pattern:(Name=="Email")? /^\S+@\S+$/i:null,
           minLength:(Name=="PhoneNumber")?11:null
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <FormInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder={Placeholder}
                secureTextEntry={Password}
                color="#ebb89b"
              />
            </>
          )}
          name={Name}
          defaultValue=""
        />
      <IconSvg width="24" height="24"/>
        </InputArea>

    )
}
