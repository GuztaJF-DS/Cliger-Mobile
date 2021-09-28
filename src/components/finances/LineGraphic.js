import React from "react";
import { View } from "react-native";
import {Chart,Line,Tooltip,VerticalAxis} from 'react-native-responsive-linechart'

export default function Finance({data}){
    var obj=[];

    for (var i in data){
        obj.push({"x":`${parseInt(i)+1}`,"y":data[i].CurrentBalance,"label":""});
    }

    return(
            <View>
                <Chart
                  style={{ height: 200, width: 380 }}
                  data={obj}
                  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                  xDomain={{ min: 1, max: 10 }}
                  yDomain={{ min: 0, max: 60 }}
                >
                  <VerticalAxis tickCount={7} theme={{labels:{label:{color:'#fff'}}}}/>
                  <Line tooltipComponent={<Tooltip theme={{ formatter: ({ y }) => y.toFixed(2) }}/>}  theme={{ stroke: { color: '#44bd32', width: 5 },scatter:{default:{width:8,height:8,rx:5,color:'#329923'}}}}/>
                </Chart>
            </View>
    )
}