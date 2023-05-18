import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { BackButton, Button } from "../../components";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutAction } from "../../redux/auth/reducer";
import { useAppSelector } from "../../hooks/useAppSelector";
import { COLORS } from "../../utils/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { numberWithPoint } from "../../utils/format";
import { getAllBookingByAccount } from "../../redux/booking/dispatcher";

type Props = {
  navigation?: any;
};
const Profile: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user.user);
  const logout = () => {
    setLoading(true);
    dispatch(logoutAction());

    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
      setLoading(false);
    }, 1000);

    // Alert.alert("Sign out!", "Are you sure sign out ?", [
    //   {
    //     text: "OK",
    //     onPress: async () => {

    //     },
    //   },
    // ]);
  };

  useEffect(() => {
    dispatch(getAllBookingByAccount(user.id));
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BackButton color={COLORS.colors.error} />
          <TouchableOpacity style={{ right: 40, position: "absolute" }}>
            <FontAwesome name="ticket" size={20} color={COLORS.colors.error} />
          </TouchableOpacity>
        </View>

        <View style={{ alignSelf: "center" }}>
          <Image
            source={require("../../../assets/images/avt/avt.jpeg")}
            style={{ height: 80, width: 80, borderRadius: 40 }}
            resizeMode="cover"
          />
          <FontAwesome
            name="camera"
            size={10}
            style={{
              backgroundColor: COLORS.colors.background,
              width: 16,
              padding: 3,
              borderRadius: 10,
              right: 18,
              bottom: 30,
              position: "absolute",
            }}
          />
          <Text style={{ fontWeight: "bold", marginTop: 5 }}>{user.displayName}</Text>
        </View>

        <View
          style={{ flexDirection: "row", marginHorizontal: 40, justifyContent: "space-between", marginVertical: 20 }}
        >
          <View style={styles.titlePoint}>
            <Text>Tổng chi tiêu năm 2023</Text>
            <Text style={styles.point}>{numberWithPoint(0)} đ</Text>
          </View>
          <View style={styles.titlePoint}>
            <Text>Điểm thưởng</Text>
            <Text style={styles.point}>0</Text>
          </View>
        </View>

        <View>
          <View style={styles.row}>
            <View style={{ flexDirection: "row", paddingLeft: 10, alignItems: "center" }}>
              <FontAwesome name="id-card-o" size={20} style={{ width: 30 }} color={COLORS.colors.error} />
              <Text style={styles.paddingHorizontal}>Thông tin tài khoản</Text>
            </View>
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: "row", paddingLeft: 10, alignItems: "center" }}>
              <FontAwesome name="lock" size={20} style={{ width: 30 }} color={COLORS.colors.error} />

              <Text style={styles.paddingHorizontal}>Thay đổi mật khẩu</Text>
            </View>
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: "row", paddingLeft: 10, alignItems: "center" }}>
              <FontAwesome name="cc-paypal" size={20} style={{ width: 30 }} color={COLORS.colors.error} />
              <Text style={styles.paddingHorizontal}>Cài đặt mật mã thanh toán</Text>
            </View>
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: "row", paddingLeft: 10, alignItems: "center" }}>
              <FontAwesome name="user" size={20} style={{ width: 30 }} color={COLORS.colors.error} />
              <Text style={styles.paddingHorizontal}>Thẻ thành viên</Text>
            </View>
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.backgroundGrayLight}></View>
        <View style={{}}>
          <View style={styles.row}>
            <View style={{ flexDirection: "row", paddingLeft: 10, alignItems: "center" }}>
              <FontAwesome name="gift" size={20} style={{ width: 30 }} color={COLORS.colors.error} />
              <Text style={styles.paddingHorizontal}>Thẻ quà tặng | Voucher | Coupon</Text>
            </View>
            <TouchableOpacity>
              <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.backgroundGrayLight}></View>
        <View style={styles.row}>
          <View style={{ flexDirection: "row", paddingLeft: 10, alignItems: "center" }}>
            <Text style={styles.paddingHorizontal}>Lịch sử giao dịch</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("HistoryOrder")}>
            <Image source={require("../../../assets/icons/right-arrow.png")} style={styles.iconRightArrow} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Button
            text="Logout"
            disabled={loading}
            loading={loading}
            tintColor={COLORS.white}
            onPress={logout}
            children={
              <>
                <FontAwesome
                  name="sign-out"
                  size={16}
                  style={{ paddingLeft: 10, color: COLORS.white, alignSelf: "center" }}
                />
              </>
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  titlePoint: { flexDirection: "column", alignItems: "center" },
  point: {
    fontSize: 18,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.color.lightGrey,
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
  backgroundGrayLight: {
    height: 50,
    width: "100%",
    backgroundColor: "#D8D7CA",
  },
});
