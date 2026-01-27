import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Swiper
        style={}
        showsPagination
        dotcolor ="#999"
        activeDotColor="#007AFF"
      >

        <View style={styles.slide}>

          <Image source={require("../../assets/image1.jpg")} 
          style={styles.slideImage}
          resizeMode="cover"
          ></Image>
        </View>

                <View style={styles.slide}>

          <Image source={require("../../assets/image2.jpg")} 
          style={styles.slideImage}
          resizeMode="cover"
          ></Image>
        </View>

                <View style={styles.slide}>

          <Image source={require("../../assets/image3.jpg")} 
          style={styles.slideImage}
          resizeMode="cover"
          ></Image>
        </View>

      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
slide:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#f5f5f5"
},
slideImage:{
  width:"90%",
  height:"90%",
  boiderRadius:10,
}

});

export default Home;
