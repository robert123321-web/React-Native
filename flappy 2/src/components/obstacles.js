import React from React;
import { View } from "react-native";

const Obstacles = (
    {

        color ,
        obstacleWidth,
        obstacleHeight,
        gap,
        obstacleLeft,
    }
)=> {
    return (
        <>
        <View>
            <View style={{
                position: "absolute",
                backgroundColor: color,
                width: obstacleWidth,
                height: 500,
                left: obstacleLeft,
                bottom : randomBottom + obstacleHeight + gap
            }} />
        </View>
 
           <View style={{
                position: "absolute",
                 backgroundColor: color,
                  width: obstacleWidth,
                  height: obstacleHeight,
                  left: obstacleLeft,
                  bottom : randomBottom 
          }} 
        >

      </View> 

    </>

    )
};

export default Obstacles;