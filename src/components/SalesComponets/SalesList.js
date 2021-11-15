import React,{useContext, useEffect,useState} from 'react';
import { vw } from 'react-native-expo-viewport-units';
import { useForm  } from 'react-hook-form';
import {ProductViewName,ProductPress,ProductText} from '../productComponents/List'
import SalesContext from '../../contexts/SalesContext';

export default ({all})=>{
    const {data,setData,selected,setSelected}=useContext(SalesContext);
    
    const [viewColor,setViewColor]=useState('#68293f')

    useEffect(()=>{
        if(all.id==data.id){
            var i=0 
            var AlreadySelected=false
            while(i<=selected.length){
                if(selected[i]!==undefined){
                    if(selected[i].Id==all.id){
                        AlreadySelected=true
                        selected.splice(i,1)
                        setViewColor("#68293f")
                        i=selected.length
                    }
                }
                
                i++;
            }
            if(AlreadySelected==false){
                setViewColor("#330f1c")
                setSelected([...selected,{"Id":all.id,"Amount":1,"Weight":0,"Price":all.Value}])
            }
        }
    },[data])
    useEffect(()=>{
        console.log(selected)
    },[selected])

    return(
            <ProductPress
                key={all.Id}
                onPress={()=>{setData(all)}}
            >
                <>
                    <ProductViewName style={{width:vw(100),backgroundColor:viewColor}}>
                            <ProductText style={{fontSize:22}}>{all.Name}</ProductText>
                    </ProductViewName>
                </>
            </ProductPress>
    )
}