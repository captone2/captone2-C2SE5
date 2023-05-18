import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CryptoJS from "crypto-js";
import { QRCode } from "react-native-custom-qr-codes-expo";

const ShowQRCode = () => {
  const generateRandomString = () => {
    const timestamp = new Date().getTime().toString();
    const randomNum = Math.random().toString(36).substr(2, 9);
    // Generate a random number and convert it to base 36
    return timestamp + randomNum;
  };
  const hashCode = CryptoJS.SHA256(generateRandomString()).toString();
  return (
    <View style={styles.container}>
      {/* <QRCode
        value={hashCode}
        logo={{ uri: "https://firebasestorage.googleapis.com/v0/b/dtu-event.appspot.com/o/qr_code_1684391144426.png?alt=media&token=5ab588bc-40e8-428e-a08a-439b0a699d48" }}
      /> */}
    </View>
  );
};

export default ShowQRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
