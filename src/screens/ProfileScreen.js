import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";

import {
  Container,
  Text,
  Button,
  Label,
  Content,
  Form,
  Item,
  Input,
  Card,
  CardItem,
} from "native-base";

import firebase from "../components/firebase/firebase";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  LoginForm = () => {
    return (
      <Content>
        <Form>
          <Text style={styles.text}>Вход</Text>
          <Item>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="E-mail"
              onChangeText={(text) => {
                this.setState({
                  email: text,
                });
              }}
            />
          </Item>
          <Item>
            <Input
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          </Item>
          <Item>
            <Button
              style={styles.button}
              onPress={() => {
                this.signInUser();
              }}
            >
              <Label style={styles.label}>SIGN IN</Label>
            </Button>
          </Item>
          <Item>
            <Button
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("CreateUser");
              }}
            >
              <Label style={styles.label}>CREATE ACCOUNT</Label>
            </Button>
          </Item>
        </Form>
      </Content>
    );
  };

  ProfileForm = () => {
    return (
      <Container style={styles.container}>
        <Content>
          <Card>
            <CardItem style={{ justifyContent: "center" }}>
              <Text style={styles.text}>Profile</Text>
            </CardItem>
            <CardItem>
              <Text style={{ fontSize: 18 }}>Добро пожаловать, </Text>
            </CardItem>
            <CardItem>
              <Button style={styles.button}>
                <Label style={styles.label}>Мои заказы</Label>
              </Button>
            </CardItem>
            <CardItem>
              <Button
                onPress={() => {
                  this.props.navigation.navigate("Wishlist");
                }}
                style={styles.button}
              >
                <Label style={styles.label}>Избранное</Label>
              </Button>
            </CardItem>
            <CardItem>
              <Button
                onPress={() => {
                  this.signOut();
                  this.props.navigation.navigate("Новости");
                }}
                style={styles.button}
              >
                <Label style={styles.label}>ВЫЙТИ</Label>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  };

  signInUser = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function () {
        Alert.alert("Success login!");
        this.props.navigation.navigate("Новости");
      })
      .catch(function (error) {
        Alert.alert(error);
      });
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        Alert.alert("Вы вышли из аккаунта!");
      })
      .catch(function (error) {
        Alert.alert(error);
      });
  };

  checkUser = () => {
    var user = firebase.auth().currentUser;
    if (user) {
      console.log(user);
      return this.ProfileForm();
    } else {
      console.log("Вы не вошли в аккаунт!");
      return this.LoginForm();
    }
  };

  render() {
    return <Container>{this.checkUser()}</Container>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "black",
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    padding: 10,
  },
  label: {
    color: "white",
  },
});
