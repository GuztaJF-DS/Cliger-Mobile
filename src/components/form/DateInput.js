import React,{useState} from 'react'
import { Controller } from 'react-hook-form'
import DatePicker from 'react-native-date-picker'
import styled from 'styled-components/native';
import { vh } from 'react-native-expo-viewport-units';

const InputArea=styled.View`
  height:${vh(35)}px;
  justify-content:center;
  align-items:center;
  backgroundColor:#ffffff
`


export default ({Control,Name})=>{
  const [date, setDate] = useState(new Date());

    return(
      <InputArea>
      <Controller
          control={Control}
          rules={{
            required: true
           }}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              onDateChange={onChange}
              date={value}
              mode="date"
              androidVariant="nativeAndroid"
            />
          )}
          name={Name}
          defaultValue={date}
        />
        </InputArea>

    )
}
