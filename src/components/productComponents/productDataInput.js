import React,{useState,useContext} from 'react';
import {View,Text} from 'react-native';
import styled from 'styled-components';
import LightInput from '../form/LightInput';
import { useForm } from 'react-hook-form';
import ProductContext from '../../contexts/ProductContext';

const EditButton=styled.TouchableOpacity`
    borderRadius:4px;
    borderColor:#fff;
    borderWidth:1px;
    padding:2px;
    justifyContent:center;
`

export default function ProductDataInput({Data,Name,TrueName,KeyboardType}){
    const {setUpdateData}=useContext(ProductContext);
    const [editing,setEditing]=useState(false);
    const {control, handleSubmit,formState:{errors}}=useForm();

    const onSubmit=(data)=>{
        setEditing(!editing);
        setUpdateData(data);
    }

    return(
        <View style={{
            justifyContent:'space-between',
            flexDirection:'row',
            alignContent:'center',
            marginBottom:7,
            
        }}>
            {(editing!=true)?
            <>
                <Text style={{color:'white',fontSize:17}}>{Name}: {Data}</Text> 
                <EditButton onPress={()=>setEditing(!editing)}>
                    <Text style={{color:'white',fontSize:17}}>
                        Editar
                    </Text>
                </EditButton>
            </>:
            <>
                <LightInput Control={control} Name={TrueName}  Placeholder={Name} keyboardType={KeyboardType} defaultValue={String(Data)}/>
                    <EditButton onPress={handleSubmit(onSubmit)}>
                    <Text style={{color:'green',fontSize:17}}>
                        Concluir
                    </Text>
                </EditButton>
            </>
            }
            
        </View>
    )
}