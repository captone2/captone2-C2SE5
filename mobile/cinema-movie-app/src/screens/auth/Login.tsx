import React, { FC, useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, Linking, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import { BackButton, Button, TextInput } from "../../components";
import { logoutAction } from "../../redux/auth/reducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ValidateService } from "../../utils/validate";
import { loginAsync } from "../../redux/auth/dispatcher";
import { LoginInfo } from "../../redux/auth/type";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  navigation?: any;
};
const Login: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user, errors } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({
    email: "",
    error: "",
  });
  const [password, setPassword] = useState({
    password: "",
    error: "",
  });

  const handleLoginPressed = () => {
    setLoading(true);
    const checkEmailHasError = ValidateService.emailValidator(email.email);
    const checkPasswordHasError = ValidateService.passwordValidator(password.password);

    if (checkEmailHasError || checkPasswordHasError) {
      setLoading(false);
      setEmail({
        email: email.email,
        error: checkEmailHasError,
      });
      setPassword({
        password: password.password,
        error: checkPasswordHasError,
      });
      return;
    }
    const body: LoginInfo = {
      email: email.email,
      password: password.password,
    };
    dispatch(loginAsync(body))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigation.navigate("TabBottom");
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(
    () => () => {
      setLoading(false);
      if (user.accessToken) {
        navigation.navigate("TabBottom");
      }
      dispatch(logoutAction());
    },
    []
  );

  const onPressRegister = useCallback(async () => {
    const url = "http://localhost:4200/register";
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  return (
    <View style={styles.wrapContainer}>
      <View style={styles.headerTitle}>
        <View style={{ left: 0, top: 20, position: "absolute" }}>
          <BackButton />
        </View>
        <View style={{ right: 10, position: "absolute" }}>
          <Text style={styles.textHeader}>Have a nice day</Text>
          <Text style={[styles.textHeader, { color: COLORS.color.orange }]}>HST Cinema</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="Email"
          value={email.email}
          onChangeText={(text: string) => setEmail({ email: text, error: "" })}
          autoCapitalize="none"
          returnKeyType="next"
          autoComplete="email"
          error={!!email.error}
          errorText={email.error}
          description=""
          theme={COLORS}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            label="Mật khẩu"
            returnKeyType="done"
            value={password.password}
            onChangeText={(text) => setPassword({ password: text, error: "" })}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={showPassword}
            errorText={password.error}
            error={!!password.error}
            autoComplete="off"
            description=""
            theme={COLORS}
            style={{ marginTop: 10 }}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: 10, top: 32 }}
          >
            <Icon name={showPassword ? "lock" : "unlock"} size={22} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.errors}>
        {errors && errors.length > 0 ? (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ color: COLORS.colors.error }}>{errors[0].errorMessage}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.btn}>
        <Button
          text="Đăng nhập"
          disabled={!(email.email && password.password)}
          tintColor={COLORS.white}
          loading={loading}
          onPress={handleLoginPressed}
        />

        <View style={{ marginTop: 10 }}>
          {/* TODO: redirect to web */}
          <Button text="Tạo mới tài khoản" tintColor={COLORS.white} onPress={onPressRegister} />
          {/* <ActivityIndicator size="small" color="#0000ff" animating={loading} /> */}
        </View>

        <Text style={{ paddingHorizontal: "31%", textDecorationLine: "underline" }}>Quên mật khẩu.</Text>
      </View>
      <View style={styles.box}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapContainer: {
    height: "100%",
  },
  formContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerTitle: {
    height: "40%",
    backfaceVisibility: "hidden",
    backgroundColor: COLORS.color.primary,
    justifyContent: "center",
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 2,
  },
  textHeader: {
    textAlign: "center",
    fontSize: SIZES.largeTitle,
    color: COLORS.white,
  },
  errors: {
    justifyContent: "center",
  },
  btn: {
    marginTop: 30,
    marginHorizontal: 70,
  },
  box: {
    backgroundColor: COLORS.color.primary,
    height: 70,
    width: 70,
    borderTopRightRadius: 100,
    position: "absolute",
    bottom: 0,
  },
});

export default Login;
