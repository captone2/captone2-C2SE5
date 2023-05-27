import { ActivityIndicator, Alert, Linking, LogBox, StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import WebView from "react-native-webview";
import { COLORS } from "../../utils/theme";
import { StatusBar } from "expo-status-bar";
import { BackButton } from "../../components";
import { generateRandomString } from "../../utils/format";
import { AddBookingRequest } from "../../redux/booking/type";
import { useAppSelector } from "../../hooks/useAppSelector";
import { BookingService } from "../../services/booking/booking.service";
import { format } from "date-fns";
import { Seat } from "../../redux/movie/type";

const Payment: FC = ({ navigation, route }) => {
  const [accessToken, setAccessToken] = useState("");
  const [payment, setPayment] = useState({
    paymentId: "",
    approvalURL: "",
  });
  const sumTotal = route.params.sumTotal;
  const movieShowtimeId = route.params.movieShowtimeId;
  const seats: Seat[] = route.params.seats;
  const { user } = useAppSelector((state) => state.user.user);
  useEffect(() => {
    handlePayment();
  }, []);
  LogBox.ignoreLogs([`Setting a timer for a long period`]);
  const paymentDetail = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          total: Number((sumTotal / 23000).toFixed(2)),
          currency: "USD",
          details: {
            subtotal: Number((sumTotal / 23000).toFixed(2)),
            tax: "0",
            shipping: "0",
            handling_fee: "0",
            shipping_discount: "0",
            insurance: "0",
          },
        },
      },
    ],
    redirect_urls: {
      return_url: "exp://localhost:19000",
      cancel_url: "exp://localhost:19000",
    },
  };
  const handlePayment = async () => {
    try {
      //TODO: change Authorization Bearer #######
      const tokenResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer A21AAIdUZ2skRK4DRGd6tJUSJ1J4qVLTupobWRoh4GZbP8Mk7tfcwBIFmqNUhyzXKz6h2cV7VsS7LRQ91BX6e4Gr74tUwLCsg",
        },
        body: "grant_type=client_credentials",
      });
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // setAccessToken(accessToken);
      const paymentResponse = await fetch("https://api.sandbox.paypal.com/v1/payments/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(paymentDetail),
      });

      const paymentData = await paymentResponse.json();
      const { id, links } = paymentData;
      const approvalURL = links.find((data) => data.rel === "approval_url");
      setPayment({
        paymentId: id,
        approvalURL: approvalURL.href,
      });
      console.log(payment.approvalURL);
    } catch (error) {
      // Handle error
    }
  };

  const onNavigationStateChange = async (webViewState) => {
    setPayment({
      approvalURL: "",
      paymentId: payment.paymentId,
    });
    const { PayerID, paymentId } = webViewState.url;
    console.log("webViewState.url", webViewState.url);

    try {
      const res = await fetch(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}`, {
        method: "POST",
        body: JSON.stringify({ payer_id: PayerID }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();

      if (response.name === "INVALID_RESOURCE_ID") {
        Alert.alert("Thông báo", "Thanh toán thất bại. Vui lòng thử lại!", [{ text: "Oke" }]);
        setPayment({
          paymentId,
          approvalURL: "",
        });
        navigation.pop();
      } else {
        Alert.alert("Thông báo", "Thanh toán thành công.", [
          {
            text: "Oke",
            onPress: async () => {
              const hashCode = generateRandomString();
              const bookingDto: AddBookingRequest = {
                accountId: user.id,
                bookingCode: hashCode,
                dayTimeBooking: format(new Date(), "yyy-MM-dd HH:mm:ss"),
                totalPrice: sumTotal,
                movieShowTimeId: movieShowtimeId,
                urlQrCode: "",
              };
              try {
                await BookingService.addBooking(bookingDto);

                await BookingService.addSeatByBookingCode({
                  numbers: seats.map((el) => el.id),
                  id: hashCode,
                });

                console.log("booking added");
              } catch (err) {
                console.log("booking error");
              }

              //TODO: call api add booking
              navigation.navigate("ShowQRCode", {
                hashCode,
              });
            },
          },
        ]);
      }
    } catch (err) {
      ToastAndroid.show("Thanh toán lỗi", ToastAndroid.LONG);
      setTimeout(() => navigation.goBack(), 1000);
    }
  };

  const OpenURLButton = ({ url }) => {
    Linking.openURL(url);
    return <></>;
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={{ marginTop: 10 }}></View>
      <BackButton color={COLORS.black} />
      {payment.approvalURL ? (
        // <OpenURLButton url={payment.approvalURL} />
        <WebView
          style={{ height: "100%", width: "100%", marginTop: 40 }}
          source={{ uri: payment.approvalURL }}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState={false}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <View style={styles.container}>
          <Text style={{ color: COLORS.black, fontSize: 22, alignSelf: "center" }}>
            Không nhấn quay lại hoặc làm mới trang
          </Text>
          <ActivityIndicator color={COLORS.black} size={"large"} />
        </View>
      )}
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
