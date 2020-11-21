import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../../screens/HomeScreen";
import CollectionsScreen from "../../screens/CollectionsScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import CatalogScreen from "../../screens/CatalogScreen";
import WishlistScreen from "../../screens/WishlistScreen";
import CreateUserScreen from "../../screens/CreateUserScreen";
import AboutUsScreen from "../../screens/AboutUsScreen";
import ArticlesDetails from "../ArticlesDetails";
import SplashScreen from "../../screens/SplashScreen";
import GalleryScreen from "../../screens/GalleryScreen";

import Icon from "react-native-vector-icons/FontAwesome";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function TabScreen() {
  return (
    <Tab.Navigator inactiveColor="red" barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Новости"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="home" size={23} color="black" style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name="Коллекции"
        component={CollectionsScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="list-alt" size={23} color="black" style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name="Галерея"
        component={GalleryScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="photo" size={23} color="black" style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name="О нас"
        component={AboutUsScreen}
        options={{
          tabBarIcon: () => (
            <Icon
              name="comment-o"
              size={23}
              color="black"
              style={styles.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Icon name="user" size={23} color="black" style={styles.icon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default class Navigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Catalog"
            component={CatalogScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Wishlist"
            component={WishlistScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateUser"
            component={CreateUserScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ArticlesDetails"
            component={ArticlesDetails}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
