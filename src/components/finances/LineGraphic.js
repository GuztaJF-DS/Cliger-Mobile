import React from "react";
import { VictoryChart,VictoryVoronoiContainer,VictoryTheme, VictoryLine } from "victory-native";
import { View } from "react-native"

export default function Finance({data}){
    var obj=[];

    for (var i in data){
        obj.push({"x":`${parseInt(i)+1}`,"y":data[i].CurrentBalance,"label":""});
    }
    console.log(obj);

    return(
            <View >
                <VictoryChart
                    theme={VictoryTheme.material}
                    containerComponent={
                      <VictoryVoronoiContainer
                        dimension="x"
                        labels={({datum})=> `${datum.y}`}
                      />
                    }
                    >
                    <VictoryLine
                        name="Line"
                        style={{
                          data: { stroke: "#c43a31" },
                          parent: { border: "1px solid #ccc"}
                        }}
                        data={obj}
                    />
                  </VictoryChart>
            </View>
    )
}