import {
  Animated,
  FlatList,
  GestureResponderEvent,
  Image,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { FC, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../utils/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setMovieDetails } from "../../redux/movie/reducer";
import { findAllGenres, findAllMovie } from "../../redux/movie/dispatcher";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Movie } from "../../redux/movie/type";

type ListItemProps = {
  item: Movie;
  onPress?: () => any;
};

const Home: FC = ({ navigation }) => {
  const movieList = useAppSelector((state) => state.movieReducer.data.movies);
  const [keySearch, setKeySearch] = useState("");
  const [movieListFilter, setMovieListFilter] = useState<Movie[]>([]);
  const genreList = useAppSelector((state) => state.movieReducer.data.genre);

  const dataSections = [
    {
      title: "Tất cả Phim",
      horizontal: true,
      data: [...movieList],
    },
    {
      title: "Phim đang chiếu",
      horizontal: true,
      data: [...movieList],
    },
    {
      title: "Phim sắp chiếu",
      horizontal: true,
      data: [...movieList],
    },
  ];

  const [flag, setFlag] = useState(false);
  const dispatch = useAppDispatch();

  const initial = async () => {
    await Promise.all([
      dispatch(findAllMovie(keySearch)),
      dispatch(findAllGenres()),
    ]);
  };
  useEffect(() => {
    initial();
  }, []);

  //require("../../../assets/icons/logo.png")
  const ListItem: FC<ListItemProps> = ({ item, onPress }) => {
    const hourRunning = item.runningTime / 60;
    const minutesRunning = (hourRunning - Math.floor(hourRunning)) * 60;
    const timeRunning =
      Math.floor(hourRunning) + "giờ " + Math.round(minutesRunning) + "phút";
    const dateRelease = new Date(item.releaseDate);
    const releaseDate =
      " " +
      dateRelease.getDate() +
      " Th" +
      dateRelease.getMonth() +
      " " +
      dateRelease.getFullYear();
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ margin: 10 }}>
          {/* //TODO: chưa apply uri từ database */}
          <Image
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
            style={{ width: 170, height: 200 }}
            resizeMode="cover"
          />
          {item.is3D && <Text style={[styles.is3D]}>3D</Text>}
          <Text
            style={{
              color: COLORS.white,
              marginTop: 5,
              width: 170,
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              width: 170,
            }}
          >
            {timeRunning} {releaseDate}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filterMovie = () => {
    setFlag(!flag);
    if (movieList.length < 0) {
      return;
    }
    const result = movieList.filter((el) => el.title.includes(keySearch));
    setMovieListFilter(result);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.filter}>
          <Image
            source={require("../../../assets/icons/logo.png")}
            resizeMode="cover"
            style={{ width: "10%", height: 40, tintColor: COLORS.white }}
          />
          <TextInput
            placeholder="Nhập tên phim tìm kiếm."
            style={styles.inputFilter}
            value={keySearch}
            onChange={(event) => {
              setKeySearch(event.nativeEvent.text);
            }}
          />
          <TouchableOpacity style={{ width: "10%" }} onPress={filterMovie}>
            <Icon name="search" size={18} style={styles.btnSearch} />
            {/* <Text style={styles.btnSearch}>Tìm</Text> */}
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <FlatList
            keyExtractor={(item) => item.id.toFixed()}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            data={genreList}
            horizontal
            renderItem={({ item, index }) => {
              return (
                <View style={styles.genre}>
                  <Text
                    style={{
                      color: COLORS.colors.surface,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        {!keySearch ? (
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={true}
            showsHorizontalScrollIndicator
            sections={dataSections}
            renderSectionHeader={({ section }) => (
              <>
                <Text style={styles.sectionHeader}>{section.title}</Text>
                {section.horizontal ? (
                  <FlatList
                    horizontal
                    data={section.data}
                    renderItem={({ item, index }) => (
                      <ListItem
                        item={item}
                        onPress={() => {
                          navigation.navigate("MovieDetail");
                          dispatch(setMovieDetails(item));
                        }}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : null}
              </>
            )}
            renderItem={({ item, section }) => {
              return !section.horizontal ? (
                <ListItem
                  item={item}
                  onPress={() => {
                    navigation.navigate("MovieDetail", { item: item });
                    dispatch(setMovieDetails(item));
                  }}
                />
              ) : null;
            }}
          />
        ) : !(keySearch.length > 0 && movieListFilter.length > 0) ? (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Text style={styles.notFound}>Không tìm thấy.</Text>
          </View>
        ) : movieListFilter.length > 0 ? (
          <>
            <Text
              style={[
                { color: COLORS.white, paddingLeft: 10 },
                styles.sectionHeader,
              ]}
            >
              Tất cả phim
            </Text>
            <FlatList
              horizontal
              data={movieListFilter}
              renderItem={({ item, index }) => (
                <ListItem
                  item={item}
                  onPress={() => {
                    navigation.navigate("MovieDetail");
                    dispatch(setMovieDetails(item));
                  }}
                />
              )}
              // showsHorizontalScrollIndicator={false}
            />
          </>
        ) : null}
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.color.primary,
    opacity: 0.9,
  },
  logoBackground: {},
  header: {
    height: 32,
  },
  filter: { display: "flex", flexDirection: "row", paddingBottom: 10 },
  inputFilter: {
    backgroundColor: COLORS.colors.surface,
    paddingHorizontal: 10,
    borderRadius: 20,
    width: "80%",
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  btnSearch: {
    color: COLORS.colors.surface,
    // backgroundColor: COLORS.green,
    justifyContent: "center",
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  genre: {
    backgroundColor: COLORS.gray,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  content: {
    height: "100%",
    backfaceVisibility: "hidden",
    zIndex: 1000,
    paddingTop: 20,
  },
  wrapMovie: {
    display: "flex",
    backgroundColor: COLORS.colors.notification,
    borderColor: COLORS.colors.notification,
    borderWidth: 2,
    marginHorizontal: 3,
    shadowColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#f4f4f4",
    marginTop: 20,
    marginBottom: 5,
  },

  notFound: {
    color: COLORS.white,
  },
  is3D: {
    backgroundColor: COLORS.green,
    position: "absolute",
    zIndex: 1,
    right: 0,
    top: 0,
    borderRadius: 5,
    color: COLORS.black,
    paddingHorizontal: 5,
  },
});
