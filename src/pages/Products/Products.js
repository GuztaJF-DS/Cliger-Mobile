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
import CloseButton from '../../components/form/CloseButton';
import ProductDataInput from '../../components/productComponents/productDataInput';

export default function Products({route,navigation}){ 
    const {UserId}=route.params;

    const [data,setData]=useState({});
    const [products,setProducts]=useState({});
    const [error,setError]=useState({});
    const [orderNum,setOrderNum]=useState(1);
    const [order,setOrder]=useState();
    const [modalVisible,setModalVisible]=useState(false);
    const [ProductData,setProductData]=useState([]);
    const [toDelete,setToDelete]=useState('');
    const [updateData,setUpdateData]=useState({})
    

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
            DeleteData();
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

  /*UseEffect: updateData*/
    useEffect(()=>{
        async function Update(){
            try{
                let updateDataLenght=JSON.stringify(updateData).length;
                let UpdateJSON='{"id":'+ProductData.id+',"userId":'+UserId+','+JSON.stringify(updateData).substring(1,updateDataLenght-1)+'}'
                const response=await Api.post('products/Update',JSON.parse(UpdateJSON));
                setData(response.data.message);
            }
            catch(err){
                console.log(err);
                setError(err);
            }            
        }
        if(Object.values(updateData).length!=0){
            Update()
        }
    },[updateData])
    
  /*UseEffect: orderNum,products*/
    useEffect(()=>{
        if(Object.values(products).length!=0){
            if(products.message=="Not Found"){
                setError({register:'Pelo visto você ainda não cadastrou nenhum produto'});
            } 
            else if(orderNum==1){
                setOrder(products.sort((a,b)=>a.Name.localeCompare(b.Name)))
            }  
            else if(orderNum==2){
                setOrder(products.sort((a,b)=>b.Name.localeCompare(a.Name)))
            }
            else if(orderNum==3){
                setOrder(products.sort((a,b)=>{return a.Value-b.Value}))
            }
            else if(orderNum==4){
                setOrder(products.sort((a,b)=>{return b.Value-a.Value}))
            }
        }
    },[orderNum,products]);
    


  /*Front Page*/
    return(
        <View style={styles.container}>
        <MenuHeader userId={UserId}/>
            {error.register && <Text style={{color:"#ebb89b"}} >{error.register}</Text>}

            <ProductContext.Provider value={{setModalVisible,ProductData,setProductData,setUpdateData,setOrder,setOrderNum,orderNum,products}}>
            <View style={MiniStyle.ListHeaderStyle}>
            <ProductsOrder Order={orderNum} Op={"1"} Name={"Nome"}/>
            <ProductsOrder Order={orderNum} Op={"2"} Name={"Preço"}/>

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
                 
                 <ProductDataInput TrueName={"Code"} Name={'Código'} Data={ProductData.Code} KeyboardType={"numeric"}/>
                 <ProductDataInput TrueName={"Name"} Name={'Nome'} Data={ProductData.Name} KeyboardType={"default"}/>
                 <ProductDataInput TrueName={"Value"} Name={'Preço'} Data={ProductData.Value} KeyboardType={"numeric"}/>
                 <ProductDataInput TrueName={"Description"} Name={'Descrição'} Data={ProductData.Description} KeyboardType={"default"}/>
                 <ProductDataInput TrueName={"Type"} Name={'Tipo'} Data={ProductData.Type} KeyboardType={"default"}/>
                 <ProductDataInput TrueName={"TotalAmount"} Name={'Total em Estoque'} Data={ProductData.TotalAmount} KeyboardType={"numeric"}/>

                    <Button
                        title="Delete Product"
                        color="#960306"
                        onPress={()=>setToDelete(ProductData.id)}
                    />
                </View>
                </Modal>
            </View>
            <FlatList
                data={order}
                renderItem={({item, index}) => (
                    <List all={item}/>
                  )}
                  keyExtractor={(item) => item.id}
            />
            </ProductContext.Provider>
        </View>
    )
}