import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useRef } from "react";
import SvgQRCode from "react-native-qrcode-svg";
import { COLORS } from "../utils/theme";
import { Button } from "../components";
import storage from "@react-native-firebase/storage";

const ShowQRCode: FC = ({ navigation, route }) => {
  const hashCode = route.params.hashCode;
  const qrCodeRef = useRef<any>(null);

  const uploadImageToFirebase = async (imageUri) => {
    const fileName = "qr_code.png"; // Set a desired file name
    const storageRef = storage().ref().child(fileName);

    const response = await fetch(imageUri);
    const blob = await response.blob();

    await storageRef.put(blob);
    const imageUrl = await storageRef.getDownloadURL();

    return imageUrl;
  };

  const handleGetQRCodeUrl = () => {
    if (qrCodeRef.current) {
      const svgXmlData = qrCodeRef.current.toDataURL();
      console.log("SVG QR Code URL:", svgXmlData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center", marginTop: 20 }}>
        <SvgQRCode value={hashCode} size={322} />
      </View>
      <View style={{ position: "absolute", bottom: 20, width: "100%" }}>
        <Button
          text="Trở về trang chủ "
          tintColor={COLORS.white}
          onPress={() => {
            navigation.navigate("Home");
            handleGetQRCodeUrl();
          }}
        />
      </View>
    </View>
  );
};

export default ShowQRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.colors.surface,
  },
});
