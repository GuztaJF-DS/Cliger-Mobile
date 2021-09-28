import React from "react";
import { View } from "react-native";
import {Chart,Line,Tooltip,VerticalAxis} from 'react-native-responsive-linechart'

export default function Finance({data}){
    var obj=[];

    let HigherValue=0;

    for (var i in data){
      if(HigherValue<data[i].CurrentBalance){
        HigherValue=data[i].CurrentBalance
      }
      obj.push({"x":`${i}`,"y":data[i].CurrentBalance,"label":""});
    }
    

    return(
            <View>
                <Chart
                  style={{ height: 200, width: 380 }}
                  data={obj}
                  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                  xDomain={{ min: 0, max: 10 }}
                  yDomain={{ min: 0, max: HigherValue+5 }}
                >
                  <VerticalAxis tickCount={9} theme={{labels:{label:{color:'#fff'}}}}/>
                  <Line tooltipComponent={<Tooltip theme={{ formatter: ({ y }) => y.toFixed(2) }}/>}  theme={{ stroke: { color: '#44bd32', width: 5 },scatter:{default:{width:8,height:8,rx:5,color:'#329923'}}}}/>
                </Chart>
            </View>
    )
}