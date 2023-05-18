import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, LogBox } from "react-native";
import React, { FC, useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS } from "../../utils/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppSelector } from "../../hooks/useAppSelector";
import { MovieShowtime } from "../../redux/movie/type";
import format from "date-fns/format";
import { EventEmitter } from "stream";

const SessionMovie: FC = ({ navigation }) => {
  const [date, setDate] = useState<Date>();
  const dateTimeDefault = new Date();
  const dateDefault = dateTimeDefault.toDateString();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const movieShowtimeList = useAppSelector((state) => state.movieReducer.data.movieShowtime);
  const [movieShowtimeFilerByDate, setMovieShowtimeFilerByDate] = useState<MovieShowtime[]>([]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateSelected: Date) => {
    setDate(dateSelected);
    //TODO:
    const daySelectedFormat = format(dateSelected, "yyyy-MM-dd");
    const timeSelectedFormat = format(dateSelected, "HH:mm");
    const result = movieShowtimeList.filter((el) => el.showDate === daySelectedFormat);
    setMovieShowtimeFilerByDate(result);

    hideDatePicker();
  };

  useEffect(() => {
    LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapDate}>
        <View style={[styles.datePicker]}>
          <TouchableOpacity onPress={showDatePicker}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              //   mode="datetime"
              mode="date"
              onChange={(date) => setDate(date)}
              is24Hour
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <Icon name="calendar" color={COLORS.white} size={18} />
          </TouchableOpacity>
          <Text style={styles.textWhite}>{date ? format(date, "d/M/yyyy") : dateDefault}</Text>
        </View>
        <View style={styles.datePicker}>
          <TouchableOpacity onPress={showDatePicker}>
            <Icon name="clock-o" color={COLORS.white} size={18} />
          </TouchableOpacity>
          <Text style={styles.textWhite}>giờ</Text>
          {/* <Text style={styles.textWhite}>{date ? date.getUTCHours() + 7 + ":" + date.getMinutes() : "giờ"}</Text> */}
        </View>
      </View>
      {movieShowtimeFilerByDate.length > 0 ? (
        <View style={styles.showtime}>
          <FlatList
            // horizontal
            keyExtractor={(item) => item.id.toFixed()}
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingTop: 20,
            }}
            data={movieShowtimeFilerByDate}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ChooseSeat", {
                      movieShowtime: item,
                      showtime: item.showtime.showTime,
                    })
                  }
                >
                  <View
                    style={{
                      borderBottomColor: COLORS.darkGrey,
                      borderBottomWidth: 2,
                      backgroundColor: COLORS.lightGrey,
                      width: "30%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      borderRadius: 5,
                      margin: 10,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        marginVertical: 7,
                      }}
                    >
                      {item.showtime.showTime.length > 5
                        ? item.showtime.showTime.substring(0, 5)
                        : item.showtime.showTime.substring(0, 4)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 10,
          }}
        >
          <Text>Không có suất chiếu.</Text>
        </View>
      )}
    </View>
  );
};

export default SessionMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.color.primary,
  },
  wrapDate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.color.primary,
  },
  datePicker: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
  },

  textWhite: {
    color: COLORS.white,
    paddingLeft: 10,
  },
  showtime: {
    backgroundColor: COLORS.color.primary,
    paddingVertical: 10,
    height: "100%",
  },
});
