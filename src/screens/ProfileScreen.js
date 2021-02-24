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

const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      response: "",
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
        </Form>
        <Item style={{ padding: 5 }}>
          <Button
            bordered
            dark
            style={{
              flex: 1,
              justifyContent: "center",
            }}
            onPress={() => {
              this.signInUser();
            }}
          >
            <Label style={styles.label}>SIGN IN</Label>
          </Button>
        </Item>
        <Item style={{ padding: 5 }}>
          <Button
            bordered
            dark
            style={{
              flex: 1,
              justifyContent: "center",
            }}
            onPress={() => {
              this.props.navigation.navigate("CreateUser");
            }}
          >
            <Label style={styles.label}>CREATE ACCOUNT</Label>
          </Button>
        </Item>
      </Content>
    );
  };

  ProfileForm = () => {
    var user = firebase.auth().currentUser;
    return (
      <Container style={styles.container}>
        <Content>
          <Label
            style={{ flex: 1, fontSize: 28, textAlign: "center", padding: 10 }}
          >
            {user.displayName}
          </Label>
          <Card>
            <CardItem>
              <Button
                bordered
                dark
                style={{ flex: 1, justifyContent: "center" }}
              >
                <Label style={styles.label}>Мои заказы</Label>
              </Button>
            </CardItem>
            <CardItem>
              <Button
                onPress={() => {
                  this.props.navigation.navigate("Wishlist");
                }}
                bordered
                dark
                style={{ flex: 1, justifyContent: "center" }}
              >
                <Label style={styles.label}>Избранное</Label>
              </Button>
            </CardItem>
            <CardItem>
              <Button
                bordered
                dark
                style={{ flex: 1, justifyContent: "center" }}
              >
                <Label style={styles.label}>Обратная связь</Label>
              </Button>
            </CardItem>
            <CardItem>
              <Button
                onPress={() => {
                  this.signOut();
                  this.props.navigation.navigate("Новости");
                }}
                bordered
                dark
                style={{ flex: 1, justifyContent: "center" }}
              >
                <Label style={styles.label}>Выход</Label>
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
        Alert.alert("Вы успешно вошли в аккаунт!");
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
    color: "black",
  },
  image: {
    marginVertical: 24,
    alignItems: "center",
  },
  response: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
});
