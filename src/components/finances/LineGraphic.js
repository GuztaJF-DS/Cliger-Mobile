import React from "react";
import { View,Text } from "react-native";
import {Chart,Line,VerticalAxis,HorizontalAxis,Area} from 'react-native-responsive-linechart'


export default function LineGraphic({data}){
  
    var obj=[]; 
    let HigherValueY=0;
    let HigherValueX=0;
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
        let total=1;

        for(var i in FormatedData){
          if(HigherValueY<FormatedData[i].TotalBuyPrice){
            HigherValueY=FormatedData[i].TotalBuyPrice;
          }
            if(i!=FormatedData.length-1){
                if(i<FormatedData.length-1 && FormatedData[i].createdAt==FormatedData[parseInt(i)+1].createdAt){
                    total++;
                }else{
                  obj.push({"meta":FormatedData[i].createdAt,"x":{i},"y":total})
                    total=1
                }
            }
        }
        console.log(obj)
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
    HigherValueX=obj[obj.length-1].x; 
    return(
            <View>
              {type=="Nothing"?
              <Text>Você ainda não registrou nenhuma venda</Text>
              :<Chart
                style={{ height: 200, width: 380 }}
                data={ obj }
                padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                xDomain={{ min: 0, max: HigherValueX }}
                yDomain={{ min: 0 , max: HigherValueY+(HigherValueY-(HigherValueY/2)) }}
                viewport={{size:{width:(HigherValueX>=5)?5:parseInt(HigherValueX)}}}
              >
              <VerticalAxis tickCount={6} theme={{labels:{label:{color:'#fff'}}}}/>
              <HorizontalAxis tickCount={parseInt(HigherValueX)+1} theme={{labels:{label:{color:'#fff'}}}}/>
              <Line tooltipComponent={<Tooltip labelFormatter={v => v.toFixed(2)} />}  theme={{ stroke: { color: '#44bd32', width: 5 },scatter:{default:{width:8,height:8,rx:5,color:'#329923'}}}}/>
              <Area theme={{gradient:{from :{color:'#44bd32'}}, to:{color:"#44bd32",opacity:0.8}}}/>
              </Chart>}
            </View>
    )
}