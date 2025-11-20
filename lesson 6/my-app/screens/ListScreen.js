import React from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { Button } from "react-native-web";

const students = [
  { name: "Eden", surname: "Rocha", age: "17" },
  { name: "Kaylen", surname: "Tyler", age: "15" },
  { name: "Ellie", surname: "Mcclure", age: "17" },
  { name: "Journey", surname: "Blackburn", age: "16" },
];

const ListScreen = () => {
  return (
    <View>
      <Button
        title = "Click Me"
        color = "Purple"

        onPress={() => console.log("Button Pressed",count++)}


      
      >
        
      </Button>
      <Text style={styles.textStyle}>List of Students</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.textStyle}>
            {item.name} {item.surname} — Age {item.age}
          </Text>
        )}
        />
        <TouchableOpacity> 
          style={styles.touchableBtn} 
          onPress={() => console.log("butoni eshte klikuar nga touchableOpacity",count++)}>

          <Text style={styles.btnText}>Click here {count} here</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    marginVertical: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  touchableBtn: {
    backgroundColor: 'purple',
    paddingVertical: 20,
    marginVertical: 15,
    borserRasius: 6,
    marginHorizontal: 20,
  },
});

export default ListScreen;
