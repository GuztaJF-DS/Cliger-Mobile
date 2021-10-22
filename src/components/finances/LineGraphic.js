import React from "react";
import { View,Text } from "react-native";
import {Chart,Line,Tooltip,VerticalAxis,HorizontalAxis} from 'react-native-responsive-linechart'

export default function LineGraphic({data}){
  
    var obj=[]; 
    let HigherValueY=0;
    let type=data.Type; 
    let FormatedData=(data.RawData===undefined)?"":data.RawData;

    if(Object.values(FormatedData).length==0){
      type="Nothing";
    }

    switch(type){
      case "Nothing":
        obj.push({"x":0,"y":0})
        break;

      case "Sales":
        let unusedId=FormatedData.length;
        for (var i in FormatedData){
          if(HigherValueY<FormatedData[i].TotalBuyPrice){
            HigherValueY=FormatedData[i].TotalBuyPrice;
          }
          if(i!=unusedId-1){
            obj.push({"x":`${i}`,"y":FormatedData[i].TotalBuyPrice});
          }
        }
        break;

        case "Finance":
          for (var i in FormatedData){
            if(HigherValueY<FormatedData[i].CurrentBalance){
              HigherValueY=FormatedData[i].CurrentBalance;
            }
            obj.push({"x":`${i}`,"y":FormatedData[i].CurrentBalance});
          }
          break;

    }
    
    return(
            <View>
              {type=="Nothing"?
              <Text>Você ainda não registrou nenhuma venda</Text>
              :<Chart
                style={{ height: 200, width: 380 }}
                data={ obj }
                padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                xDomain={{ min: 0, max: 2 }}
                yDomain={{ min: 0 , max: HigherValueY+(HigherValueY-(HigherValueY/2)) }}
              >
              <VerticalAxis tickCount={4} theme={{labels:{label:{color:'#fff'}}}}/>
              <Line tooltipComponent={<Tooltip />}  theme={{ stroke: { color: '#44bd32', width: 5 },scatter:{default:{width:8,height:8,rx:5,color:'#329923'}}}}/>
              </Chart>}
            </View>
    )
}