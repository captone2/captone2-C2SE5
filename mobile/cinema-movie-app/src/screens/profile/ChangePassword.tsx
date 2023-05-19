import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { BackButton, Button } from "../../components";
import { COLORS } from "../../utils/theme";
import { useAppSelector } from "../../hooks/useAppSelector";
import TextInput from "../../components/TextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { ValidateService } from "../../utils/validate";
import { UserService } from "../../services/auth/auth.service";
import { compareStrings } from "../../utils/format";

type Props = {
  navigation?: any;
};
const ChangePassword: FC<Props> = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState({ value: "", error: "" });
  const [newPassword, setNewPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: true,
    newPassword: true,
    confirmPassword: true,
  });

  const { userCurrent } = useAppSelector((state) => state.user.user);

  const reset = () => {
    setOldPassword({ value: "", error: "" });
    setNewPassword({ value: "", error: "" });
    setConfirmPassword({ value: "", error: "" });
  };

  const handleUpdatePassword = async () => {
    setLoading(true);
    if (await compareStrings(oldPassword.value, userCurrent.password)) {
      const checkNewPassword = ValidateService.passwordValidator(newPassword.value);
      if (checkNewPassword) {
        ToastAndroid.show("Mật khẩu mới không hợp lệ.", ToastAndroid.LONG);
        setNewPassword({ value: newPassword.value, error: checkNewPassword });
        setLoading(false);
        return;
      }
      if (newPassword.value.trim().toLocaleLowerCase() !== confirmPassword.value.trim().toLocaleLowerCase()) {
        setConfirmPassword({ value: confirmPassword.value, error: "Nhập mật khẩu không khớp." });
        ToastAndroid.show("Nhập mật khẩu không khớp.", ToastAndroid.LONG);
        setLoading(false);
        return;
      }
      try {
        if (await compareStrings(newPassword.value, userCurrent.password)) {
          ToastAndroid.show("Mật khẩu mới không được trùng mật khẩu củ.", ToastAndroid.LONG);
          setLoading(false);
          return;
        }
        //** Thành công */
        UserService.updatePassword(userCurrent.id, {
          oldPassword: oldPassword.value,
          newPassword: newPassword.value,
          confirmPassword: confirmPassword.value,
        });
        ToastAndroid.show("Thay đổi mật khẩu thành công.", ToastAndroid.LONG);
        reset();
        navigation.goBack();
      } catch (err) {
        ToastAndroid.show("Thay đổi mật khẩu không thành công.", ToastAndroid.LONG);
        setLoading(false);
        return;
      }
    } else {
      setOldPassword({ value: oldPassword.value, error: "Mật khẩu củ không đúng." });
      ToastAndroid.show("Mật khẩu củ không đúng.", ToastAndroid.LONG);
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10, paddingBottom: 4 }}></View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <BackButton color={COLORS.colors.error} />
        <Text>Thay đổi mật khẩu</Text>
      </View>
      {/* <View style={{ height: 160, width: "100%", backgroundColor: COLORS.color.orange }}></View> */}
      <View style={{ marginHorizontal: 30, marginVertical: 40 }}>
        <Text>Mật khẩu đăng nhập</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            label="Mật khẩu củ"
            value={oldPassword.value}
            onChangeText={(text) => setOldPassword({ value: text, error: "" })}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={showPassword.oldPassword}
            errorText={oldPassword.error}
            error={!!oldPassword.error}
            autoComplete="off"
            description=""
            placeholder=""
            returnKeyType="next"
            theme={COLORS}
          />
          <TouchableOpacity
            onPress={() =>
              setShowPassword({
                oldPassword: !showPassword.oldPassword,
                newPassword: showPassword.newPassword,
                confirmPassword: showPassword.confirmPassword,
              })
            }
            style={{ position: "absolute", right: 10, top: 32 }}
          >
            <Icon name={showPassword.oldPassword ? "lock" : "unlock"} size={22} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            label="Mật khẩu mới"
            returnKeyType="next"
            value={newPassword.value}
            onChangeText={(text) => setNewPassword({ value: text, error: "" })}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={showPassword.newPassword}
            errorText={newPassword.error}
            error={!!newPassword.error}
            autoComplete="off"
            description=""
            theme={COLORS}
            style={{ marginTop: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setShowPassword({
                oldPassword: showPassword.oldPassword,
                newPassword: !showPassword.newPassword,
                confirmPassword: showPassword.confirmPassword,
              })
            }
            style={{ position: "absolute", right: 10, top: 32 }}
          >
            <Icon name={showPassword.newPassword ? "lock" : "unlock"} size={22} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            label="Xác nhận mật khẩu"
            returnKeyType="done"
            value={confirmPassword.value}
            onChangeText={(text) => setConfirmPassword({ value: text, error: "" })}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={showPassword.confirmPassword}
            errorText={confirmPassword.error}
            error={!!confirmPassword.error}
            autoComplete="off"
            description=""
            theme={COLORS}
            style={{ marginTop: 10 }}
          />
          <TouchableOpacity
            onPress={() =>
              setShowPassword({
                oldPassword: showPassword.oldPassword,
                newPassword: showPassword.newPassword,
                confirmPassword: !showPassword.confirmPassword,
              })
            }
            style={{ position: "absolute", right: 10, top: 32 }}
          >
            <Icon name={showPassword.confirmPassword ? "lock" : "unlock"} size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Button
          text="THAY ĐỔI MẬT KHẨU"
          tintColor={COLORS.white}
          disabled={oldPassword.value.length <= 0 && newPassword.value.length <= 0 && confirmPassword.value.length <= 0}
          loading={loading}
          onPress={handleUpdatePassword}
        />
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
