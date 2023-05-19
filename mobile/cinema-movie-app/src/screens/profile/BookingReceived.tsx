import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { dateReverse, numberWithPoint } from "../../utils/format";
import { BookingDTO } from "../../redux/booking/type";
import { Button } from "../../components";
import { COLORS } from "../../utils/theme";

type PropsRenderItem = {
  item: BookingDTO;
};
const BookingReceived: FC = ({ navigation }) => {
  const bookedList = useAppSelector((state) => state.bookingReducer.data.bookedByAccount);

  const RenderItem: FC<PropsRenderItem> = ({ item }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleImagePress = () => {
      setIsModalVisible(true);
    };

    return (
      <View style={{ borderBottomWidth: 0.7, paddingVertical: 5, paddingHorizontal: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ alignSelf: "center" }}>
            <Image
              source={{ uri: item.movieShowTime.movie.movieImages[0].imageUrl }}
              style={{ height: 100, width: 70 }}
            />
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text style={{ fontWeight: "700", textTransform: "uppercase", fontSize: 16 }}>
              {item.movieShowTime.movie.title}
            </Text>
            <Text>Ngày: {dateReverse(item.movieShowTime.showDate)}</Text>
            <Text>
              Giờ:
              {item.movieShowTime.showtime.showTime.length > 5
                ? item.movieShowTime.showtime.showTime.substring(0, 5)
                : item.movieShowTime.showtime.showTime.substring(0, 4)}
            </Text>
            <Text>Phòng: {item.movieShowTime.screen.name}</Text>
            <Text>Ghế: {item.seats.map((seat) => seat.name).join(", ")}</Text>
            <Text>{numberWithPoint(item.totalPrice)} đ</Text>
          </View>
          <View style={{ pointerEvents: "box-only", position: "absolute", bottom: 0, right: 30 }}>
            <TouchableOpacity onPress={handleImagePress}>
              <Image source={{ uri: item.imgQrCode }} style={{ width: 60, height: 60 }} />
            </TouchableOpacity>

            <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
              <TouchableOpacity>
                <Image source={{ uri: item.imgQrCode }} style={{ height: "70%", width: "100%" }} resizeMode="contain" />
                <Button text="Quay lai" tintColor={COLORS.white} onPress={() => setIsModalVisible(false)} />
              </TouchableOpacity>
            </Modal>
            <TouchableOpacity onPress={() => navigation.navigate("CommentMovie", { movie: item.movieShowTime.movie })}>
              <Text>Đánh giá</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}></View>
      <View style={{}}>
        {/* //TODO: change =>> true */}
        <FlatList
          data={bookedList.filter((booking) => booking.received === false)}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <RenderItem item={item} />}
        />
      </View>
    </View>
  );
};

export default BookingReceived;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
