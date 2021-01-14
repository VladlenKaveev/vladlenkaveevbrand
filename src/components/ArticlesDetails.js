import React, { Component } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import { Container, Content, Card, CardItem, Button } from "native-base";
import { CachedImage } from "react-native-img-cache";
import CardSilder from "react-native-cards-slider";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

export default class ArticlesDetails extends Component {
  constructor(props) {
    super(props);
  }

  checkSlider = () => {
    const { route } = this.props;
    const { imgSlider, imgSlider2, imgSlider3, imgSlider4 } = route.params;
    // var images = [imgSlider, imgSlider2, imgSlider3, imgSlider4];
    if (imgSlider != null) {
      return (
        // <SliderBox
        //   images={images}
        //   sliderBoxHeight={550}
        //   width={350}
        //   dotColor="black"
        //   inactiveDotColor="#90A4AE"
        //   paginationBoxVerticalPadding={20}
        //   autoplay
        //   circleLoop
        //   imageLoadingColor="black"
        //   dotColor="white"
        //   ImageComponentStyle={{ borderRadius: 15, width: "97%", marginTop: 5 }}
        // />
        <Content>
          <CardSilder style={styles.imageContainer}>
            <CachedImage style={{ height: 700 }} source={{ url: imgSlider }} />
            <CachedImage style={{ height: 500 }} source={{ url: imgSlider2 }} />
            <CachedImage style={{ height: 500 }} source={{ url: imgSlider3 }} />
            <CachedImage style={{ height: 500 }} source={{ url: imgSlider4 }} />
          </CardSilder>
        </Content>
      );
    }
  };

  render() {
    const { route } = this.props;
    const { key, name, article, article2, imgUrl, imgUrl2 } = route.params;
    return (
      <Container>
        <Content padder>
          <Card>
            <CardItem>
              <Text style={{ flex: 1, fontSize: 25, textAlign: "center" }}>
                {name}
              </Text>
            </CardItem>
            <CardItem>
              <CachedImage
                source={{ uri: imgUrl }}
                style={styles.logoContainer}
              />
            </CardItem>
            <CardItem>
              <Text style={{ fontFamily: "mr_ApexMk3-ExtraLight" }}>
                {article}
              </Text>
            </CardItem>
            <CardItem style={{ flex: 1, justifyContent: "center" }}>
              {this.checkSlider()}
            </CardItem>
            <CardItem>
              <Text style={{ fontFamily: "mr_ApexMk3-ExtraLight" }}>
                {article2}
              </Text>
            </CardItem>
            <CardItem>
              <CachedImage
                source={{ uri: imgUrl2 }}
                style={{ width: 350, height: 300 }}
              />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    width: width / 1.5,
    height: width / 1.5,
  },
  imageContainer: {
    flex: 1,
    width: width / 1,
    height: height / 2,
  },
});
