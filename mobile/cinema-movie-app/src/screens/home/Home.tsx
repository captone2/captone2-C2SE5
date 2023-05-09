import {
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
import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../utils/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setMovieDetails } from "../../redux/movie/reducer";
const genreList = [
  {
    id: 1,
    name: "Hành động",
  },
  {
    id: 2,
    name: "Kinh dị",
  },
  {
    id: 3,
    name: "Gia đình",
  },
  {
    id: 4,
    name: "Hài ",
  },
  {
    id: 5,
    name: "Tình cảm",
  },
  {
    id: 6,
    name: "Tâm lý",
  },
];

const SECTIONS = [
  {
    title: "Made for you",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/10/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1002/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1006/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1008/200",
      },
    ],
  },
  {
    title: "Punk and hardcore",
    horizontal: true,
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1011/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/1012/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1013/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1015/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1016/200",
      },
    ],
  },
  {
    title: "Based on your recent listening",
    // horizontal: true,
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1020/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/1024/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1027/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1035/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1038/200",
      },
    ],
  },
];

const Home: FC = ({ navigation }) => {
  const [keySearch, setKeySearch] = useState("");
  const [data, setData] = useState(SECTIONS);
  const [flag, setFlag] = useState(false);
  const dispatch = useAppDispatch();

  //require("../../../assets/icons/logo.png")
  const ListItem = ({ item, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ margin: 10 }}>
          <Image
            source={{
              uri: item.uri,
            }}
            style={{ width: 200, height: 200 }}
            resizeMode="cover"
          />
          <Text style={{ color: "rgba(255, 255, 255, 0.5)", marginTop: 5 }}>
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filterMovie = () => {
    setFlag(!flag);
    const result = SECTIONS[0].data.filter((el) => el.text.includes(keySearch));

    setData(result as any);
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
            onChangeText={(text) => setKeySearch(text)}
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

        {!flag ? (
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS}
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
                          navigation.navigate("MovieDetail", { item: item });
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
                  onPress={() => console.log("item", item)}
                />
              ) : null;
            }}
          />
        ) : (
          <FlatList
            horizontal
            data={data}
            renderItem={({ item, index }) => (
              <ListItem
                item={item}
                onPress={() => {
                  navigation.navigate("MovieDetail", { item: item.data });
                  dispatch(setMovieDetails(item.data));
                }}
              />
            )}
            // showsHorizontalScrollIndicator={false}
          />
        )}
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

    // shadowColor: COLORS.white,
    // shadowOffset: {
    //   width: 0,
    //   height: 10,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.5,
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#f4f4f4",
    marginTop: 20,
    marginBottom: 5,
  },
});
