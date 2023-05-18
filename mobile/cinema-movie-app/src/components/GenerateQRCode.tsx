import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import QRCode from "qrcode.react";
import CryptoJS from "crypto-js";

type Props = {
  value: string;
};
const GenerateQRCode: FC<Props> = ({ value }) => {
  const hashCode = CryptoJS.SHA256(value).toString();
  return (
    <View style={styles.container}>
      <QRCode value={hashCode} />
    </View>
  );
};

export default GenerateQRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
