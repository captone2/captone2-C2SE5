import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { BackButton } from "../components";
import { COLORS } from "../utils/theme";
import { format } from "date-fns";
import { FoodResponse } from "../redux/booking/type";
import { dateReverse } from "../utils/format";

const InformationTicket: FC = ({ navigation, route }) => {
  const id = route.params.id;
  const customerName = route.params.customerName;
  const movieName = route.params.movieName;
  const showDate = route.params.showDate;
  const showtime = route.params.showtime;
  const screen = route.params.screen;
  const seat = route.params.seat;
  const combo = route.params.combo;
  const sumTotal = route.params.sumTotal;
  console.log(showtime);
  console.log(combo);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10, paddingBottom: 4 }}></View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <BackButton color={COLORS.colors.error} />
        <Text>Quay lại</Text>
      </View>
      <View style={styles.wrap}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ fontSize: 24, fontWeight: "900" }}>Hóa đơn</Text>
        </View>
        <View style={styles.row}>
          <Text>ID: </Text>
          <Text>{id}</Text>
        </View>
        <View style={styles.row}>
          <Text>Ngày xuất hóa đơn: </Text>
          <Text>{format(new Date(), "dd/MM/yyyy hh:mm")}</Text>
        </View>
        <View style={styles.row}>
          <Text>Tên khách hàng: </Text>
          <Text>{customerName}</Text>
        </View>
        <View style={styles.contentTicket}>
          <View style={styles.row}>
            <View style={{ width: "40%" }}>
              <Text>Tên phim: </Text>
            </View>
            <View style={{ width: "70%" }}>
              <Text>{movieName}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ width: "40%" }}>
              <Text>Suất chiếu: </Text>
            </View>
            <Text>{dateReverse(showDate) + "  " + showtime.showTime} </Text>
          </View>
          <View style={styles.row}>
            <View style={{ width: "40%" }}>
              <Text>Rạp: </Text>
            </View>
            <Text>{screen}</Text>
          </View>
          <View style={styles.row}>
            <View style={{ width: "40%" }}>
              <Text>Ghế: </Text>
            </View>
            <Text>{seat}</Text>
          </View>
          <View style={styles.row}>
            <View style={{ width: "40%" }}>
              <Text>Combo: </Text>
            </View>
            {/* <Text>{combo.title + " "}</Text> */}
          </View>
          <View style={styles.row}>
            <View style={{ width: "40%" }}>
              <Text>Tổng tiền: </Text>
            </View>
            <Text>{sumTotal}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InformationTicket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    borderCurve: "circular",
    height: 370,
    width: "90%",
    marginHorizontal: "5%",
    backgroundColor: "#F9ECD7",
    padding: 20,
    marginTop: 100,
    justifyContent: "center",
  },
  contentTicket: {
    borderStyle: "dashed",
    borderWidth: 1,
    padding: 20,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
  },
});
