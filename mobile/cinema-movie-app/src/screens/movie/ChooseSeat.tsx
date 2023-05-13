import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../utils/theme";
import { BackButton } from "../../components";
import { MovieShowtime, Seat } from "../../redux/movie/type";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { seatBookedByShowTime } from "../../redux/booking/dispatcher";
import { useAppSelector } from "../../hooks/useAppSelector";
import { BookingService } from "../../services/booking/booking.service";

const ChooseSeat: FC = ({ navigation, route }) => {
  const movieShowtime: MovieShowtime = route.params.movieShowtime;
  const showtime: string = route.params.showtime;
  const dispatch = useAppDispatch();
  const seatBooked = useAppSelector((state) => state.bookingReducer.data.seatBooked);

  useEffect(() => {
    dispatch(seatBookedByShowTime(movieShowtime.id));
  }, []);

  const SeatItem = ({ seat }) => {
    const [selectedSeatStyle, setSelectedSeatStyle] = useState(false);

    const [seatSelected, setSeatSelected] = useState<number | null>(null);

    const handlePress = () => {
      setSelectedSeatStyle(!selectedSeatStyle);
      setSeatSelected(seatSelected !== seat.id ? seat.id : null);
      console.log(seatSelected);
    };

    const seatStyle = selectedSeatStyle ? [styles.seat, styles.seatSelecting] : styles.seat;

    return (
      <TouchableOpacity
        style={[seatStyle, seatBooked.includes(seat.id) && styles.seatSelected]}
        disabled={seatBooked.includes(seat.id)}
        onPressIn={handlePress}
      >
        <View>
          <Text style={styles.seatText}>{seat.name}</Text>
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
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginVertical: 10 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={[{ width: 16, height: 16, justifyContent: "center" }, { backgroundColor: COLORS.gray }]}></View>
          <Text style={[styles.textWhite, { fontSize: 12 }]}>Đã đặt</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={[{ width: 16, height: 16, justifyContent: "center" }, { backgroundColor: COLORS.white }]}></View>
          <Text style={[styles.textWhite, { fontSize: 12 }]}>Trống</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={[{ width: 16, height: 16, justifyContent: "center" }, { backgroundColor: COLORS.color.orange }]}
          ></View>
          <Text style={[styles.textWhite, { fontSize: 12 }]}>Đang chọn</Text>
        </View>
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
    backgroundColor: COLORS.color.orange,
  },
});
