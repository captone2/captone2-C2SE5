import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import WebView from "react-native-webview";
import { COLORS } from "../../utils/theme";
import { StatusBar } from "expo-status-bar";
import { BackButton } from "../../components";

const Payment: FC = ({ navigation, route }) => {
  const [accessToken, setAccessToken] = useState("");
  const [payment, setPayment] = useState({
    paymentId: "",
    approvalURL: "",
  });
  const sumTotal = route.params.sumTotal;

  useEffect(() => {
    handlePayment();
  }, []);
  const paymentDetail = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          total: sumTotal,
          currency: "USD",
          details: {
            subtotal: sumTotal,
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
      return_url: "exp://192.168.55.101:19000",
      cancel_url: "exp://192.168.55.101:19000",
    },
  };
  const handlePayment = async () => {
    try {
      const tokenResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer A21AAKmgEMfm9S1dOWE-hotOIPBo7GWLBtaQp8m53a34iRVSnBfSjyGB41lEfi38y1IaZhz1Yqqvd6XAQkopKiOBqDz6xTtBA",
        },
        body: "grant_type=client_credentials",
      });
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      setAccessToken(accessToken);
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

  const onNavigationStateChange = (webViewState) => {
    console.log("webViewState", webViewState);

    setPayment({
      approvalURL: "",
      paymentId: payment.paymentId,
    });
    const { PayerID, paymentId } = webViewState.url;
    fetch(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}`, {
      method: "POST",
      body: { payer_id: PayerID },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.name === "INVALID_RESOURCE_ID") {
          Alert.alert("Thông báo", "Thanh toán thất bại. Vui lòng thử lại!", [{ text: "Oke" }]);
          setPayment({
            paymentId: payment.paymentId,
            approvalURL: "",
          });
          navigation.pop();
        }
        Alert.alert("Thông báo", "Thanh toán thành công.", [
          {
            text: "Oke",
            onPress: () => {
              navigation.navigate("ShowQRCode");
            },
          },
        ]);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={{ marginTop: 10 }}></View>
      <BackButton color={COLORS.black} />
      {payment.approvalURL ? (
        <WebView
          style={{ height: "100%", width: "100%", marginTop: 40 }}
          source={{ uri: payment.approvalURL }}
          //   javaScriptEnabled
          //   domStorageEnabled
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
