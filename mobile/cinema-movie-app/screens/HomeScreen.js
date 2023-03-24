import React from "react";
import {
    View,
    Text,
    Image,
    SafeAreaView,
    FlatList,
    ScrollView,
    TouchableWithoutFeedback,
    ImageBackground,
    Animated,
} from "react-native";
import { dummyData, icons, SIZES } from "../constants";
import { Profiles, ProgressBar } from "../components";
import { theme } from "../constants/theme";
const HomeScreen = ({ navigation }) => {
    const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

    const renderNewSessionSection = () => {
        return (
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={SIZES.width}
                scrollEventThrottle={16}
                decelerationRate={0}
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                }}
                data={dummyData.newSeason}
                keyExtractor={(item) => `${item.id}`}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { x: newSeasonScrollX },
                            },
                        },
                    ],
                    { useNativeDriver: false }
                )}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() =>
                                navigation.navigate("MovieDetail", {
                                    selectedMovie: item,
                                })
                            }
                        >
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <ImageBackground
                                    resizeMode="cover"
                                    source={item.thumbnail}
                                    style={{
                                        width: SIZES.width * 0.85,
                                        height: SIZES.width * 0.85,
                                        justifyContent: "flex-end",
                                    }}
                                    imageStyle={{
                                        borderRadius: 40,
                                    }}
                                >
                                    <View
                                        style={{
                                            height: 60,
                                            width: "100%",
                                            marginBottom: SIZES.radius,
                                            paddingHorizontal: SIZES.radius,
                                            justifyContent: "space-between",
                                            flexDirection: "row",
                                        }}
                                    >
                                        {/* playnow */}
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: 40,
                                                    height: 40,
                                                    backgroundColor:
                                                        theme.colors
                                                            .transparentWhite,
                                                    borderRadius: 30,
                                                }}
                                            >
                                                <Image
                                                    source={icons.play}
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                        tintColor:
                                                            theme.colors.white,
                                                    }}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    marginLeft: SIZES.base,
                                                    color: theme.colors.white,
                                                    ...SIZES.h3,
                                                }}
                                            >
                                                PlayNow
                                            </Text>
                                        </View>

                                        {/* still watching */}
                                        {item.stillWatching.length > 0 && (
                                            <View
                                                style={{
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: theme.colors
                                                            .white,
                                                        ...SIZES.h4,
                                                    }}
                                                >
                                                    Still Watching
                                                </Text>
                                                <Profiles
                                                    profiles={
                                                        item.stillWatching
                                                    }
                                                />
                                            </View>
                                        )}
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                }}
            />
        );
    };

    const renderDots = () => {
        const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);

        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {dummyData.newSeason.map((item, index) => {
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp",
                    });

                    const dotwidth = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [6, 20, 6],
                        extrapolate: "clamp",
                    });

                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [
                            theme.colors.lightGray,
                            theme.colors.primary,
                            theme.colors.lightGray,
                        ],
                        extrapolate: "clamp",
                    });
                    return (
                        <Animated.View
                            opacity={opacity}
                            key={`dot-${index}`}
                            style={{
                                borderRadius: SIZES.radius,
                                marginHorizontal: 3,
                                width: dotwidth,
                                height: 6,
                                backgroundColor: dotColor,
                            }}
                        />
                    );
                })}
            </View>
        );
    };

    const renderContinueWatchingSection = () => {
        return (
            <View style={{ marginTop: SIZES.padding }}>
                {/* header */}
                <View
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: SIZES.padding,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            color: theme.colors.white,
                            ...SIZES.h2,
                        }}
                    >
                        Continue Watching
                    </Text>
                    <Image
                        source={icons.right_arrow}
                        style={{
                            height: 20,
                            tintColor: theme.colors.primary,
                            width: 10,
                        }}
                    />
                </View>
                {/* list */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.padding,
                    }}
                    data={dummyData.continueWatching}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    navigation.navigate("MovieDetail", {
                                        selectedMovie: item,
                                    })
                                }
                            >
                                <View
                                    style={{
                                        marginLeft:
                                            index == 0 ? SIZES.padding : 20,
                                        marginRight:
                                            index ==
                                            dummyData.continueWatching.length -
                                                1
                                                ? SIZES.padding
                                                : 0,
                                    }}
                                >
                                    {/* thumbnail */}
                                    <Image
                                        source={item.thumbnail}
                                        resizeMode="cover"
                                        style={{
                                            width: SIZES.width / 3,
                                            height: SIZES.width / 3 + 60,
                                            borderRadius: 20,
                                        }}
                                    />
                                    {/* name */}
                                    <Text
                                        style={{
                                            color: theme.colors.white,
                                            marginTop: SIZES.base,
                                            ...SIZES.h4,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    {/* progressbar */}
                                    <ProgressBar
                                        containerStyle={{
                                            marginTops: SIZES.radius,
                                        }}
                                        barStyle={{
                                            height: 3,
                                        }}
                                        barPercentage={item.overallProgress}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    }}
                />
            </View>
        );
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.colors.black,
            }}
        >
            {/* start of content */}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 250,
                }}
            >
                {renderNewSessionSection()}
                {renderDots()}
                {renderContinueWatchingSection()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
