import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Icon } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS } from "../../utils/theme";
import { numberWithPoint } from "../../utils/format";
import { FoodResponse } from "../../redux/booking/type";
import { useAppSelector } from "../../hooks/useAppSelector";
import { TextInput } from "react-native-paper";
import { Seat } from "../../redux/movie/type";

const ChoosePayment: FC = ({ navigation, route }) => {
  const [choosePayment, setChoosePayment] = useState({
    paypal: false,
    atm: false,
    visa: false,
    momo: false,
    zalo: false,
    shoppe: false,
  });

  const foodList: FoodResponse[] = useAppSelector((state) => state.bookingReducer.data.food);
  //** get data from route */
  const seats: Seat[] = route.params.seats;
  const movie = route.params.movie;
  const showtime = route.params.showtime;
  const priceTicket = 45000;

  const sumTotal = seats.length * priceTicket;

  //TODO: add combo food
  const FoodItem = ({ item, index }) => {
    const updateFoodQuantity = (newQuantity) => {
      foodList[index].quantity = newQuantity;
      console.log("foodListHasQuantity", foodList);
    };
    const [test, setTest] = useState({ value: "", index: -1 });

    const value = test.index === index ? test.value : item.quantity.toString();

    return (
      <View style={styles.box}>
        <View>
          <Image
            style={{ width: 50, height: 60, borderRadius: 10 }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo-Y6hcgAK2JGulS3cDmS4VeNMfkVO5It9Xw&usqp=CAU",
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 30 }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text>{item.price} đ</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Text style={{ paddingTop: 8, paddingRight: 4 }}>SL</Text>
          <TextInput
            placeholder="0"
            style={{ width: 50, borderWidth: 1 }}
            textAlign="center"
            value={value}
            onChangeText={(text: string) => setTest({ value: text, index: index })}
            autoCapitalize="none"
            returnKeyType="done"
            autoComplete="name"
          />
        </View>
      </View>
    );
  };

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
        <View style={{ flexDirection: "row", paddingLeft: 4, paddingRight: 10, paddingVertical: 5 }}>
          <View style={{ flexDirection: "column" }}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo-Y6hcgAK2JGulS3cDmS4VeNMfkVO5It9Xw&usqp=CAU",
              }}
              style={{ height: 100, width: 70 }}
            />
          </View>
          <View style={{ flexDirection: "column", paddingLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{movie.movie.title}</Text>
            <Text>Ngày: {movie.showDate}</Text>
            <Text>Giờ: {showtime.length > 5 ? showtime.substring(0, 5) : showtime.substring(0, 4)}</Text>
            <Text>Phòng: {movie.screen.name}</Text>
            <Text>Ghế: {seats.map((el) => el.name).join(", ")}</Text>
            <Text style={{ color: COLORS.red, fontWeight: "bold" }}>
              Tổng thanh toán: {numberWithPoint(sumTotal)} đ
            </Text>
          </View>
        </View>
        <View style={styles.backgroundGrayLight}>
          <Text style={styles.textGray}>THÔNG TIN VÉ</Text>
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.paddingHorizontal}>Số lượng</Text>
            <Text style={styles.paddingHorizontal}>{seats.length}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.paddingHorizontal}>Tổng</Text>
            <Text style={styles.paddingHorizontal}>{numberWithPoint(sumTotal)} đ</Text>
          </View>
        </View>
        {/* //TODO: Flatlist here */}
        {/* <View>
          <View style={styles.backgroundGrayLight}>
            <Text style={{ fontWeight: "bold", paddingLeft: 7 }}> Thêm combo/bắp nước</Text>
          </View>
          <View style={{ width: "90%" }}>
            <FlatList
              data={foodList}
              horizontal
              keyExtractor={(item) => item.id.toFixed()}
              renderItem={({ item, index }) => <FoodItem item={item} index={index} />}
            />
          </View>
        </View>*/}

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
              <Text style={styles.paddingHorizontal}> {numberWithPoint(sumTotal)} đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.paddingHorizontal}>Giảm giá</Text>
              <Text style={styles.paddingHorizontal}>0 đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.paddingHorizontal}>Còn lại</Text>
              <Text style={styles.paddingHorizontal}> {numberWithPoint(sumTotal)} đ</Text>
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
                  paypal: !choosePayment.paypal,
                  atm: false,
                  visa: false,
                  momo: false,
                  zalo: false,
                  shoppe: false,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/icons/paypal.png")} style={styles.icon} resizeMode="cover" />
                <Text>Paypal</Text>
              </View>
              {choosePayment.paypal && <Icon large={false} name="check" color={COLORS.gray} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { paddingHorizontal: 10, alignItems: "center" }]}
              onPress={() =>
                setChoosePayment({
                  paypal: false,
                  atm: !choosePayment.atm,
                  visa: false,
                  momo: false,
                  zalo: false,
                  shoppe: false,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/icons/atm.jpeg")} style={styles.icon} resizeMode="cover" />
                <Text>ATM Card(thẻ nội địa)</Text>
              </View>
              {choosePayment.atm && <Icon large={false} name="check" color={COLORS.gray} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { paddingHorizontal: 10 }]}
              onPress={() =>
                setChoosePayment({
                  paypal: false,
                  atm: false,
                  visa: !choosePayment.visa,
                  momo: false,
                  zalo: false,
                  shoppe: false,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/icons/visa.png")} style={styles.icon} resizeMode="cover" />
                <Text>Thẻ quốc tế (Visa, Master, Amex, JCB)</Text>
              </View>
              {choosePayment.visa && <Icon large={false} name="check" color={COLORS.gray} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { paddingHorizontal: 10 }]}
              onPress={() =>
                setChoosePayment({
                  paypal: false,

                  atm: false,
                  visa: false,
                  momo: !choosePayment.momo,
                  zalo: false,
                  shoppe: false,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/icons/momo.png")} style={styles.icon} resizeMode="cover" />
                <Text>Ví MoMo</Text>
              </View>
              {choosePayment.momo && <Icon large={false} name="check" color={COLORS.gray} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { paddingHorizontal: 10 }]}
              onPress={() =>
                setChoosePayment({
                  paypal: false,
                  atm: false,
                  visa: false,
                  momo: false,
                  zalo: !choosePayment.zalo,
                  shoppe: false,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/icons/zalo.png")} style={styles.icon} resizeMode="cover" />
                <Text>ZaloPay</Text>
              </View>
              {choosePayment.zalo && <Icon large={false} name="check" color={COLORS.gray} />}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { paddingHorizontal: 10 }]}
              onPress={() =>
                setChoosePayment({
                  paypal: false,
                  atm: false,
                  visa: false,
                  momo: false,
                  zalo: false,
                  shoppe: !choosePayment.shoppe,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Image source={require("../../../assets/icons/shoppePay.png")} style={styles.icon} resizeMode="cover" />
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
            <Button
              text="TÔI ĐỒNG Ý VÀ TIẾP TỤC"
              tintColor={COLORS.white}
              onPress={() => navigation.navigate("Payment", { sumTotal: sumTotal })}
              disabled={!Object.values(choosePayment).includes(true)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChoosePayment;

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
    paddingVertical: 10,
  },
  headTitle: {
    paddingLeft: 10,
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
  box: {
    maxWidth: "80%",
    marginTop: 20,
    marginHorizontal: "10%",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 7,
    backgroundColor: COLORS.colors.surface,
    borderRadius: 20,
  },
  icon: {
    width: 30,
    height: 28,
    marginRight: 15,
    borderRadius: 5,
  },
});
