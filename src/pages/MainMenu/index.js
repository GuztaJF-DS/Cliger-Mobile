import React,{useEffect, useState} from 'react';
import { View,TouchableHighlight, Text } from 'react-native';
import { styles } from '../Style'
import Modal from 'react-native-modal';
import { useForm } from 'react-hook-form';

/*My Components*/
import { NewText } from '../Style';
import Api from '../../Api';
import Add from '../../assets/Icons/Add.svg';
import Finances from '../../assets/Icons/Finances.svg';
import See from '../../assets/Icons/See.svg';
import AddProduct from '../../assets/Icons/AddProduct.svg';
import LightInput from '../../components/form/LightInput';
import CloseButton from '../../components/form/CloseButton';
import MenuButton from '../../components/menuComponents/MenuButton';
import MenuHeader from '../../components/menuComponents/MenuHeader';
import InputPicker from '../../components/form/InputPicker';

export default function Main({navigation,route}){
    const [dados,setDados]=useState([]);
    const [road,setRoad]=useState('');
    const [responseModal,setResponseModal]=useState(false);
    const [modalVisible,setModalVisible]=useState(false);
    const { Id }=route.params;

      /*UseEffect: Dados*/
    useEffect(()=>{
        async function fetchData() {
            try{
                    let Json={...dados,"userId":Id}
                    console.log(Json);
                    const response=await Api.post('/products/New',Json);
                    setResponseModal(true)
            }catch(err){
                console.log(err);
            }
        }
        if(modalVisible==true && Object.values(dados).length!=0){
            fetchData();
        }
    },[dados]);

    const {control,handleSubmit}=useForm();

    const onSubmit=(data)=>{
        setDados(data);
    }

  /*UseEffect: road*/
    useEffect(()=>{
        if(Object.values(road).length!=0){
            navigation.navigate(road,{
                UserId:Id
            })
            setRoad('');
        }
    },[road])

  /*Front Page*/
    return(
        <View style={{flex:1,backgroundColor:'#68293f',}}>
            <MenuHeader userId={Id}/>
            <View style={styles.Center}>
                <MenuButton Type={"Large"} IconSvg={Finances} OnPress={()=>setRoad("Finances")} Name={"Dados Financeiros"}/>
                <MenuButton Type={"Large"} IconSvg={Add}  OnPress={()=>setRoad("Sales")} Name={"Adicionar Vendas"}/>  
            </View>
            <View style={{alignItems: 'center',flexDirection:'row',justifyContent:'space-around'}}>
                <MenuButton Type={"Normal"} IconSvg={AddProduct}  OnPress={()=>setModalVisible(true)} Name={"Adcionar Produtos/Serviços"}/>
                <MenuButton Type={"Normal"} IconSvg={See}  OnPress={()=>setRoad("Products")} Name={"Ver Produtos/Serviços"}/>
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
                 
                 <LightInput Control={control} Name={'Code'} Placeholder={'Código'} keyboardType={"numeric"}/>
                 <LightInput Control={control} Name={'Name'} Placeholder={'Nome'} keyboardType={"default"}/>
                 <LightInput Control={control} Name={'Value'} Placeholder={'Preço'} keyboardType={"numeric"}/>
                 <LightInput Control={control} Name={'Description'} Placeholder={'Descrição'} keyboardType={"default"}/>
                 <InputPicker Control={control} Name={'Type'} Values={["Produto","Serviço"]}/>
                 <LightInput Control={control} Name={'TotalAmount'} Placeholder={'Total no Estoque'} keyboardType={"numeric"}/>
                 

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
                {responseModal==true&&<NewText>Novo Item Cadastrado</NewText>}
                </View>
                </Modal>
        </View>
        
    )
}