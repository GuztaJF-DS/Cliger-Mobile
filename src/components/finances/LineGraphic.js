import React,{useEffect,useState} from "react";
import { View,Text } from "react-native";
import { VictoryLine,VictoryChart,VictoryTheme,VictoryVoronoiContainer } from 'victory-native'
import Api from '../../Api';

export default function LineGraphic({data}){
    var obj=[]; 
    let type=data.Type; 
    let FormatedData=(data.RawData===undefined)?"":data.RawData;
    let LabelName="";
    const [productSales,setProductSales]=useState();
    const [proData,setProData]=useState();

    useEffect(()=>{
      async function FetchData(){
      try{
        const Json={"userId":FormatedData.userId,"ProductId":FormatedData.ProductId}
        const resp=await Api.post("/SalesRecord/GetOneProduct",Json);
        setProductSales(resp.data);
        setProData("")
      }
        catch(err){
          console.log(err);
      }
    }
    FetchData();
    },[proData])

    if(Object.values(FormatedData).length==0){
      type="Nothing";
    }
    

    switch(type){
      case "Nothing":
        obj.push({"x":0,"y":0})
        break;

      case "Sales":
        let total=1 ;
          LabelName="Vendas do Dia"
          for(var i in FormatedData){
            if(i!=FormatedData.length-1){
                if(i<FormatedData.length-1 && FormatedData[i].createdAt==FormatedData[parseInt(i)+1].createdAt){
                    total++;
                }else{
                  obj.push({"date":FormatedData[i].createdAt,"x":new Date(FormatedData[i].createdAt),"y":total})
                    total=1
                }
            }
        }
        break;

        case "Finance":
        LabelName="Saldo"
        let FinanceCoordenates=FormatedData.map(({CurrentBalance})=>CurrentBalance);
          for(var i in FinanceCoordenates){
            obj.push({"date":FormatedData[i].createdAt,"x":i,"y":FinanceCoordenates[i]});
          }
          break;

        case "Product":
            let total2=1;
            console.log(productSales)

            for(var i in productSales){
                if(i<productSales.length-1 && productSales[i].createdAt==productSales[parseInt(i)+1].createdAt){
                  total2++
                }else{
                  obj.push({"date":productSales[i].createdAt,"x":new Date(productSales[i].createdAt),"y":total2})
                  total2=1
                }
              }
            
          break;
    } 
    return(
            <View>
              {type=="Nothing"?
              <Text>Você ainda não registrou nenhuma venda</Text>
              :
              <VictoryChart
              height={285}
                theme={VictoryTheme.material}
                containerComponent={
                  <VictoryVoronoiContainer
                    voronoiDimension="x"
                    labels={({ datum }) => `Data: ${datum.date},\n ${LabelName}:${datum.y}`}
                  />
                }
              >
                <VictoryLine
                  style={{ data: { stroke: "#3fd458",strokeWidth:4 }}}
                  data={obj}
                />
              </VictoryChart>}
            </View>
    )
}