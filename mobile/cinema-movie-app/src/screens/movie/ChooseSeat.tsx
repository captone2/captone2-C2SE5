import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../utils/theme";
import { BackButton } from "../../components";
import { MovieShowtime, Seat } from "../../redux/movie/type";
import Icon from "react-native-vector-icons/FontAwesome";
import { BookingService } from "../../services/booking/booking.service";

const ChooseSeat: FC = ({ navigation, route }) => {
  const movieShowtime: MovieShowtime = route.params.movieShowtime;
  const showtime: string = route.params.showtime;

  const seatBooked = BookingService.seatBookedByShowTime(movieShowtime.id);
  console.log(seatBooked);

  const SeatItem = (seat: Seat) => {
    const { id, name } = seat;

    return (
      <TouchableOpacity style={styles.seat} onPress={() => console.log(id)}>
        <View>
          <Text style={styles.seatText}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.head}>
        <BackButton />
        <Text style={styles.headTitle}>{movieShowtime.movie.title}</Text>
      </View>
      <View style={styles.wrapDate}>
        <View style={[styles.datePicker]}>
          <View>
            <Icon name="calendar" color={COLORS.white} size={18} />
          </View>
          <Text style={styles.textWhite}>{movieShowtime.showDate}</Text>
        </View>
        <View style={styles.datePicker}>
          <View>
            <Icon name="clock-o" color={COLORS.white} size={18} />
          </View>
          <Text style={styles.textWhite}>
            {showtime.length > 5 ? showtime.substring(0, 5) : showtime.substring(0, 4)}
          </Text>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <Text>Đã đặt</Text>
        <Text>Trống</Text>
        <Text>Đang chọn</Text>
      </View>
      <View style={styles.wrapScreen}>
        <View style={styles.screen}>
          <Text style={styles.textScreen}>Màn hình</Text>
        </View>
      </View>
      <View style={styles.wrapSeat}>
        <FlatList
          data={movieShowtime.screen.seats}
          renderItem={({ item }) => <SeatItem seat={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={8}
        />
      </View>
    </View>
  );
};

export default ChooseSeat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.color.primary,

    paddingTop: 10,
  },
  head: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headTitle: {
    color: "white",
    paddingLeft: 50,
    paddingRight: 10,
    fontSize: 16,
  },
  wrapDate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.color.primary,
    marginVertical: 15,
  },
  datePicker: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 20,
    borderColor: COLORS.gray1,
    borderRadius: 4,
  },
  textWhite: {
    color: COLORS.white,
    paddingLeft: 10,
  },
  wrapScreen: {
    height: 50,
  },
  screen: {
    backgroundColor: COLORS.green,
    height: 20,
    width: "90%",
    position: "absolute",
    top: 10,
    left: "5%",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  textScreen: {
    color: COLORS.gray,
    paddingHorizontal: "42%",
  },
  wrapSeat: {
    marginHorizontal: "5%",
  },
  seat: {
    flex: 1,
    aspectRatio: 1.2,
    margin: 2,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  seatText: {
    fontSize: 12,
  },
  seatSelected: {
    flex: 1,
    aspectRatio: 1.2,
    margin: 2,
    backgroundColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  seatSelecting: {
    flex: 1,
    aspectRatio: 1.2,
    margin: 2,
    backgroundColor: COLORS.color.orange,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
