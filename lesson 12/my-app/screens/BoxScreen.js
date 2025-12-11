import react from "react";
import { View, StyleSheet, Text } from "react-native"





const BoxScreen =()=>{
    return(
      
        <View style={styles.container}>
            <Text style={styles.title}> flex direction: "row" </Text>


            <View style={styles.boxArea}>
                <View style={{width:50, height:50, backgroundColor:"skyblue", margin:5}}>1</View>
                <View style={{width:50, height:50, backgroundColor:"blue", margin:5}}>2</View>
                <View style={{width:50, height:50, backgroundColor:"darkblue", margin:5}}>3</View>
            </View>




        </View>
    )
        
};
const styles =StyleSheet.create({
    container:{
        flex:1,
        paddingTop:40,
        alingnItems:"center",
        backgroundColor:"#fff",
        },


        title: {
          fontSize:20,
          marginBottom:12,
        },


        boxArea:{
            width: "95%",
            backgroundColor:"#eaf4fb",
            paddingHorizontal:10,
            flexDirection:"row", //row, row-reverse, column, column-reverse
            flexDirection:"row-reverse",//row-reverse, column, column-reverse
            justifyContent:"center", //flex-start, flex-end, center, space-between, space-around, space-evenly
            alignItems:"center", //flex-start, flex-end, center, stretch, baseline
        },
        box:{
            width:50,
            height:50,
        },

})



export  default BoxScreen