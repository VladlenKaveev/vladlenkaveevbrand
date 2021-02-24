import React, { Component } from "react";
import { StyleSheet, Dimensions, FlatList, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Label,
  Right,
  Body,
  Left,
  Title,
} from "native-base";

import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "../components/firebase/firebase";
import { CachedImage } from "react-native-img-cache";
// import SplashScreen from "./SplashScreen";

const { height } = Dimensions.get("window");
// const { width } = Dimensions.get("window");

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: "",
      loading: true,
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
        <Card style={styles.card}>
          <CardItem>
            <Text
              style={{
                flex: 1,
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
          </CardItem>
          <CardItem style={styles.container}>
            <CachedImage
              source={{ uri: item.imgUrl }}
              style={styles.imageContainer}
            />
          </CardItem>
          <CardItem>
            <Text style={styles.text1}>{item.about}</Text>
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
          <Left />
          <Body>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
            />
          </Body>
          <Right>
            {/*<Icon*/}
            {/*  name="heart-o"*/}
            {/*  size={30}*/}
            {/*  style={styles.icon}*/}
            {/*  onPress={() => {*/}
            {/*    navigation.navigate("Wishlist");*/}
            {/*  }}*/}
            {/*/>*/}
          </Right>
        </Header>
        <Content>
          <FlatList
            style={{ width: "100%" }}
            data={this.state.articles}
            keyExtractor={(item) => item.key}
            renderItem={this.renderItem}
            onEndReached={() => {
              this.setState({ loading: false });
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 20,
    fontWeight: "300",
  },
  header: {
    backgroundColor: "white",
    height: height / 20,
    borderBottomColor: "black",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 10,
  },
  text1: {
    fontStyle: "italic",
    fontSize: 14,
  },
  imageContainer: {
    width: 350,
    height: 350,
    borderRadius: 10,
    overflow: "hidden",
  },
  logo: {
    width: 300,
    height: 300,
  },
  button: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  card: {
    borderColor: "black",
  },
});
