import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

const data = [
  {
    key: 1,
    uri: "https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg",
  },
];

const Banner = () => {
  const renderItem = ({ item, index }) => {
    const { uri } = item;
    return (
      <View style={styles.slide}>
        <Image source={{ uri: uri }} style={styles.imageBackground} />
      </View>
    );
  };
  return (
    <View>
      <Carousel
        ref={(c) => {
          Carousel = c;
        }}
        data={data}
        renderItem={this._renderItem}
        sliderWidth={300}
        itemWidth={300}
        autoplay={true}
        loop={true}
      />
      <Text>Banner</Text>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({});
