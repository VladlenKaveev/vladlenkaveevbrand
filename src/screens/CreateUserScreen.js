import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";

import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Label,
  Header,
  Input,
  Form,
  Item,
} from "native-base";

import firebase from "../components/firebase/firebase";

export default class CreateUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      loading: false,
      error: "",
    };
  }

  createUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        Alert.alert("Account created!");
        console.log(user);
        this.setState({
          email: "",
          password: "",
        });
        this.updateProfile();
      })
      .catch(() => {
        this.setState({ error: "Failed" });
        Alert.alert(this.state.error);
      });
  };

  updateProfile = () => {
    var user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: this.state.name,
      })
      .then(function () {
        Alert.alert("Привет," + user.displayName + "!");
      })
      .catch(function (error) {
        Alert.alert(error);
      });
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Text style={styles.text}>Создать Аккаунт</Text>
            <Item>
              <Input
                placeholder="E-mail"
                autoCapitalize={false}
                autoCorrect={false}
                value={this.state.email}
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
                autoCapitalize={false}
                value={this.state.password}
                secureTextEntry
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
            </Item>
            <Item>
              <Input
                placeholder="Как вас зовут?"
                value={this.state.name}
                onChangeText={(text) => {
                  this.setState({
                    name: text,
                  });
                }}
              />
            </Item>
            <Item>
              <Button style={styles.button} onPress={this.createUser}>
                <Label style={styles.label}>CREATE ACCOUNT</Label>
              </Button>
            </Item>
            <Label
              style={styles.label1}
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
            >
              Уже зарегестрированы?
            </Label>
          </Form>
        </Content>
      </Container>
    );
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
    backgroundColor: "black",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    padding: 10,
  },
  label: {
    color: "white",
  },
  label1: {
    color: "black",
    fontStyle: "italic",
    fontSize: 16,
    paddingLeft: 15,
  },
});
