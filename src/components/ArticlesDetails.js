import React, { Component } from "react";
import { StyleSheet, FlatList, Dimensions, Image } from "react-native";
import { Container, Content, Card, CardItem, Text, Button } from "native-base";
import { SliderBox } from "react-native-image-slider-box";

export default class ArticlesDetails extends Component {
  constructor(props) {
    super(props);
  }

  checkSlider = () => {
    const { route } = this.props;
    const { imgSlider, imgSlider2, imgSlider3, imgSlider4 } = route.params;
    var images = [imgSlider, imgSlider2, imgSlider3, imgSlider4];
    if (imgSlider != null) {
      return (
        <SliderBox
          images={images}
          sliderBoxHeight={550}
          width={350}
          dotColor="black"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
        />
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
              <Image source={{ uri: imgUrl }} style={styles.imageContainer} />
            </CardItem>
            <CardItem>
              <Text>{article}</Text>
            </CardItem>
            <CardItem style={{ flex: 1, justifyContent: "center" }}>
              {this.checkSlider()}
            </CardItem>
            <CardItem>
              <Text>{article2}</Text>
            </CardItem>
            <CardItem>
              <Image
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
  imageContainer: {
    width: 300,
    height: 300,
  },
});
