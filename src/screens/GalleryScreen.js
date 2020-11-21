import React, { Component } from "react";
import { StyleSheet, Dimensions, Image, FlatList } from "react-native";

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
  Header,
} from "native-base";

import firebase from "../components/firebase/firebase";
import Icon from "react-native-vector-icons/FontAwesome";
import Lightbox from "react-native-lightbox";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default class GalleryScreen extends Component {
  constructor() {
    super();
    this.state = {
      gallery: "",
      numColumns: 2,
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("gallery")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            url: child.val(),
          });
          console.log(li);
        });
        this.setState({ gallery: li });
      });
  }

  renderItem = ({ item }) => {
    return (
      <Content padder>
        <Card>
          <Lightbox>
            <Image
              key={item.key}
              source={{ uri: item.url }}
              style={styles.imageContainer}
            />
          </Lightbox>
        </Card>
      </Content>
    );
  };

  render() {
    return (
      <Container>
        <Content>
          <Header style={{ backgroundColor: "white" }}>
            <Text style={styles.text}>Галерея</Text>
          </Header>
          <Icon name="camera" size={20} style={styles.icon} />
          <FlatList
            style={{ width: "100%" }}
            data={this.state.gallery}
            keyExtractor={(item) => item.key}
            renderItem={this.renderItem}
            numColumns={this.state.numColumns}
          />
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
  text: {
    textAlign: "center",
    fontSize: 25,
    padding: 10,
  },
  label: {
    color: "white",
  },
  imageContainer: {
    width: 185,
    height: 200,
  },
});
