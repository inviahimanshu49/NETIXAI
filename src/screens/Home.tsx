import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.centertext}>Empty Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centertext: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
