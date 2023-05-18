import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { dateReverse, numberWithPoint } from "../../utils/format";
import { BookingDTO } from "../../redux/booking/type";

type PropsRenderItem = {
  item: BookingDTO;
};
const BookingReceived: FC = () => {
  const bookedList = useAppSelector((state) => state.bookingReducer.data.bookedByAccount);
  const RenderItem: FC<PropsRenderItem> = ({ item }) => {
    return (
      <View style={{ borderBottomWidth: 0.7, paddingVertical: 5, paddingHorizontal: 10 }}>
        <TouchableOpacity style={{ flexDirection: "row" }}>
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
              Giờ:{" "}
              {item.movieShowTime.showtime.showTime.length > 5
                ? item.movieShowTime.showtime.showTime.substring(0, 5)
                : item.movieShowTime.showtime.showTime.substring(0, 4)}
            </Text>
            <Text>Phòng: {item.movieShowTime.screen.name}</Text>
            <Text>Ghế: {item.seats.map((seat) => seat.name).join(", ")}</Text>
            <Text style={{ fontWeight: "500" }}>Tổng: {numberWithPoint(item.totalPrice)} đ</Text>
          </View>
          <View style={{ pointerEvents: "box-only", position: "absolute", bottom: 10, right: 30 }}>
            <Image source={{ uri: item.imgQrCode }} style={{ width: 80, height: 80 }} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10 }}></View>
      <View style={{}}>
        <FlatList
          data={bookedList.filter((booking) => booking.received === true)}
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
