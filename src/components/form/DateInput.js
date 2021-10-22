import React,{useState} from 'react'
import { Controller } from 'react-hook-form'
import DatePicker from 'react-native-date-picker'
import styled from 'styled-components/native';

const InputArea=styled.View`
  backgroundColor: #fee2cf;
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
