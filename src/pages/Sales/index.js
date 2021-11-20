import React,{useState,useEffect} from 'react';
import {View,Text,FlatList, TouchableHighlight,BackHandler,Alert} from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import Modal from 'react-native-modal';
import {useForm} from 'react-hook-form'

import {styles,NewText} from '../Style';
import Api from '../../Api';
import SalesList from '../../components/SalesComponets/SalesList';
import SalesContext from '../../contexts/SalesContext';
import MenuHeader from '../../components/menuComponents/MenuHeader';
import CloseButton from '../../components/form/CloseButton';
import LightInput from '../../components/form/LightInput';
import BuyList from '../../components/SalesComponets/BuyList';

export default function Sales({navigation,route}){
    const {UserId}=route.params;
    const [products,setProducts]=useState();
    const [data,setData]=useState("");
    const [selectedData,setSelectedData]=useState([]);
    const [salesData,setSalesData]=useState(null);
    const [modalVisible,setModalVisible]=useState(false);
    const [menssageModalVisible,setMenssageModalVisible]=useState(false);
    const [errors,setErrors]=useState(null)
    const [finishMenssage,setFinishMenssage]=useState(null)
    const [refresh,setRefresh]=useState(false);

    const {control,handleSubmit}=useForm();

    const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => navigation.reset({
            index: 0,
            routes: [{ 
                name: 'Main',
                params: { 
                    Id:UserId,
                }
              }],
          }) }
        ]);
        return true;
      };
    
      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

    function ViewPrice(){
        if(selectedData!==undefined){
            var totalCost=0;
            for(var i in selectedData.Price){
                if(selectedData.Weight[i]!="0"){
                    let PriceXWeight=(parseFloat(selectedData.Weight[i])*parseFloat(selectedData.Price[i]))/1000
                    let PriceXQuantity=parseFloat(selectedData.Amount[i])*PriceXWeight
                    totalCost+=PriceXQuantity
                }else{
                    let PriceXQuantity=parseFloat(selectedData.Price[i])*parseFloat(selectedData.Amount[i])
                    totalCost+=PriceXQuantity
                }
            }
            let obj=Object.assign({"TotalCost":totalCost},selectedData)
            setSelectedData(obj)
        }
    }

    function CheckTheModal(){
        if(Object.values(selectedData).length!=0){
            setModalVisible(true);
            ViewPrice();
            setErrors(null)
        }else{
            setErrors("Você ainda não selecionou nenhum produto")
        }
    }
    


    const onSubmit=(data)=>{
        if(selectedData.TotalCost<=data.MoneyPayed){
            setSalesData(data);
        }else{
            setFinishMenssage("Sem Crédito Suficiente");
            setMenssageModalVisible(true)
        }
    }

    /*UseEffect: salesData*/
    useEffect(()=>{
        async function FetchData(){
            try{
                if(salesData!=null){
                    let PayBack=parseFloat(salesData.MoneyPayed)-parseFloat(selectedData.TotalCost);
                    let  Json={
                        "Amount": selectedData.Amount,
                        "ProductId": selectedData.Id,
                        "Weight": selectedData.Weight,
                        "TotalCost":selectedData.TotalCost,
                        "MoneyPayed":salesData.MoneyPayed,
                        "PayBack":PayBack,
                        "userId":UserId
                    }
                    const response=await Api.post('/SalesRecord/newRecord',Json);
                    const resp=await Api.post('/finance/getAll',{"userId":UserId});
                    let currentBalance=0;
                    if(resp.data.length!=0){
                        currentBalance=(resp.data[parseInt(resp.data.length)-1].CurrentBalance);
                    }
                    let NewBalance=parseFloat(currentBalance)+parseFloat(Json.TotalCost)
                    const finalResp=await Api.post('/finance/register',{"userId":UserId,"CurrentBalance":NewBalance});
                    setRefresh(true)
                    const interval = setInterval(() => {
                        setRefresh(false)
                        clearInterval(interval);
                    }, 1000);
                    
                    setFinishMenssage("Venda Realizada\nTroco: "+PayBack)
                    setMenssageModalVisible(true)
                    setModalVisible(false);
                }       
            }
            catch(err){
                console.log(err);
            }
        }
            FetchData();
    },[salesData]);

    /*UseEffect: data*/
    useEffect(()=>{
        async function FetchData(){
            try{
                var UserID={"userId":UserId};
                const response=await Api.post('/products/GetAll',UserID);
                setProducts(response.data);
                setData("");
            }
            catch(err){
                console.log(err);
            }
        }
            FetchData();
    },[data]);
    
    return(
        <View style={styles.container}>
            <MenuHeader refresh={refresh} userId={UserId}/>
            <SalesContext.Provider value={{data,setData,selectedData,setSelectedData}}>
            {(errors!==null)&&<Text style={{color:"#ebb89b"}}>
                {errors}
            </Text>}
            <View style={styles.ListHeaderStyle}>
            <Text style={{width:vw(64.4),color:"#ebb89b"}}>
                Nome
            </Text>
            <Text style={{width:vw(22),color:"#ebb89b"}}>
                Quantidade
            </Text>
            <Text style={{width:vw(22),color:"#ebb89b"}}>
                Peso
            </Text>
            </View>
            {products&&
                <FlatList
                style={{
                    flex: 0
                  }}
                data={products}
                renderItem={({item, index}) => (
                    <SalesList all={item}/>
                  )}
                  keyExtractor={(item) => item.id}
            />}
            <View 
                style={{
                    marginTop:20,
                    justifyContent:'flex-end'
                }}
            >
            <TouchableHighlight
                onPress={()=>{CheckTheModal()}}
            >
                <View
                    style={{
                        alignItems:'center',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor:"#ebb89b",
                        padding: 6
                    }}
                >
                    <NewText>Finalizar Venda</NewText>  
                </View>
            </TouchableHighlight>
            </View>
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
                    <CloseButton OnPressfunction={() => setModalVisible(false)}/>
                    
                    <BuyList selectedData={selectedData} productData={products}/>

                    <LightInput Control={control} Name={"MoneyPayed"} Placeholder={"Dinheiro pago"} keyboardType={"numeric"}/>
                
                    <TouchableHighlight onPress={handleSubmit(onSubmit)}>
                    <View style={{
                        marginTop:10,
                        borderRadius:10,
                        borderColor: '#ebb89b',
                        borderWidth:2,
                        padding: 5,
                        alignItems:'center'
                    }}>
                    <NewText>Finalizar Venda</NewText>
                    </View>
                </TouchableHighlight>
                </View>
            </Modal>
            <Modal
             isVisible={menssageModalVisible}
            >
                <View
                    style={{
                        backgroundColor:"#471023",
                        padding:10,
                        borderRadius:5,
                    }}
                >
                <CloseButton OnPressfunction={() => setMenssageModalVisible(false)}/>
                    <Text style={{color:"#ebb89b"}}>
                    {finishMenssage}
                    </Text>
                </View>

            </Modal>
            </SalesContext.Provider>
        </View>
    )
    
}