import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppContext } from "./appContext";

export default function Header({ title }) {

  const { theme } = useContext(AppContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}>
      <Text style={[styles.text, { color: theme.text }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center"
  },
  text: {
    fontSize: 22,
    fontWeight: "bold"
  }
});