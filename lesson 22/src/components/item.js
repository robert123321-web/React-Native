import React from "react";
import { View, Text, StyleSheet,Image } from "react-native";

const Item = ({ item }) => {
    return (
        <View>

        </View>
    )
}
const styles = StyleSheet.create({
    cardContainer:{
        flexDirection:'row',
        backgroundColor:'#fff',
        borderRadius:8,
        marginBottom:18,
        padding:8,
    },
    img:{
        width:100,
        height:100,
        borderRadius:0,
    },
    textContainer:{
        paddingHorizontal:10,
        flex:1,
    },
    name:{
        fontSize:18,
        fontWeight:'bold',
    },
    category:{
        color:'#888',
    },
    desc:{
        fontSize:12,
        marginVertical:5,
    },
    price:{
        backgroundColor:'#2bbdff',
        color:'#fff',
        alignSelf:'flex-start',
        paddingHorizontal:10,
        borderRadius:12,
    }

});