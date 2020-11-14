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
import YouTube from "react-native-youtube";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default class AboutUsScreen extends Component {
  constructor() {
    super();
    this.state = {
      phone: "+7 953-998-58-68",
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.text}>Наши контакты</Text>
          <Card>
            <CardItem>
              <Text>КАРТА</Text>
            </CardItem>
            <CardItem>
              <Text style={{ fontSize: 13, fontStyle: "italic" }}>
                kvartaldesignwork@gmail.com
              </Text>
            </CardItem>
            <CardItem>
              <Icon name="vk" size={27} style={styles.icon} />
              <Icon name="youtube" size={27} style={styles.icon} />
              <Icon name="instagram" size={27} style={styles.icon} />
            </CardItem>
            <CardItem>
              <YouTube
                videoId="TOGYS16TezQ" // The YouTube video ID
                play // control playback of video with true/false
                fullscreen // control whether the video should play in fullscreen or inline
                loop // control whether the video should loop when ended
                onReady={(e) => this.setState({ isReady: true })}
                onChangeState={(e) => this.setState({ status: e.state })}
                onChangeQuality={(e) => this.setState({ quality: e.quality })}
                onError={(e) => this.setState({ error: e.error })}
                style={{ alignSelf: "stretch", height: 300 }}
              />
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
});
