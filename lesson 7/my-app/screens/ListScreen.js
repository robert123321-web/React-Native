// ...existing code...
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";

const students = [
  { name: "Eden", surname: "Rocha", age: "17" },
  { name: "Kaylen", surname: "Tyler", age: "15" },
  { name: "Ellie", surname: "Mcclure", age: "17" },
  { name: "Journey", surname: "Blackburn", age: "16" },
];

const ListScreen = ({ navigation }) => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Button
        title="Click Me"
        color="purple"
        onPress={() => setCount((c) => c + 1)}
      />

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

      <TouchableOpacity
        style={styles.touchableBtn}
        onPress={() => setCount((c) => c + 1)}
      >
        <Text style={styles.btnText}>Click here {count}</Text>
      </TouchableOpacity>

      {/* New button to go back to the Main screen in App.js */}
      <View style={{ marginHorizontal: 20 }}>
        <Button
          title="Go to Main"
          color="#2e86de"
          onPress={() => navigation.navigate("Main")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  textStyle: {
    fontSize: 18,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  touchableBtn: {
    backgroundColor: "purple",
    paddingVertical: 12,
    marginVertical: 15,
    borderRadius: 6,
    marginHorizontal: 20,
  },
});

export default ListScreen;
// ...existing code...