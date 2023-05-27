import { Alert, Button, StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BookingService } from "../services/booking/booking.service";
import { useAppSelector } from "../hooks/useAppSelector";

const ScanTicket: FC = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const { user } = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    try {
      const bookingCurrent = await BookingService.getBookingByBookingCode(data);
      if (bookingCurrent) {
        //**  result being add to file json */
        const fileName = `ticket_${bookingCurrent?.movieShowTime.movie.title}_${
          bookingCurrent?.movieShowTime.showDate
        }_${new Date().getTime()}.json`;

        const ticket = {
          Movie: bookingCurrent?.movieShowTime.movie.title,
          Screen: bookingCurrent?.movieShowTime.screen.name,
          Date: bookingCurrent?.movieShowTime.showDate,
          Time: bookingCurrent?.movieShowTime.showtime.showTime,
          NumberSeat: bookingCurrent?.seats.length,
          Seat: bookingCurrent?.seats.map((el) => el.name),
        };

        navigation.navigate("InformationTicket", {
          id: data,
          customerName: user.displayName,
          movieName: bookingCurrent.movieShowTime.movie.title,
          showDate: bookingCurrent.movieShowTime.showDate,
          showtime: bookingCurrent.movieShowTime.showtime,
          screen: bookingCurrent.movieShowTime.screen.name,
          seat: bookingCurrent.seats.map((el) => el.name).join(", "),
          combo: bookingCurrent.food,
          sumTotal: bookingCurrent.totalPrice,
        });
        console.log("bookingCurrent.food", bookingCurrent.food);

        await BookingService.setTicketBookingReceived({
          id: bookingCurrent.id,
          bookingCode: bookingCurrent.bookingCode,
        });
      } else {
        Alert.alert(`QR-Code Đã dùng hoặc không tồn tại!`);
      }
    } catch (err) {
      console.log(err);
    }

    // fs.writeFileSync(`./ticket/${fileName}`, "hello world");
    // const json = JSON.stringify(ticket);
    // fs.writeFileSync(`./ticket/${fileName}`, json);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
        {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
      </View>
    </View>
  );
};

export default ScanTicket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
