import React, { Component } from "react";
import { StyleSheet, Dimensions, FlatList } from "react-native";

import {
  Container,
  Text,
  Button,
  Content,
  Item,
  Card,
  Header,
} from "native-base";
import firebase from "../components/firebase/firebase";
import Icon from "react-native-vector-icons/FontAwesome";
import Lightbox from "react-native-lightbox";
import { CachedImage } from "react-native-img-cache";
import SplashScreen from "../screens/SplashScreen";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default class GalleryScreen extends Component {
  constructor() {
    super();
    this.state = {
      gallery: "",
      numColumns: 2,
      loading: true,
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
            <CachedImage
              key={item.key}
              source={{ uri: item.url }}
              style={styles.imageContainer}
            />
          </Lightbox>
        </Card>
      </Content>
    );
  };

  renderFooter = () => {
    return this.state.loading ? <SplashScreen /> : null;
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Header style={{ backgroundColor: "white" }}>
            <Text style={styles.text}>Галерея</Text>
          </Header>
          <Item>
            <Button bordered dark style={{ flex: 1, justifyContent: "center" }}>
              <Icon name="camera" size={20} style={{ color: "black" }} />
            </Button>
          </Item>
          <FlatList
            style={{ width: "100%" }}
            data={this.state.gallery}
            keyExtractor={(item) => item.key}
            renderItem={this.renderItem}
            numColumns={this.state.numColumns}
            onEndReached={() => {
              this.setState({ loading: false });
            }}
            renderFooter={this.renderFooter()}
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
