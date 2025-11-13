import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-web";



const Stutendeve =[
    {name : 'Alban', surname: 'Shehu', age: 22},
    {name : 'Blerina', surname: 'Hoxha', age: 21},
    {name : 'Driton', surname: 'Krasniqi', age: 23},
    {name : 'Elira', surname: 'Berisha', age: 20},
]

const ListScreens = () => {
  return (
    <View>
        <Text style ={StyleSheet.textStyle}>List Stutendeve</Text>
        <FlatList data={Stutendeve}
        keyExtractor={(item)=item.name}
        renderItem ={({item})=>(
            

  )}

        >


        </FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        marginVertical: 20,
    }
});

export default ListScreens

 
    