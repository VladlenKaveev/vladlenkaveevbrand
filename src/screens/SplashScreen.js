import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          style={{
            width: 250,
            height: 250,
            paddingTop: width / 3,
          }}
          source={require("../../assets/28537-paint-globe")}
          autoPlay
          loop
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
