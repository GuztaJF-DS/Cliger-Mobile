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


export default function Finance({navigation,route}){
    const {UserId}=route.params;
    const [financeData,setFinanceData]=useState('');
    const [dataType,setDataType]=useState('Saldo Total');
    const [modalVisible,setModalVisible]=useState(false);
    const [profitData,setProfitData]=useState('');
    const [toWriteWeekend,setToWriteWeekend]=useState('');
    const [refresh,setRefresh]=useState(false);

  /*UseEffect: dataType*/
    useEffect(()=>{
        async function fetchData(){
            try{
                console.log(UserId)
                if(dataType==='Saldo Total'){
                    const response=await Api.post('/finance/getAll',{"userId":UserId});
                    const RawData=response.data;
                    setFinanceData({"Type":"Finance",RawData});
                }
                else if(dataType==='Vendas'){
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
    const {control, handleSubmit}=useForm();

    /*Submit Form's Function*/
    const onSubmit=(data)=>{
        setToWriteWeekend(data.Weekend)
        let Info=BusinessProfit(data.FixedCosts,data.Avarage,data.Weekend);
        setProfitData(Info)
    }

    /*Front Page*/
    return(
        <View style={styles.container}>
            <MenuHeader refresh={refresh} userId={UserId} navigation={navigation} route={route}/>
            <NewText>{dataType}</NewText>
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
                <LightInput Control={control} Name={"FixedCosts"} Placeholder={"Custos Totais por m??s"} keyboardType={"numeric"} defaultValue={""}/>
                <LightInput Control={control} Name={"Avarage"} Placeholder={"M??dia da Renda Di??ria"} keyboardType={"numeric"} defaultValue={""}/>
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
                    Considerando o estabelecimento {toWriteWeekend} o que d?? {profitData.TotalDays} Dias ??teis ao Fim do M??s,
                    Se Ganharmos em m??dia {profitData.Avarage} R$ por dia, levaremos {profitData.ToSale} Dias,
                    para recuperar o dinheiro investido, segundo essa estimativa,
                    ao Final do m??s teremos {profitData.EstimatedProfit} R$ de Lucro
                </Text>  
                :profitData.IsProfitable==false?
                <Text style={{color:'white',marginTop:7}}>
                Considerando o estabelecimento {toWriteWeekend} o que d?? {profitData.TotalDays} Dias ??teis ao Fim do M??s,
                Se Ganharmos em m??dia {profitData.Avarage} R$, n??o consiguiremos recuperar o dinheiro investido,
                segundo essa estimativa, ao Final do m??s teremos {profitData.EstimatedProfit} R$ de Prejuizo
            </Text>:null}
                </View>
            </Modal>


            <View style={{
                alignItems:'center'
            }}>
                <InputArea onPress={()=>{setDataType('Saldo Total')}}><NewText>Ver saldo total</NewText></InputArea>
                <InputArea onPress={()=>{setDataType('Vendas')}}><NewText>Ver Vendas</NewText></InputArea>
                <InputArea onPress={()=>{setModalVisible(true)}}><NewText>Simular Lucro ao Fim do m??s</NewText></InputArea>
            </View>
        </View>
    )
}