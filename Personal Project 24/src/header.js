import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { AppContext } from "./appContext";

export default function Header({ title }) {

  const { theme } = useContext(AppContext);

  return (
    <SafeAreaView>
      <View style={[styles.container, { backgroundColor: theme.card }]}>
        <View style={styles.content}>
          <Text style={[styles.text, { color: theme.primary }]}>
            {title}
          </Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>
            Your Personal Hub
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: theme.primary }]}>
          <Text style={styles.badgeText}>✨</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  content: {
    flex: 1
  },
  text: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.5
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 4,
    opacity: 0.8
  },
  badge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  badgeText: {
    fontSize: 24
  }
});