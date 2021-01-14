import React, { Component } from "react";
import { StyleSheet, FlatList, Dimensions } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Label,
} from "native-base";

import firebase from "../components/firebase/firebase";
import { CachedImage } from "react-native-img-cache";
import { HeaderClassicSearchBar } from "react-native-header-search-bar";
import Icon from "react-native-vector-icons/FontAwesome";
// import { SliderBox } from "react-native-image-slider-box";
import CardSilder from "react-native-cards-slider";

const { width } = Dimensions.get("window");

export default class CatalogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: "",
      search: "",
    };
  }

  componentDidMount() {
    const { route } = this.props;
    const { selectedID } = route.params;
    firebase
      .database()
      .ref("catalog/" + selectedID)
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            price: child.val().price,
            name: child.val().name,
            collection: child.val().collection,
            description: child.val().description,
            imgSlider: child.val().imgSlider,
            imgSlider1: child.val().imgSlider1,
            imgSlider2: child.val().imgSlider2,
            material: child.val().material,
          });
          this.setState({ list: li });
        });
      });
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    const imgSlider = item.imgSlider;
    const imgSlider1 = item.imgSlider1;
    const imgSlider2 = item.imgSlider2;
    // var images = [imgSlider, imgSlider1, imgSlider2];
    return (
      <Content padder>
        <Card>
          <CardItem>
            <Text style={styles.name}>{item.name}</Text>
            <Icon
              name="heart"
              size={27}
              onPress={() => {
                navigation.navigate("Wishlist");
              }}
            />
          </CardItem>
          {/* <SliderBox
            images={images}
            sliderBoxHeight={550}
            width={350}
            dotColor="black"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
            imageLoadingColor="black"
            dotColor="white"
            ImageComponentStyle={{
              borderRadius: 15,
              width: "97%",
              marginTop: 5,
            }}
          /> */}
          <Content>
            <CardSilder style={styles.imageContainer}>
              <CachedImage
                style={{ height: 500 }}
                source={{ url: imgSlider }}
              />
              <CachedImage
                style={{ height: 500 }}
                source={{ url: imgSlider1 }}
              />
              <CachedImage
                style={{ height: 500 }}
                source={{ url: imgSlider2 }}
              />
            </CardSilder>
          </Content>
          <CardItem>
            <Text>{item.description}</Text>
          </CardItem>
          <CardItem>
            <Text>Материал: {item.material}</Text>
          </CardItem>
          <CardItem>
            <Text style={styles.price}>{item.price}</Text>
          </CardItem>
          <CardItem>
            <Button style={styles.button}>
              <Label style={styles.label}>КУПИТЬ</Label>
            </Button>
          </CardItem>
        </Card>
      </Content>
    );
  };

  searchFilterFunction = (text) => {
    this.setState({
      search: text,
    });
    const newData = this.state.list.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.includes(textData);
    });
    this.setState({
      list: newData,
    });
  };

  renderHeader = () => {
    return (
      <HeaderClassicSearchBar
        onChangeText={(text) => this.searchFilterFunction(text)}
        value={this.state.search}
      />
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <FlatList
          style={{ width: "100%" }}
          extraData={this.state}
          data={this.state.list}
          keyExtractor={(item) => item.key}
          renderItem={this.renderItem}
          ListHeaderComponent={this.renderHeader}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    width: 390,
    height: 400,
  },
  name: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
  },
  price: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "black",
  },
  label: {
    color: "white",
  },
});
