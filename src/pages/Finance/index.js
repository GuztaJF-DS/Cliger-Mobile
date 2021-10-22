import React,{ useEffect,useState } from "react";
import { View,Text,TouchableHighlight } from "react-native";
import { useForm } from "react-hook-form";
import Modal from "react-native-modal";

/*My Components*/
import Api from '../../Api';
import { styles,InputArea,NewText } from "../Style";
import MenuHeader from '../../components/menuComponents/MenuHeader';
import LineGraphic from '../../components/finances/LineGraphic';
import BusinessProfit from '../../components/finances/BusinessProfit';
import CloseButton from "../../components/form/CloseButton";
import LightInput from "../../components/form/LightInput";
import InputPicker from "../../components/form/InputPicker";


export default function Finance({route}){
    const {UserId}=route.params;
    const [financeData,setFinanceData]=useState('');
    const [dataType,setDataType]=useState('Finance');
    const [modalVisible,setModalVisible]=useState(false);
    const [profitData,setProfitData]=useState('');
    const [toWriteWeekend,setToWriteWeekend]=useState('');

  /*UseEffect: dataType*/
    useEffect(()=>{
        async function fetchData(){
            try{
                if(dataType==='Finance'){
                    const response=await Api.post('/finance/getAll',{"userId":UserId});
                    const RawData=response.data;
                    setFinanceData({"Type":"Finance",RawData});
                }
                else if(dataType==='Sales'){
                    const response=await Api.post('/SalesRecord/getAll',{"userId":UserId});
                    const RawData=response.data;
                    setFinanceData({"Type":"Sales",RawData});
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[dataType]);

    /*React-Hooks-Form constants*/
    const {control, handleSubmit,formState:{errors}}=useForm();

    /*Submit Form's Function*/
    const onSubmit=(data)=>{
        setToWriteWeekend(data.Weekend)
        let Info=BusinessProfit(0,data.FixedCosts,data.Avarage,31,data.Weekend);
        setProfitData(Info)
    }

    /*Front Page*/
    return(
        <View style={styles.container}>
            <MenuHeader userId={UserId}/>
            <LineGraphic data={financeData}/>
            
            <Modal
                isVisible={modalVisible}
            >
                <View
                    style={{
                        backgroundColor:"#471023",
                        padding:10,
                        borderRadius:5,
                    }}
                >
                <CloseButton OnPressfunction={()=>{setModalVisible(false)}}/>
                <LightInput Control={control} Name={"FixedCosts"} Placeholder={"Custos Totais por mês"} defaultValue={""}/>
                <LightInput Control={control} Name={"Avarage"} Placeholder={"Média da Renda Diária"} defaultValue={""}/>
                <InputPicker Control={control} Name={"Weekend"} Values={["Fechado aos Sabados e Domingos","Fechado somente aos Domingos"]}/>

                <TouchableHighlight onPress={handleSubmit(onSubmit)}>
                    <View style={{
                        marginTop:10,
                        borderRadius:10,
                        borderColor: '#ebb89b',
                        borderWidth:2,
                        padding: 5,
                        alignItems:'center'
                    }}>
                    <NewText>Simular</NewText>
                    </View>
                </TouchableHighlight>
                {profitData.IsProfitable==true?
                <Text style={{color:'white',marginTop:7}}>
                    Considerando o estabelecimento {toWriteWeekend} o que dá {profitData.TotalDays} Dias úteis ao Fim do Mês,
                    Se Ganharmos em média {profitData.Avarage} R$ por dia, levaremos {profitData.ToSale} Dias,
                    para recuperar o dinheiro investido, segundo essa estimativa,
                    ao Final do mês teremos {profitData.EstimatedProfit} R$ de Lucro
                </Text>  
                :profitData.IsProfitable==false?
                <Text style={{color:'white',marginTop:7}}>
                Considerando o estabelecimento {toWriteWeekend} o que dá {profitData.TotalDays} Dias úteis ao Fim do Mês,
                Se Ganharmos em média {profitData.Avarage} R$, não consiguiremos recuperar o dinheiro investido,
                segundo essa estimativa, ao Final do mês teremos {profitData.EstimatedProfit} R$ de Prejuizo
            </Text>:null}
                </View>
            </Modal>
            <View style={{
                alignItems:'center'
            }}>
                <InputArea onPress={()=>{setDataType('Finance')}}><NewText>Ver saldo total</NewText></InputArea>
                <InputArea onPress={()=>{setDataType('Sales')}}><NewText>Ver Vendas</NewText></InputArea>
                <InputArea onPress={()=>{setModalVisible(true)}}><NewText>Simular Lucro ao Fim do mês</NewText></InputArea>
            </View>
        </View>
    )
}