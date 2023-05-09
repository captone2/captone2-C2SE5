import { StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import { Button } from "../../components";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutAction } from "../../redux/auth/reducer";
import { useAppSelector } from "../../hooks/useAppSelector";
import { COLORS } from "../../utils/theme";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  navigation?: any;
};
const Profile: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user);
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
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Full name: {user?.user.displayName}</Text>
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
  },
});
