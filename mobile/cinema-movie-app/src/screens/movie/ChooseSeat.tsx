import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../../utils/theme";
import { BackButton } from "../../components";
import { MovieShowtime, Seat } from "../../redux/movie/type";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAllFood, seatBookedByShowTime } from "../../redux/booking/dispatcher";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Button } from "../../components/";
import { FoodResponse } from "../../redux/booking/type";
import Countdown from "react-native-countdown-component";
import { setSeatSelected } from "../../redux/booking/reducer";

type SeatItem = {
  seat: Seat;
};

const ChooseSeat: FC = ({ navigation, route }) => {
  const movieShowtime: MovieShowtime = route.params.movieShowtime;
  const showtime: string = route.params.showtime;
  const dispatch = useAppDispatch();
  const seatBooked = useAppSelector((state) => state.bookingReducer.data.seatBooked);
  const foodList: FoodResponse[] = useAppSelector((state) => state.bookingReducer.data.food);
  const [modalVisible, setVisiBle] = useState(false);
  const [loading, setLoading] = useState(false);
  const seatSelect: Seat[] = [];

  const initial = async () => {
    await Promise.all([dispatch(seatBookedByShowTime(movieShowtime.id)), dispatch(getAllFood())]);
  };

  useEffect(() => {
    initial();
    seatSelect.slice(0, seatSelect.length);
  }, [seatSelect.length]);

  const SeatItem: FC<SeatItem> = ({ seat }) => {
    const [selectedSeatStyle, setSelectedSeatStyle] = useState(false);

    const handlePress = () => {
      setSelectedSeatStyle(!selectedSeatStyle);
      if (!selectedSeatStyle) {
        if (!seatSelect.includes(seat)) {
          seatSelect.push(seat);
        }
      } else {
        const index = seatSelect.findIndex((el) => el.id === seat.id);
        if (index > -1) {
          seatSelect.slice(index, 1);
        }
      }
    };

    const seatStyle = selectedSeatStyle ? [styles.seat, styles.seatSelecting] : styles.seat;

    return (
      <TouchableOpacity
        style={[seatStyle, seatBooked.includes(seat.id) && styles.seatSelected]}
        disabled={seatBooked.includes(seat.id)}
        onPressIn={handlePress}
      >
        <View>
          <Text style={styles.seatText}>{seat.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

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

  //   const handlePayPress = async () => {
  //     try {
  //       const paymentRequest = {
  //         intent: "sale",
  //         payer: {
  //           payment_method: "paypal",
  //         },
  //         currency: "VND",
  //         description: "Test Payment",
  //         amount: sumTotal,
  //       };

  //       const payment = await fetch("https://api.sandbox.paypal.com/v1/payments/payment", {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`,
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(paymentRequest),
  //       });

  //       const paymentData = await payment.json();

  //       setPaymentId(paymentData.id);

  //       const payPalConfig = {
  //         clientId: YOUR_CLIENT_ID,
  //         environment: PayPal.ENVIRONMENT.SANDBOX,
  //       };

  //       PayPal.initialize(payPalConfig);

  //       PayPal.pay({
  //         paymentId: paymentData.id,
  //         clientId: YOUR_CLIENT_ID,
  //       })
  //         .then(() => {
  //           // Payment was successful
  //           Alert.alert("Payment successful");
  //         })
  //         .catch((error) => {
  //           // Payment was cancelled or failed
  //           console.error(error);
  //           Alert.alert("Payment failed");
  //         });
  //     } catch (error) {
  //       console.error(error);
  //       Alert.alert("Payment failed");
  //     }
  //   };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.head}>
          <BackButton />
          <Text style={styles.headTitle}>{movieShowtime.movie.title}</Text>
        </View>
        <View style={styles.wrapDate}>
          <View style={[styles.datePicker]}>
            <View>
              <Icon name="calendar" color={COLORS.white} size={18} />
            </View>
            <Text style={styles.textWhite}>{movieShowtime.showDate}</Text>
          </View>
          <View style={styles.datePicker}>
            <View>
              <Icon name="clock-o" color={COLORS.white} size={18} />
            </View>
            <Text style={styles.textWhite}>
              {showtime.length > 5 ? showtime.substring(0, 5) : showtime.substring(0, 4)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 5,
            opacity: 0.8,
          }}
        >
          {/* <View>
            <Text style={styles.textWhite}>Tổng đơn hàng</Text>
            <Text style={styles.textWhite}>{`${sumTotal} đ`}</Text>
          </View> */}
          <View style={{ marginHorizontal: "38%" }}>
            <Text style={styles.textWhite}>Thời gian</Text>
            <Countdown
              until={5 * 60} // 5 minutes in seconds
              onFinish={() => {
                Alert.alert("Thông báo", "Thời gian đặt vé đã hết.", [
                  {
                    text: "quay lại",
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ]);
              }}
              showSeparator={false}
              timeLabels={{}}
              size={16}
              timeToShow={["M", "S"]}
              digitStyle={{ backgroundColor: "transparent" }}
              digitTxtStyle={{ color: COLORS.white }}
            />
          </View>
        </View>

        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginVertical: 10 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={[styles.styleSeat, { backgroundColor: COLORS.red }]}></View>
            <Text style={[styles.textWhite, { fontSize: 12 }]}>Vip</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={[styles.styleSeat, { backgroundColor: COLORS.gray }]}></View>
            <Text style={[styles.textWhite, { fontSize: 12 }]}>Đã đặt</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={[styles.styleSeat, { backgroundColor: COLORS.white }]}></View>
            <Text style={[styles.textWhite, { fontSize: 12 }]}>Trống</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={[styles.styleSeat, { backgroundColor: COLORS.color.orange }]}></View>
            <Text style={[styles.textWhite, { fontSize: 12 }]}>Đang chọn</Text>
          </View>
        </View>
        <View style={styles.wrapScreen}>
          <View style={styles.screen}>
            <Text style={styles.textScreen}>Màn hình</Text>
          </View>
        </View>
        <View style={styles.wrapSeat}>
          <FlatList
            data={movieShowtime.screen.seats}
            renderItem={({ item }) => <SeatItem seat={item} />}
            keyExtractor={(_, index) => index.toString()}
            ListFooterComponent={() => {
              return (
                <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                  <Button text="Thêm combo/bắp nước" tintColor={COLORS.white} onPress={() => setVisiBle(true)} />
                  <View style={{ marginBottom: 10 }}></View>
                  <Button
                    text="Thanh toán"
                    tintColor={COLORS.white}
                    onPress={() =>
                      navigation.navigate("ChoosePayment", {
                        movie: movieShowtime,
                        showtime: showtime,
                        seats: seatSelect,
                      })
                    }
                  />
                </View>
              );
            }}
            numColumns={8}
          />
        </View>
      </ScrollView>

      {/* modal show food */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        style={[styles.modal, styles.modal2]}
        onRequestClose={() => setVisiBle(false)}
      >
        <SafeAreaView style={[styles.container]}>
          <View style={{ flex: 1 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ fontSize: 20, color: COLORS.white, fontWeight: "700" }}>Thêm combo/bắp nước</Text>
            </View>
            <FlatList
              data={foodList}
              keyExtractor={(item) => item.id.toFixed()}
              renderItem={({ item, index }) => <FoodItem item={item} index={index} />}
            />

            <View style={{ marginHorizontal: "10%", marginBottom: 10 }}>
              <Button text="Đóng" tintColor={COLORS.white} onPress={() => setVisiBle(false)} />
            </View>
          </View>
          <ActivityIndicator animating={loading} color="#bc2b78" size="large" style={styles.activityIndicator} />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default ChooseSeat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.color.primary,

    paddingTop: 10,
  },
  head: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headTitle: {
    color: "white",
    paddingLeft: 50,
    paddingRight: 10,
    fontSize: 16,
  },
  wrapDate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.color.primary,
    marginVertical: 15,
  },
  datePicker: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    padding: 10,
    paddingHorizontal: 20,
    borderColor: COLORS.gray1,
    borderRadius: 4,
  },
  textWhite: {
    color: COLORS.white,
    paddingLeft: 10,
  },
  wrapScreen: {
    height: 50,
  },
  screen: {
    backgroundColor: COLORS.green,
    height: 20,
    width: "90%",
    position: "absolute",
    top: 10,
    left: "5%",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  textScreen: {
    color: COLORS.gray,
    paddingHorizontal: "42%",
  },
  wrapSeat: {
    marginHorizontal: "5%",
  },
  seat: {
    flex: 1,
    aspectRatio: 1.2,
    margin: 2,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  seatText: {
    fontSize: 12,
  },
  seatSelected: {
    flex: 1,
    aspectRatio: 1.2,
    margin: 2,
    backgroundColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  seatSelecting: {
    backgroundColor: COLORS.color.orange,
  },
  seatVip: {
    backgroundColor: COLORS.red,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: 230,
  },
  modal2: {
    height: 230,
    backgroundColor: "#3B5998",
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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    position: "absolute",
    top: "45%",
    left: "45%",
  },
  title: {
    left: "8%",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 30,
    marginHorizontal: "12%",
    marginVertical: "15%",
    color: COLORS.color.primary,
  },
  styleSeat: {
    width: 16,
    height: 16,
    justifyContent: "center",
    borderRadius: 5,
  },
});
