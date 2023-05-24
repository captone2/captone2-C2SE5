import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, LogBox } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { COLORS } from "../../utils/theme";
import { useAppSelector } from "../../hooks/useAppSelector";
import { MovieShowtime } from "../../redux/movie/type";
import format from "date-fns/format";
import { nextDate } from "../../utils/format";

interface DateItem {
  id: number;
  name: Date;
}

interface RenderItemProps {
  item: DateItem;
  handleDateSelection: (dateId: number) => void;
  selectedDate: number | null;
}

const SessionMovie: FC = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const movieShowtimeList = useAppSelector((state) => state.movieReducer.data.movieShowtime);
  const [movieShowtimeFilerByDate, setMovieShowtimeFilerByDate] = useState<MovieShowtime[]>([]);

  const rangeDate = [
    {
      id: 1,
      name: new Date(),
    },
    {
      id: 2,
      name: nextDate(1),
    },
    {
      id: 3,
      name: nextDate(2),
    },
    {
      id: 4,
      name: nextDate(3),
    },
    {
      id: 5,
      name: nextDate(4),
    },
    {
      id: 6,
      name: nextDate(5),
    },
    {
      id: 7,
      name: nextDate(6),
    },
  ];

  const handleConfirm = (dateSelected: Date) => {
    const daySelectedFormat = format(dateSelected, "yyyy-MM-dd");
    const result = movieShowtimeList.filter((el) => el.showDate === daySelectedFormat);
    setMovieShowtimeFilerByDate(result);
  };

  const handleDateSelection = (dateId) => {
    setSelectedDate(dateId);
  };

  useEffect(() => {
    handleConfirm(new Date());
    //* default show date current *
    setSelectedDate(rangeDate[0].id);
    const daySelectedFormat = format(rangeDate[0].name, "yyyy-MM-dd");
    setMovieShowtimeFilerByDate(movieShowtimeList.filter((el) => el.showDate === daySelectedFormat));

    LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  }, []);

  const RenderItem: FC<RenderItemProps> = ({ item, handleDateSelection, selectedDate }) => {
    const isItemSelected = selectedDate === item.id;
    return (
      <View style={[styles.datePicker, isItemSelected && styles.selectedDate]}>
        <TouchableOpacity
          onPress={() => {
            handleDateSelection(item.id);
            handleConfirm(item.name);
          }}
        >
          <Text style={styles.textWhite}>{format(item.name, "d/M")}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapDate}>
        <FlatList
          data={rangeDate}
          keyExtractor={(item) => item.id.toFixed()}
          renderItem={({ item, index }) => (
            <RenderItem item={item} handleDateSelection={handleDateSelection} selectedDate={selectedDate} />
          )}
          numColumns={7}
        />
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
    width: " 14.28%",
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
  selectedDate: {
    backgroundColor: COLORS.lightGrey,
  },
});
