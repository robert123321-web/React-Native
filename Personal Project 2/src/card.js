import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { AppContext } from "./appContext";

export default function Card({ children }) {

  const { theme } = useContext(AppContext);

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  }

});