import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BookingService } from "../services/booking/booking.service";

const ScanTicket: FC = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

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
        Alert.alert(
          `Your ticket: ${ticket.Movie}\n${ticket.Screen}${ticket.Date}\n${ticket.Time}${ticket.NumberSeat}\n${ticket.Seat}`
        );
        console.log("ticket");
        await BookingService.setTicketBookingReceived(bookingCurrent.id);
      } else {
        Alert.alert(`QR-Code invalid!`);
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