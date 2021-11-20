import React,{useContext, useEffect,useState} from 'react';
import styled from 'styled-components';
import { vw } from 'react-native-expo-viewport-units';
import { View,TextInput,Text } from 'react-native';

import {ProductViewName,ProductPress,ProductText} from '../productComponents/List'
import SalesContext from '../../contexts/SalesContext';

const NumbersCounterView=styled.View`
    alignItems:center;
    borderLeftColor:#ebb89b;
    borderLeftWidth:2px;
    borderBottomColor:#ebb89b;
    borderBottomWidth:2px;
`

export default ({all})=>{
    const {data,setData,selectedData,setSelectedData}=useContext(SalesContext);
    const [viewColor,setViewColor]=useState('#68293f');
    const [amount,setAmount]=useState('1');
    const [weight,setWeight]=useState('1000');
    const [inputIsEditable,setInputIsEditable]=useState(true);

    function splitAndOrganizeArray(Name){
        let Var=String(selectedData[Name])
        let SplitedVar=Var.split(",");

        return(SplitedVar)
    }
    function RemoveItemArray(Name,i){
        selectedData[Name].splice(i,1)
        if(selectedData[Name][0]==""||selectedData[Name].length==0){
            if(selectedData[Name][1]==undefined){
                setSelectedData({})
                return true
            }
        }
    }

    useEffect(()=>{
        if(all.id==data.id){
            var i=0 
            var AlreadySelected=false
            if(weight===""){
                setWeight("1")
            }
            if(amount===""){
                setAmount("1")
            }

            if(Object.values(selectedData)[0]!=undefined){
                while(i<=selectedData.Id.length){
                        if(selectedData.Id[i]==all.id){
                            setInputIsEditable(true);
                            AlreadySelected=true
                            let DeletedAll=RemoveItemArray("Id",i)
                            if(DeletedAll!=true){
                                RemoveItemArray("Price",i)
                                RemoveItemArray("Amount",i)
                                RemoveItemArray("Weight",i)
                            }
                            setViewColor("#68293f")
                            i=selectedData.length
                        }
                    
                    i++;
                }
            }        
            if(AlreadySelected==false){
                setViewColor("#330f1c")
                setInputIsEditable(false);
                if(selectedData.Id!=undefined){
                    let SplitedId=splitAndOrganizeArray("Id");
                    let SplitedPrice=splitAndOrganizeArray("Price");
                    let SplitedAmount=splitAndOrganizeArray("Amount");
                    let SplitedWeight=splitAndOrganizeArray("Weight");

                    setSelectedData({
                        "Id":[...SplitedId,`${all.id}`],
                        "Amount":[...SplitedAmount,amount],
                        "Weight":[...SplitedWeight,weight],
                        "Price":[...SplitedPrice,`${all.Value}`]
                    })
                }else{
                    setSelectedData({"Id":[`${all.id}`],"Amount":[amount],"Weight":[weight],"Price":[`${all.Value}`]})
                }
            }
        }
    },[data])

    return(
        <View
            style={{flexDirection:"row"}}
        >
            <ProductPress
                key={all.Id}
                onPress={()=>{
                    if(weight===""){
                        setWeight("1000")
                    }
                    if(amount===""){
                        setAmount("1")
                    }
                    setData(all)
                }}
            >
                <>
                    <ProductViewName style={{width:vw(65),backgroundColor:viewColor}}>
                            <ProductText style={{fontSize:22}}>{all.Name}</ProductText>
                    </ProductViewName>
                </>
            </ProductPress>
            <NumbersCounterView style={{
                backgroundColor:viewColor
            }}>
                <TextInput style={{
                        height:40,
                        fontSize:vw(4.2),
                        color:'#ebb89b',
                        width:vw(16.4)  
                    }} 
                    editable={inputIsEditable}
                    onChangeText={(amount)=>{
                        if(amount<0||amount=='0')
                            {setAmount("1")}
                        else
                            {setAmount( amount )}
                        }}
                    value={amount}
                />
            </NumbersCounterView>
            <NumbersCounterView style={{
                borderRightWidth:2,
                borderRightColor:'#ebb89b',
                backgroundColor:viewColor,
                width:vw(17.3),
                flexDirection:'row'
            }}>
                <TextInput style={{
                        height:40,
                        fontSize:vw(4.2),
                        color:'#ebb89b',
                        width:vw(11.6),
                    }}
                    editable={inputIsEditable}
                    keyboardType = 'numeric'
                    onChangeText={(weight)=>{
                    if(weight<0||weight=="0")
                        {setWeight("1000")}
                    else
                        {setWeight( weight )}
                    }}
                    value={weight}
                />
                <Text style={{
                    width:vw(2),
                    color:'#ebb89b'}}>G</Text>
            </NumbersCounterView>
        </View>
    )
}