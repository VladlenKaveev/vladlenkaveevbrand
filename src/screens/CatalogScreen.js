import React, { Component } from "react";
import { StyleSheet, FlatList, Image, Dimensions } from "react-native";
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

import { HeaderClassicSearchBar } from "react-native-header-search-bar";
import Icon from "react-native-vector-icons/FontAwesome";

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
            imgUrl: child.val().imgUrl,
            material: child.val().material,
          });
          this.setState({ list: li });
        });
      });
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
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
          <CardItem>
            <Image
              key={item.key}
              source={{ uri: item.imgUrl }}
              style={styles.imageContainer}
            />
          </CardItem>
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
