import React, { Component } from "react";
import { StyleSheet, FlatList, Dimensions } from "react-native";
import { Container, Content, Card, CardItem, Text, Button } from "native-base";
import firebase from "../components/firebase/firebase";
import { CachedImage } from "react-native-img-cache";
import SplashScreen from "../screens/SplashScreen";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

export default class CollectionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collection: "",
      numColumns: 2,
      loading: true,
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("images")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            imgUrl: child.val().imgUrl,
          });
        });
        this.setState({ collection: li });
      });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  renderItem = ({ item }) => {
    return (
      <Content padder>
        <Card
          onTouchEnd={() => {
            const { navigation } = this.props;
            navigation.navigate("Catalog", {
              selectedID: item.key,
            });
          }}
        >
          <CachedImage
            key={item.key}
            source={{ uri: item.imgUrl }}
            style={styles.imageContainer}
          />
        </Card>
      </Content>
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <CardItem>
          <Button style={styles.button}>
            <Text styles={styles.text}>ВСЕ ТОВАРЫ</Text>
          </Button>
        </CardItem>
        <Content>
          <FlatList
            style={{ width: "100%" }}
            data={this.state.collection}
            keyExtractor={(item) => item.key}
            renderItem={this.renderItem}
            numColumns={this.state.numColumns}
            onEndReached={() => {
              this.setState({ loading: false });
            }}
          />
          {/*{this.state.loading && <SplashScreen />}*/}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: height / 20,
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
  },
  imageContainer: {
    width: 183,
    height: 150,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
  },
});
