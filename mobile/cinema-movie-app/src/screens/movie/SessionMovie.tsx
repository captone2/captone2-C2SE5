import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS } from "../../utils/theme";
import Icon from "react-native-vector-icons/FontAwesome";

const showtimeList = [
  {
    id: 1,
    showtime: "9:00",
  },
  {
    id: 2,
    showtime: "11:00",
  },
  {
    id: 3,
    showtime: "13:00",
  },
  {
    id: 4,
    showtime: "15:00",
  },
  {
    id: 5,
    showtime: "17:00",
  },
  {
    id: 6,
    showtime: "19:00",
  },
];

const SessionMovie = ({ navigation, route }) => {
  const [date, setDate] = useState<Date>();
  const dateTimeDefault = new Date();
  const dateDefault = dateTimeDefault.toDateString();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //   const item = route.params.item;
  //   console.log(item);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (dateSelected: Date) => {
    setDate(dateSelected);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapDate}>
        <View style={[styles.datePicker]}>
          <TouchableOpacity onPress={showDatePicker}>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              //   mode="date"
              onChange={(date) => setDate(date)}
              is24Hour
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

            <Icon name="calendar" color={COLORS.white} size={18} />
          </TouchableOpacity>
          <Text style={styles.textWhite}>
            {date ? date.toDateString() : dateDefault}
          </Text>
        </View>
        <View style={styles.datePicker}>
          <TouchableOpacity onPress={showDatePicker}>
            <Icon name="clock-o" color={COLORS.white} size={18} />
          </TouchableOpacity>
          <Text style={styles.textWhite}>
            {date ? date.getUTCHours() + 7 + ":" + date.getMinutes() : "giờ"}
          </Text>
        </View>
      </View>
      <View style={styles.showtime}>
        <FlatList
          keyExtractor={(item) => item.id.toFixed()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          data={showtimeList.sort()}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  borderBottomColor: COLORS.darkGrey,
                  borderBottomWidth: 2,
                  backgroundColor: COLORS.lightGrey,
                  width: "20%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    marginVertical: 7,
                  }}
                >
                  {item.showtime}
                </Text>
              </View>
            );
          }}
        />
      </View>
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
