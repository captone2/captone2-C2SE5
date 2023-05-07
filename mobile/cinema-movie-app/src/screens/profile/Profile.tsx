import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Button } from "../../components";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutAction } from "../../redux/auth/reducer";
type Props = {
  navigation?: any;
};
const Profile: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(logoutAction());
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });

    // Alert.alert("Sign out!", "Are you sure sign out ?", [
    //   {
    //     text: "OK",
    //     onPress: async () => {

    //     },
    //   },
    // ]);
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button text="Logout" onPress={logout} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
