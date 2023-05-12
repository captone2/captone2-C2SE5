import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import { COLORS } from "../../utils/theme";
import { Button } from "../../components";
import { useAppSelector } from "../../hooks/useAppSelector";
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  navigation?: any;
};

const AboutMovie: FC<Props> = ({ navigation }) => {
  // const item = route.params.item;
  const data = useAppSelector((state) => state.movieReducer.data.movieDetail);

  const getIdVideoTrailer = data?.trailerUrl.split("=").pop();

  const hourRunning = (data?.runningTime as number) / 60;
  const minutesRunning = (hourRunning - Math.floor(hourRunning)) * 60;
  const timeRunning =
    Math.floor(hourRunning) + "giờ " + Math.round(minutesRunning) + "phút";

  const genres = data?.genres.map((el) => el.name).join(", ");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.trailer}>
          <View style={styles.video}>
            <YoutubePlayer
              height={200}
              play={false}
              videoId={getIdVideoTrailer}
              onFullScreenChange={() => "large"}
              useLocalHTML={false}
            />
          </View>
          <View style={styles.feedback}>
            <TouchableOpacity style={styles.wrapComment}>
              <Text style={[styles.comment, { paddingHorizontal: 10 }]}>
                10
              </Text>
              <Icon name="commenting-o" size={18} style={styles.comment} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrapComment}>
              <Text style={[styles.comment, { paddingHorizontal: 10 }]}>
                4.5
              </Text>
              <Icon
                name="star"
                size={18}
                style={{ color: COLORS.color.yellow }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailMovie}>
          <Text style={styles.textWhite}>{data?.content}</Text>
          <View style={styles.wrapInfo}>
            <View style={styles.row}>
              <Text style={styles.verticalTitle}>Thời lượng</Text>
              <Text style={styles.textWhite}>{timeRunning}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.verticalTitle}>Thể loại</Text>
              <Text style={styles.textWhite}>{genres}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.verticalTitle}>Đạo diễn</Text>
              <Text style={styles.textWhite}>{data?.director}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.verticalTitle}>Diễn Viên</Text>
              <Text style={styles.textWhite}>{data?.cast}</Text>
            </View>
          </View>

          <View style={{ paddingBottom: 30 }}>
            <Button
              text="Đặt vé"
              tintColor={COLORS.white}
              onPress={() => navigation.navigate("MovieDetail")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutMovie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  trailer: {},
  video: {
    height: 200,
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
    flexDirection: "row",
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
    flexDirection: "column",
    marginVertical: 10,
  },
  verticalTitle: {
    width: "30%",
    color: COLORS.lightGrey,
  },
  textWhite: {
    color: COLORS.white,
    marginBottom: 5,
  },
  textGray: {
    color: COLORS.lightGrey,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    width: "70%",
  },
});
