import React,{useState,useEffect}  from 'react';
import { View,FlatList,TouchableOpacity,Text } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';

/*My Components*/
import { styles } from '../Style';
import Api from '../../Api';
import { MiniStyle } from './Mini-Style';
import List from '../../components/productComponents/List'
import MenuHeader from '../../components/menuComponents/MenuHeader';
import RotatedIcon from '../../components/productComponents/RotatedIcon';

export default function Products({route}){ 
    const {UserId}=route.params;

    const [data,setData]=useState({});
    const [products,setProducts]=useState({});
    const [error,setError]=useState({});
    const [orderNum,setOrderNum]=useState(1);
    const [order,setOrder]=useState();

    
  /*UseEffect: data*/
    useEffect(()=>{
        async function FetchData(){
            try{
                var UserID={"userId":UserId};
                const response=await Api.post('/products/GetAll',UserID);
                setProducts(response.data)
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
            else{
                setOrder(products.sort((a,b)=>a.Name.localeCompare(b.Name)))
            }
        }
        
    },[orderNum,products])

  /*Front Page*/
    return(
        <View style={styles.container}>
            <MenuHeader Cash={20}/>
            {error.register && <Text>{error.register}</Text>}

            <View style={MiniStyle.ListHeaderStyle}>
                <TouchableOpacity onPress={()=>{
                    (orderNum!=1)?setOrder(products.sort((a,b)=>a.Name.localeCompare(b.Name)))+setOrderNum(1)
                    :setOrder(products.sort((a,b)=>b.Name.localeCompare(a.Name)))+setOrderNum(2)
                }}>
                    <Text style={{width:vw(80.4),color:"#ebb89b"}}>
                        Nome
                        <RotatedIcon Order={orderNum} Op={"1"}/>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                    (orderNum!=3)?setOrder(products.sort((a,b)=>{return a.Value-b.Value}))+setOrderNum(3)
                    :setOrder(products.sort((a,b)=>{return b.Value-a.Value}))+setOrderNum(4)
                }}>
                    <Text style={{color:"#ebb89b"}}>
                        Preço
                        <RotatedIcon Order={orderNum} Op={"2"}/>
                    </Text>
                    
                </TouchableOpacity>
            </View>

            <FlatList
                data={order}
                renderItem={({item, index}) => (
                    <List Name={item.Name} Value={item.Value} Id={item.id}/>
                  )}
                  keyExtractor={(item) => item.id}
            />
        </View>
    )
}