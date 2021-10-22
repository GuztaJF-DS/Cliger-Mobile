import React,{useEffect,useContext} from 'react';
import ProductContext from '../../contexts/ProductContext';
import styled from 'styled-components';
import { vw } from 'react-native-expo-viewport-units';


const ProductViewName=styled.View`
    width:${vw(80)}px;
    borderLeftColor:#ebb89b;
    borderLeftWidth:2px;
    borderBottomColor:#ebb89b;
    borderBottomWidth:2px;
`

const ProductViewValue=styled.View`
    backgroundColor:#68293f;
    width:${vw(19)}px;
    justifyContent:center;
    borderRightColor:#ebb89b;
    borderRightWidth:2px;
    borderLeftColor:#ebb89b;
    borderLeftWidth:2px;
    borderBottomColor:#ebb89b;
    borderBottomWidth:2px;
`

const ProductPress=styled.TouchableHighlight`
    flexDirection:row;
`

const ProductText=styled.Text`
    font-size:${vw(4)}px;
    margin-left:3px;
    color:#ebb89b;
`

export default ({all})=>{
    const {setModalVisible,setProductData,ProductData,products}=useContext(ProductContext);

    useEffect(()=>{
        if(all.id==ProductData.id){
            setProductData(all)
        }
    },[products])

    return(
        <ProductPress
            key={all.Id}
            onPress={() => {setModalVisible(true),setProductData(all)}}
            underlayColor="#3d1322">
            <>
                <ProductViewName >
                        <ProductText style={{fontSize:22}}>{all.Name}</ProductText>
                </ProductViewName>
                <ProductViewValue>
                        <ProductText style={{textAlign:"center"}}>{all.Value}$</ProductText>
                </ProductViewValue>
             </>
        </ProductPress>
    )
}