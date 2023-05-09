import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { COLORS } from "../../utils/theme";
import { Button } from "../../components";
import { useAppSelector } from "../../hooks/useAppSelector";

type Props = {
  navigation?: any;
  route?: any;
};

const AboutMovie: FC<Props> = ({ navigation, route }) => {
  // const item = route.params.item;
  const data = useAppSelector((state) => state.movieReducer.data.movieDetail);

  return (
    <View style={styles.container}>
      <View style={styles.trailer}>
        {/* //TODO: Video trailer */}
        <View style={styles.video}>
          <Image
            source={{
              uri: data.uri,
            }}
            style={{ width: "100%", height: 150 }}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.feedback}>
          <TouchableOpacity style={styles.wrapComment}>
            <Text style={[styles.comment, { paddingHorizontal: 22 }]}>10</Text>
            <Text style={styles.comment}>Bình luận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wrapComment}>
            <Text style={[styles.comment, { paddingHorizontal: 22 }]}> 10</Text>
            <Text style={styles.comment}> Đánh giá </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailMovie}>
        <Text style={styles.textWhite}>
          When the Riddler, a sadistic serial killer, begins murdering key
          political figures in Gotham, Batman is forced to investigate the
          city's hidden corruption and question his family's involvement.
        </Text>
        <View style={styles.wrapInfo}>
          <View style={styles.verticalTitle}>
            <Text style={styles.textGray}>When</Text>
            <Text style={styles.textGray}>When</Text>
            <Text style={styles.textGray}>When</Text>
            <Text style={styles.textGray}>When</Text>
            <Text style={styles.textGray}>When</Text>
            <Text style={styles.textGray}>When</Text>
          </View>
          <View>
            <Text style={styles.textWhite}>When</Text>
            <Text style={styles.textWhite}>When</Text>
            <Text style={styles.textWhite}>When</Text>
            <Text style={styles.textWhite}>When</Text>
            <Text style={styles.textWhite}>When</Text>
            <Text style={styles.textWhite}>When</Text>
          </View>
        </View>

        <Button
          text="Đặt vé"
          tintColor={COLORS.white}
          onPress={() => navigation.navigate("SessionMovie")}
        />
      </View>
    </View>
  );
};

export default AboutMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  trailer: {},
  video: {
    height: 150,
    backgroundColor: COLORS.color.primary,
    paddingHorizontal: 10,
  },
  feedback: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.color.primary,
  },
  wrapComment: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 10,
  },
  comment: {
    color: COLORS.white,
  },
  detailMovie: {
    backgroundColor: COLORS.color.primary,
    height: "100%",
    paddingHorizontal: 12,
  },
  wrapInfo: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
  },
  verticalTitle: {
    paddingRight: 40,
  },
  textWhite: {
    color: COLORS.white,
    marginBottom: 5,
  },
  textGray: {
    color: COLORS.lightGrey,
    marginBottom: 5,
  },
});
