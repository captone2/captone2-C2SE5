import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Icon } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../utils/theme";
import { numberWithPoint } from "../../utils/format";

const Payment = ({ navigation, route }) => {
  const [choosePayment, setChoosePayment] = useState({
    atm: false,
    visa: false,
    momo: false,
    zalo: false,
    shoppe: false,
  });
  useEffect(() => {}, []);

  const handlePayment = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon large={true} name="arrow-left" color={COLORS.gray} />
        </TouchableOpacity>
        <Text style={styles.headTitle}>Thanh toán</Text>
      </View>
      <ScrollView>
        <View style={styles.backgroundGrayLight}>
          <Text style={styles.textGray}>THÔNG TIN VÉ</Text>
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.paddingHorizontal}>Số lượng</Text>
            <Text style={styles.paddingHorizontal}>3</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.paddingHorizontal}>Tổng</Text>
            <Text style={styles.paddingHorizontal}>{numberWithPoint(300000)} đ</Text>
          </View>
        </View>
        {/* //TODO: Flatlist here */}
        <View>
          <View style={styles.backgroundGrayLight}>
            <Text style={{ fontWeight: "bold", paddingLeft: 7 }}> Thêm combo/bắp nước</Text>
          </View>
          <View style={{ backgroundColor: COLORS.blue, height: 100, width: "100%" }}></View>
        </View>

        <View>
          <View style={styles.backgroundGrayLight}>
            <Text style={styles.textGray}> PHƯƠNG THỨC GIẢM GIÁ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.paddingHorizontal}>Voucher</Text>
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.paddingHorizontal}>Coupon</Text>
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.paddingHorizontal}>Điểm</Text>
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.paddingHorizontal}>Thẻ quà tặng</Text>
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.paddingHorizontal}>Thẻ ưu tiên</Text>
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.backgroundGrayLight}>
            <Text style={styles.textGray}> Tổng lại</Text>
          </View>
          <View>
            <View style={styles.row}>
              <Text style={styles.paddingHorizontal}>Tổng cộng bao gồm VAT</Text>
              <Text style={styles.paddingHorizontal}>{numberWithPoint(300000)} đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.paddingHorizontal}>Giảm giá</Text>
              <Text style={styles.paddingHorizontal}>0 đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.paddingHorizontal}>Còn lại</Text>
              <Text style={styles.paddingHorizontal}>{numberWithPoint(300000)} đ</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.backgroundGrayLight}>
            <Text style={styles.textGray}> thanh toán</Text>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.row, { paddingHorizontal: 10, alignItems: "center" }]}
              onPress={() =>
                setChoosePayment({
                  atm: !choosePayment.atm,
                  visa: false,
                  momo: false,
                  zalo: false,
                  shoppe: false,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../../assets/icons/atm.jpeg")}
                  style={{ width: 30, height: 28 }}
                  resizeMode="cover"
                />
                <Text>ATM Card(thẻ nội địa)</Text>
              </View>
              {choosePayment.atm && <Icon large={false} name="check" color={COLORS.gray} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { paddingHorizontal: 10 }]}
              onPress={() =>
                setChoosePayment({
                  atm: false,
                  visa: !choosePayment.visa,
                  momo: false,
                  zalo: false,
                  shoppe: false,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../../assets/icons/visa.png")}
                  style={{ width: 30, height: 28 }}
                  resizeMode="cover"
                />
                <Text>Thẻ quốc tế (Visa, Master, Amex, JCB)</Text>
              </View>
              {choosePayment.visa && <Icon large={false} name="check" color={COLORS.gray} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { paddingHorizontal: 10 }]}
              onPress={() =>
                setChoosePayment({
                  atm: false,
                  visa: false,
                  momo: !choosePayment.momo,
                  zalo: false,
                  shoppe: false,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../../assets/icons/momo.png")}
                  style={{ width: 30, height: 28 }}
                  resizeMode="cover"
                />
                <Text>Ví MoMo</Text>
              </View>
              {choosePayment.momo && <Icon large={false} name="check" color={COLORS.gray} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { paddingHorizontal: 10 }]}
              onPress={() =>
                setChoosePayment({
                  atm: false,
                  visa: false,
                  momo: false,
                  zalo: !choosePayment.zalo,
                  shoppe: false,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../../assets/icons/zalo.png")}
                  style={{ width: 30, height: 28 }}
                  resizeMode="cover"
                />
                <Text>ZaloPay</Text>
              </View>
              {choosePayment.zalo && <Icon large={false} name="check" color={COLORS.gray} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { paddingHorizontal: 10 }]}
              onPress={() =>
                setChoosePayment({
                  atm: false,
                  visa: false,
                  momo: false,
                  zalo: false,
                  shoppe: !choosePayment.shoppe,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../../assets/icons/shoppePay.png")}
                  style={{ width: 30, height: 28 }}
                  resizeMode="cover"
                />
                <Text>ShoppePay</Text>
              </View>
              {choosePayment.shoppe && <Icon large={false} name="check" color={COLORS.gray} />}
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.backgroundGrayLight, { paddingHorizontal: 10, paddingBottom: 10 }]}>
          <Text>
            Tôi đồng ý với
            <Text>
              <Text style={{ color: COLORS.red, textDecorationLine: "underline" }}> Điều khoản sửa dụng </Text>
            </Text>
            và đang mua vé cho người có độ tuổi phù hợp
          </Text>
          <View style={{ marginVertical: 15 }}>
            <Button text="TÔI ĐỒNG Ý VÀ TIẾP TỤC" tintColor={COLORS.white} onPress={handlePayment} />
          </View>
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGrayLight: {
    backgroundColor: "#D8D7CA",
    paddingVertical: 10,
  },
  textGray: {
    color: COLORS.darkGrey,
    opacity: 0.6,
    paddingLeft: 10,
    textTransform: "uppercase",
  },
  head: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  headTitle: {
    paddingRight: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    marginBottom: 3,
  },
  iconRightArrow: {
    width: 14,
    height: 14,
    tintColor: COLORS.lightGrey,
    marginRight: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 10,
  },
  iconLogo: {},
});
