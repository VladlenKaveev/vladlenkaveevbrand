import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import LottieView from "lottie-react-native";

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          style={{
            width: 300,
            height: 300,
          }}
          source={require("../../assets/3138-washing-machine.json")}
          autoPlay
          loop
        />
        <Text>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
