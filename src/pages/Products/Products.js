import React,{useState,useEffect}  from 'react';
import { View,FlatList,Text,Button } from 'react-native';
import Modal from 'react-native-modal';

/*My Components*/
import { styles } from '../Style';
import Api from '../../Api';
import { MiniStyle } from './Mini-Style';
import List from '../../components/productComponents/List'
import MenuHeader from '../../components/menuComponents/MenuHeader';
import ProductsOrder from '../../components/productComponents/ProductsOrder';
import ProductContext from '../../contexts/ProductContext';

export default function Products({route,navigation}){ 
    const {UserId}=route.params;

    const [data,setData]=useState({});
    const [products,setProducts]=useState({});
    const [error,setError]=useState({});
    const [orderNum,setOrderNum]=useState(1);
    const [order,setOrder]=useState();
    const [modalVisible,setModalVisible]=useState(false);
    const [ProductId,setProductId]=useState('');
    const [toDelete,setToDelete]=useState('');

  /*UseEffect: toDelete*/
    useEffect(()=>{
        async function DeleteData(){
            try{
                var DeleteInfo={"userId":UserId,"DeleteId":toDelete}
                const response=await Api.post('/products/deleteOne',DeleteInfo);
                setData(response.data.message);
                setModalVisible(false);
            }
            catch(err){
                console.log(err);
                setError(err);
            }
        }
        if(toDelete.length!=0){
            DeleteData();
        }
    },[toDelete]);


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
                setError(err);
            }
        }
        FetchData();
    },[data]);
    
  /*UseEffect: orderNum,products*/
    useEffect(()=>{
        if(Object.values(products).length!=0){
            if(products.Message=="Not Found"){
                setError({register:'Pelo visto você ainda não cadastrou nenhum produto'});
            } 
            else if(orderNum==1||!orderNum){
                setOrder(products.sort((a,b)=>a.Name.localeCompare(b.Name)))
            }  
        }
    },[orderNum,products]);
    

    

  /*Front Page*/
    return(
        <View style={styles.container}>
            <MenuHeader Cash={20}/>
            {error.register && <Text>{error.register}</Text>}

            <ProductContext.Provider value={{setModalVisible,setProductId,setOrder,setOrderNum,orderNum,products}}>
            <View style={MiniStyle.ListHeaderStyle}>
            <ProductsOrder Order={orderNum} Op={"1"} Name={"Nome"}/>
            <ProductsOrder Order={orderNum} Op={"2"} Name={"Preços"}/>

                <Modal
                    isVisible={modalVisible}
                    style={{justifyContent: 'flex-end',height:'10%'}}
                >
                    <Button
                        title="Sair"
                        onPress={() => setModalVisible(false)}
                    />
                    <Text style={{color:'white'}}>{ProductId}</Text>
                    <Button
                        title="Delete Product"
                        onPress={()=>setToDelete(ProductId)}
                    />

                </Modal>
            </View>
            <FlatList
                data={order}
                renderItem={({item, index}) => (
                    <List Name={item.Name} Value={item.Value} Id={item.id}/>
                  )}
                  keyExtractor={(item) => item.id}
                  extraData={data}
            />
            </ProductContext.Provider>
        </View>
    )
}