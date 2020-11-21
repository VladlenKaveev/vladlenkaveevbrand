import React, { Component } from "react";
import { StyleSheet } from "react-native";

import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Label,
  Header,
  Form,
  Item,
  Input,
} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
import WebView from "react-native-webview";

export default class AboutUsScreen extends Component {
  constructor() {
    super();
    this.state = {
      phone: "+7 953-998-58-68",
      idVideo: "TOGYS16TezQ",
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.text}>Наши контакты</Text>
          <Card>
            <CardItem>
              <Text
                style={{
                  fontSize: 15,
                  fontStyle: "italic",
                  padding: 10,
                  textAlign: "center",
                }}
              >
                Добро пожаловать на сайт бренда дизайнерской одежды Vladlen
                Kaveev! Здесь ты можешь приобрести модели нашей одежды
                сдоставкой по всему миру или узнать информацию о выходе
                новойколлекции. Будем рады видеть тебя на нашем показе! Бренд
                существует не так давно, но мы не перестаем постигать новые
                стили одежды и радовать вас качественной вышивкой и материалами!
              </Text>
            </CardItem>
            <CardItem>
              <WebView
                style={styles.video}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{
                  uri: "https://www.youtube.com/embed/" + this.state.idVideo,
                }}
              />
            </CardItem>
            <CardItem>
              <Icon name="vk" size={27} style={styles.icon} />
              <Icon name="youtube" size={27} style={styles.icon} />
              <Icon name="instagram" size={27} style={styles.icon} />
            </CardItem>
          </Card>
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
    textAlign: "center",
    backgroundColor: "black",
  },
  icon: {
    padding: 5,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    padding: 10,
  },
  label: {
    color: "white",
  },
  video: {
    marginTop: 20,
    width: 400,
    height: 230,
  },
});
