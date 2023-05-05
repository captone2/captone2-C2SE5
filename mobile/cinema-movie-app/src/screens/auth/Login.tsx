import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS, SIZES } from "../../utils/theme";
import { Button, TextInput } from "../../components";
import { logoutAction } from "../../redux/auth/reducer";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ValidateService } from "../../utils/validate";
import { loginAsync } from "../../redux/auth/dispatcher";
import { LoginInfo } from "../../redux/auth/type";
import { useNavigation } from "../../hooks/useNavigation";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const { user, errors } = useAppSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({
    email: "",
    error: "",
  });
  const [password, setPassword] = useState({
    password: "",
    error: "",
  });

  const navigation = useNavigation();
  const handleLoginPressed = () => {
    console.log("press login");

    setLoading(true);
    const checkEmailHasError = ValidateService.emailValidator(email.email);
    const checkPasswordHasError = ValidateService.passwordValidator(
      password.password
    );

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
        navigation.navigate("Welcome");
        console.log(12);
      });
    setLoading(false);
  };

  useEffect(
    () => () => {
      setLoading(false);
      if (user.id) {
        navigation.navigate("Welcome");
      }
      dispatch(logoutAction());
    },
    []
  );

  return (
    <View style={styles.wrapContainer}>
      <View style={styles.headerTitle}>
        <Text style={styles.textHeader}>Welcome Back</Text>
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
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.password}
          onChangeText={(text) => setPassword({ password: text, error: "" })}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          errorText={password.error}
          error={!!password.error}
          autoComplete="off"
          description=""
          theme={COLORS}
        />
      </View>
      <View style={styles.errors}>
        {errors && errors.length > 0 ? (
          <View style={{ marginHorizontal: 8 }}>
            <Text style={{ color: COLORS.colors.error }}>
              {errors[0].errorMessage}
            </Text>
          </View>
        ) : null}
      </View>
      <View style={styles.btn}>
        <Button
          text="Sign In"
          disabled={!(email.email && password.password)}
          loading={loading}
          onPress={handleLoginPressed}
        />
        <View style={{ alignSelf: "center" }}>
          {/* TODO: redirect to web */}
          <Button
            text="Create an account"
            transparent
            tintColor={COLORS.white}
            onPress={() => navigation.navigate("register")}
          />
          {/* <ActivityIndicator size="small" color="#0000ff" animating={loading} /> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapContainer: {
    backgroundColor: COLORS.color.primary,
    height: "100%",
  },
  formContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerTitle: {
    height: "30%",
    backfaceVisibility: "hidden",
    justifyContent: "center",
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
});

export default Login;
