import {
  Animated,
  FlatList,
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
import {
  findAllGenres,
  findAllMovie,
  findAllMovieComingSoon,
  findAllMovieShowing,
  getFiveMovieHighestOfMonth,
} from "../../redux/movie/dispatcher";
import { useAppSelector } from "../../hooks/useAppSelector";
import { Movie } from "../../redux/movie/type";
import { format } from "date-fns";

type ListItemProps = {
  item: Movie;
  top?: boolean;
  onPress?: () => any;
};

const Home: FC = ({ navigation }) => {
  const movieList = useAppSelector((state) => state.movieReducer.data.movies);
  const movieShowingList = useAppSelector((state) => state.movieReducer.data.movieShowing);
  const movieComingSoonList = useAppSelector((state) => state.movieReducer.data.movieComingSoon);
  const fiveMovieHighestOfMonth = useAppSelector((state) => state.movieReducer.data.fiveMovieHighestOfMonth);
  const [keySearch, setKeySearch] = useState("");
  const [movieListFilter, setMovieListFilter] = useState<Movie[]>([]);
  const genreList = useAppSelector((state) => state.movieReducer.data.genre);

  const dataSections = [
    {
      title: "Tất cả Phim",
      top: false,
      horizontal: true,
      data: [...movieList],
    },
    {
      title: "Phim đang chiếu",
      top: false,
      horizontal: true,
      data: [...movieShowingList],
    },
    {
      title: "Phim sắp chiếu",
      top: false,
      horizontal: true,
      data: [...movieComingSoonList],
    },
    {
      title: "Top 5 bán chạy nhất",
      top: true,
      horizontal: true,
      data: [...fiveMovieHighestOfMonth],
    },
  ];

  const dispatch = useAppDispatch();
  const [selectedGenre, setSelectedGenre] = useState(null);

  const opacityValue = useRef(new Animated.Value(1)).current;
  const opacityValue1 = useRef(new Animated.Value(2)).current;
  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue1, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue1, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  const initial = async () => {
    await Promise.all([
      dispatch(findAllMovie(keySearch)),
      dispatch(findAllGenres()),
      dispatch(findAllMovieShowing()),
      dispatch(findAllMovieComingSoon()),
      dispatch(getFiveMovieHighestOfMonth()),
    ]);
  };
  useEffect(() => {
    startAnimation();
    initial();
  }, [movieList.length]);

  //require("../../../assets/icons/logo.png")
  const ListItem: FC<ListItemProps> = ({ item, top = false, onPress }) => {
    const hourRunning = item.runningTime / 60;
    const minutesRunning = (hourRunning - Math.floor(hourRunning)) * 60;
    const timeRunning = Math.floor(hourRunning) + "giờ " + Math.round(minutesRunning) + "phút";

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ margin: 10 }}>
          <Image
            source={{
              uri: item.movieImages[0].imageUrl,
            }}
            style={{ width: 170, height: 200 }}
            resizeMode="cover"
          />
          {item.is3D && (
            <Animated.View style={[{ opacity: opacityValue1 }, styles.is3D]}>
              <Text style={{ color: COLORS.white, fontSize: 12, padding: 2 }}>3d</Text>
            </Animated.View>
          )}
          {top && (
            <Animated.View style={[{ opacity: opacityValue }, styles.isBest]}>
              <Text style={{ color: COLORS.white, paddingVertical: 2 }}>Best</Text>
            </Animated.View>
          )}
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
            {timeRunning} {format(new Date(item.releaseDate), "d 'Th'M yyyy")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filterMovie = () => {
    if (movieList.length < 0) {
      return;
    }
    const result = movieList.filter((el) => el.title.toLowerCase().includes(keySearch.toLowerCase().trim()));
    setMovieListFilter(result);
  };

  const RenderGenre = ({ item, handleSelection, selectedGenre }) => {
    let isItemSelected = selectedGenre === item.id;
    const filterMovieByGenre = () => {
      handleSelection(item.id);
      if (selectedGenre === item.id) {
        handleSelection("");
        isItemSelected = false;
      }
      const result = movieList.reduce((pre, cur) => {
        const a = cur.genres.filter((el) => el.name.includes(item.name));
        if (a.length > 0) {
          return [...pre, cur];
        }
        return pre;
      }, [] as Movie[]);
      setMovieListFilter(result);
    };
    return (
      <TouchableOpacity style={[styles.genre, isItemSelected && styles.selectedGenre]} onPress={filterMovieByGenre}>
        <Text
          style={{
            color: COLORS.colors.surface,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleSelection = (id) => {
    setSelectedGenre(id);
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
            renderItem={({ item }) => (
              <RenderGenre item={item} selectedGenre={selectedGenre} handleSelection={handleSelection} />
            )}
          />
        </View>
        {!keySearch ? (
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsHorizontalScrollIndicator
            sections={dataSections}
            renderSectionHeader={({ section }) => (
              <>
                {/* {section.data.length > 0 && ( */}
                <>
                  <Text style={styles.sectionHeader}>{section.title}</Text>
                  {section.horizontal ? (
                    <FlatList
                      horizontal
                      data={section.data}
                      renderItem={({ item, index }) => (
                        <ListItem
                          item={item}
                          top={section.top}
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
                {/* )} */}
              </>
            )}
            renderItem={({ item, section }) => {
              return !section.horizontal ? (
                <ListItem
                  item={item}
                  top={section.top}
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
            <Text style={[{ color: COLORS.white, paddingLeft: 10 }, styles.sectionHeader]}>Tất cả phim</Text>
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
              showsHorizontalScrollIndicator={false}
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
    right: 2,
    bottom: 48,
    borderRadius: 5,
    color: COLORS.black,
    paddingHorizontal: 5,
  },
  isBest: {
    backgroundColor: COLORS.color.orange,
    position: "absolute",
    zIndex: 1,
    right: 0,
    top: 0,
    borderRadius: 5,
    color: COLORS.black,
    paddingHorizontal: 5,
  },
  selectedGenre: {
    backgroundColor: COLORS.lightGrey,
  },
});
