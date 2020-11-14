import React, { Component } from "react";
import { StyleSheet, Dimensions, FlatList, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Button,
  Label,
} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../components/firebase/firebase";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: "",
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("articles")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            name: child.val().name,
            about: child.val().about,
            imgUrl: child.val().imgUrl,
            imgUrl2: child.val().imgUrl2,
            imgSlider: child.val().imgSlider,
            imgSlider2: child.val().imgSlider2,
            imgSlider3: child.val().imgSlider3,
            imgSlider4: child.val().imgSlider4,
            article: child.val().article,
            article2: child.val().article2,
          });
        });
        this.setState({ articles: li });
      });
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    return (
      <Content padder>
        <Card>
          <CardItem>
            <Text style={{ flex: 1, fontSize: 18, textAlign: "center" }}>
              {item.name}
            </Text>
          </CardItem>
          <CardItem>
            <Image
              source={{ uri: item.imgUrl }}
              style={styles.imageContainer}
            />
          </CardItem>
          <CardItem>
            <Text style={{ fontSize: 14 }}>{item.about}</Text>
          </CardItem>
          <CardItem>
            <Button
              style={styles.button}
              onPress={() => {
                navigation.navigate("ArticlesDetails", {
                  key: item.key,
                  name: item.name,
                  imgUrl: item.imgUrl,
                  imgUrl2: item.imgUrl2,
                  imgSlider: item.imgSlider,
                  imgSlider2: item.imgSlider2,
                  imgSlider3: item.imgSlider3,
                  imgSlider4: item.imgSlider4,
                  article: item.article,
                  article2: item.article2,
                });
              }}
            >
              <Label style={{ color: "white" }}>Подробнее</Label>
            </Button>
          </CardItem>
        </Card>
      </Content>
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header style={styles.header}>
          <Text style={{ color: "black", fontSize: 20 }}>
            VLADLEN KAVEEV BRAND
          </Text>
          <Icon
            name="heart-o"
            size={27}
            style={styles.icon}
            onPress={() => {
              navigation.navigate("Wishlist");
            }}
          />
        </Header>
        <Content>
          <FlatList
            style={{ width: "100%" }}
            data={this.state.articles}
            keyExtractor={(item) => item.key}
            renderItem={this.renderItem}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    height: height / 20,
  },
  icon: {
    paddingLeft: width / 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 10,
  },
  imageContainer: {
    width: 300,
    height: 300,
  },
  button: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
});
