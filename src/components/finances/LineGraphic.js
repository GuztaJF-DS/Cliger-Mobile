import React from "react";
import { View,Text } from "react-native";
import { VictoryLine,VictoryChart,VictoryTheme,VictoryVoronoiContainer } from 'victory-native'


export default function LineGraphic({data}){
  
    var obj=[]; 
    let type=data.Type; 
    let FormatedData=(data.RawData===undefined)?"":data.RawData;
    let LabelName="";

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