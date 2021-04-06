import React from "react";
import { StyleSheet, Text, View } from "react-native";

const schedule = {
  title: "CS Courses for 2018-2019",
};

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.bannerStyle}>{schedule.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerStyle: {
    color: "#888",
    fontSize: 32,
  },
});

export default App;
