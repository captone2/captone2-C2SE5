import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { BackButton, Button } from "../../components";
import { COLORS } from "../../utils/theme";
import { useAppSelector } from "../../hooks/useAppSelector";
import TextInput from "../../components/TextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserService } from "../../services/auth/auth.service";
import { compareStrings, dateReverse } from "../../utils/format";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { UpdateAccount } from "../../redux/auth/type";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getAccountById } from "../../redux/auth/dispatcher";
import { format } from "date-fns";

type Props = {
  navigation?: any;
};
const MyInformation: FC<Props> = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState({ value: "", error: "" });
  const { userCurrent } = useAppSelector((state) => state.user.user);
  const { user } = useAppSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const [info, setInfo] = useState({
    name: userCurrent.fullname,
    phone: userCurrent.phone,
    email: userCurrent.email,
    birthday: userCurrent.birthday,
    gender: userCurrent.gender,
    address: userCurrent.address,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useAppDispatch();

  const isMatchPassword = async () => {
    setLoading(true);
    if (await compareStrings(oldPassword.value, userCurrent.password)) {
      setLoading(false);
      setVisible(true);
      return;
    }
    ToastAndroid.show("Mật khẩu không đúng.", ToastAndroid.LONG);
    setLoading(false);
  };

  const handlePasswordCurrent = () => {
    isMatchPassword();
  };

  const handleGenderChange = (value: boolean) => {
    setInfo({
      name: info.name,
      phone: info.phone,
      email: info.email,
      birthday: info.birthday,
      gender: value,
      address: info.address,
    });
  };

  const handlePressUpdate = async () => {
    try {
      const data: UpdateAccount = {
        fullname: info.name,
        address: info.address,
        birthday: info.birthday,
        gender: info.gender,
        phone: info.phone,
      };
      const response = await UserService.updateAccount(userCurrent.id, data);
      if (response) {
        ToastAndroid.show("Chỉnh sửa thông tin thành công.", ToastAndroid.LONG);
        dispatch(getAccountById(user.id));
        navigation.goBack();
      }
    } catch (error) {
      ToastAndroid.show("Chỉnh sửa thông tin không thành công.", ToastAndroid.LONG);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [userCurrent]);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10, paddingBottom: 4 }}></View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <BackButton color={COLORS.colors.error} />
        <Text>Thông tin cá nhân</Text>
      </View>
      {visible ? (
        <>
          <View style={{ margin: 15 }}>
            <TextInput
              label="Họ Tên *"
              value={info.name}
              onChangeText={(text) =>
                setInfo({
                  name: text,
                  phone: info.phone,
                  email: info.email,
                  birthday: info.birthday,
                  gender: info.gender,
                  address: info.address,
                })
              }
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              description=""
              returnKeyType="done"
              theme={COLORS}
            />
            <TextInput
              label="Số điện thoại *"
              value={info.phone}
              onChangeText={(text) =>
                setInfo({
                  name: info.name,
                  phone: text,
                  email: info.email,
                  birthday: info.birthday,
                  gender: info.gender,
                  address: info.address,
                })
              }
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              description=""
              returnKeyType="next"
              theme={COLORS}
            />
            <TextInput
              label="Email *"
              value={info.email}
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              description=""
              returnKeyType="next"
              theme={COLORS}
              disabled
            />
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "60%" }}>
                <TextInput
                  label="Ngày sinh *"
                  value={info.birthday}
                  onChangeText={(date) =>
                    setInfo({
                      name: info.name,
                      phone: info.phone,
                      email: info.email,
                      birthday: date,
                      gender: info.gender,
                      address: info.address,
                    })
                  }
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  description=""
                  returnKeyType="next"
                  theme={COLORS}
                  style={{ width: "100%" }}
                />
                <TouchableOpacity
                  onPress={() => setDatePickerVisibility(true)}
                  style={{ position: "absolute", right: 10, top: 30 }}
                >
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onChange={(date: Date) =>
                      setInfo({
                        name: info.name,
                        phone: info.phone,
                        email: info.email,
                        birthday: date.toDateString(),
                        gender: info.gender,
                        address: info.address,
                      })
                    }
                    onConfirm={(date) => {
                      setInfo({
                        name: info.name,
                        phone: info.phone,
                        email: info.email,
                        birthday: format(date, "yyyy-MM-dd"),
                        gender: info.gender,
                        address: info.address,
                      });
                      setDatePickerVisibility(false);
                    }}
                    onCancel={() => setDatePickerVisibility(false)}
                  />

                  <Icon name="calendar" color={COLORS.lightGrey} size={18} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "40%",
                  borderColor: "#C3C3C3",
                  borderWidth: 1,
                  height: 60,
                  alignSelf: "center",
                  borderRadius: 6,
                }}
              >
                <Picker selectedValue={info.gender} onValueChange={handleGenderChange} style={styles.picker}>
                  <Picker.Item label="Giới tính" value="" />
                  <Picker.Item label="Nam" value="1" />
                  <Picker.Item label="Nữ" value="0" />
                </Picker>
              </View>
            </View>
            <TextInput
              label="Địa chỉ *"
              value={info.address}
              onChangeText={(text) =>
                setInfo({
                  name: info.name,
                  phone: info.phone,
                  email: info.email,
                  birthday: info.birthday,
                  gender: info.gender,
                  address: text,
                })
              }
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              description=""
              returnKeyType="done"
              theme={COLORS}
            />

            <View style={{ marginTop: 10 }}>
              <Text style={{ marginBottom: 10 }}>* Thông tin bắt buộc.</Text>
              <Button
                text="Chỉnh sửa thông tin"
                tintColor={COLORS.white}
                onPress={handlePressUpdate}
                loading={loading}
              />
              <View style={{ alignSelf: "center" }}>
                <Text
                  style={{ color: COLORS.blue, fontStyle: "italic", textDecorationLine: "underline" }}
                  onPress={() => ToastAndroid.show("Hiện tại chưa thể xóa tài khoản của mình được.", ToastAndroid.LONG)}
                >
                  Xóa tài khoản
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                label="Mật khẩu"
                value={oldPassword.value}
                onChangeText={(text) => setOldPassword({ value: text, error: "" })}
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry={showPassword}
                errorText={oldPassword.error}
                error={!!oldPassword.error}
                autoComplete="off"
                description=""
                placeholder=""
                returnKeyType="done"
                theme={COLORS}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: 10, top: 32 }}
              >
                <Icon name={showPassword ? "lock" : "unlock"} size={22} />
              </TouchableOpacity>
            </View>
            <Text style={{ paddingLeft: 10 }}>
              <Text style={{ color: COLORS.colors.error }}>*</Text> Để bảo mật, vui lòng nhập mật khẩu của bạn.
            </Text>
            <View style={{ marginVertical: 40 }}>
              <Button
                text="XÁC NHẬN"
                tintColor={COLORS.white}
                disabled={oldPassword.value.length <= 0}
                loading={loading}
                onPress={handlePasswordCurrent}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default MyInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    width: "100%",
    borderColor: "black",
    borderWidth: 1,
  },
});
