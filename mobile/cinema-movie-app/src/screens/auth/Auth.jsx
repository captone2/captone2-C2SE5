import React, { useEffect } from "react";
import { View, Keyboard, StyleSheet } from "react-native";
import { COLORS } from "./../../constants";
import { Text, Button, LoginView, TextInput } from "./../../components";
import { logoutAction } from "../../redux/auth/reducer";
import { useAppDispatch } from "../../hook/useAppDispatch";

const Auth = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { navigate } = navigation;

  const { accessToken } = useAppSelector((state) => state.userReducer.user);
  const { errors } = useAppSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({
    email: "",
    error: "",
  });
  const [password, setPassword] = useState({
    password: "",
    error: "",
  });

  useEffect(
    () => () => {
      dispatch(logoutAction());
      if (accessToken) {
        navigation.navigate("Welcome");
      }
    },
    []
  );

  return (
    <LoginView title="Welcome back.">
      <View style={styles.formContainer}>
        {!!errorMessage && (
          <View style={{ marginHorizontal: 8 }}>
            <Text color={COLORS.red}>{errorMessage}</Text>
          </View>
        )}
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail({ email: text, error: "" })}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword({ password: text, error: "" })}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
      <View style={{ marginBottom: 2 }}>
        <Button
          text="Sign In"
          disabled={!(email && password)}
          loading={loading}
          onPress={() => {
            Keyboard.dismiss();
            dispatch(login());
          }}
        />
        <View style={{ alignSelf: "center" }}>
          <Button
            transparent
            tintColor={COLORS.white}
            text="Create an account"
            onPress={() => navigate("register")}
          />
        </View>
      </View>
    </LoginView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Auth;
