import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Platform,
} from "react-native";
import { ProgressBar } from "../../components/index";
import { SIZES, icons } from "../../constants";
import { theme } from "../../constants/theme";

const MovieDetail = ({ navigation, route }) => {
    const [selectedMovie] = React.useState(route.params.selectedMovie);
    console.log(selectedMovie);

    function renderHeaderBar() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: Platform.OS === "ios" ? 40 : 20,
                    paddingHorizontal: SIZES.padding,
                }}
            >
                {/* back */}
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50,
                        borderRadius: 20,
                        backgroundColor: theme.colors.transparentBlack,
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.left_arrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: theme.colors.white,
                        }}
                    />
                </TouchableOpacity>

                {/* share */}
                <TouchableOpacity
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 50,
                        height: 50,
                        borderRadius: 20,
                        backgroundColor: theme.colors.transparentBlack,
                    }}
                    onPress={() => console.log("Shared")}
                >
                    <Image
                        source={icons.upload}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: theme.colors.white,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    function renderHeaderSection() {
        return (
            <ImageBackground
                source={selectedMovie?.details?.image}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height:
                        SIZES.height < 700
                            ? SIZES.height * 0.6
                            : SIZES.height * 0.7,
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    {renderHeaderBar()}
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "flex-end",
                        }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            colors={["transparent", "black"]}
                            style={{
                                width: "100%",
                                height: 150,
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            {/* season */}
                            <Text
                                style={{
                                    color: theme.colors.white,
                                    ...SIZES.body4,
                                }}
                            >
                                {selectedMovie?.details?.season}
                            </Text>

                            {/* name */}
                            <Text
                                style={{
                                    color: theme.colors.white,
                                    ...SIZES.h1,
                                    marginTop: SIZES.base,
                                }}
                            >
                                {selectedMovie?.name}
                            </Text>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        );
    }

    function renderCategory() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginTop: SIZES.base,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* age */}
                <View style={[styles.categoryContainer, { marginLeft: 0 }]}>
                    <Text
                        style={{
                            color: theme.colors.white,
                            ...SIZES.h4,
                        }}
                    >
                        {selectedMovie?.details?.age}
                    </Text>
                </View>

                {/* genre */}
                <View
                    style={[
                        styles.categoryContainer,
                        { paddingHorizontal: SIZES.padding },
                    ]}
                >
                    <Text
                        style={{
                            color: theme.colors.white,
                            ...SIZES.h4,
                        }}
                    >
                        {selectedMovie?.details?.genre}
                    </Text>
                </View>
                {/* rating */}
                <View style={styles.categoryContainer}>
                    <Image
                        source={icons.star}
                        resizeMode="contain"
                        style={{
                            width: 15,
                            height: 15,
                        }}
                    />
                    <Text
                        style={{
                            marginLeft: SIZES.base,
                            color: theme.colors.white,
                            ...SIZES.h4,
                        }}
                    >
                        {selectedMovie?.details?.ratings}
                    </Text>
                </View>
            </View>
        );
    }

    function renderMovieDetail() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.padding,
                    justifyContent: "space-around",
                }}
            >
                {/* title , running time and progressbar */}
                <View>
                    {/* title */}
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        <Text
                            style={{
                                flex: 1,
                                color: theme.colors.white,
                                ...SIZES.h4,
                            }}
                        >
                            {selectedMovie?.details?.currentEpisode}
                        </Text>
                        <Text
                            style={{
                                color: theme.colors.lightGray,
                                ...SIZES.body4,
                            }}
                        >
                            {selectedMovie?.details?.runningTime}
                        </Text>
                    </View>
                    {/* progressbar */}
                    <ProgressBar
                        containerStyle={{ marginTop: SIZES.radius }}
                        barStyle={{ height: 5, borderRadius: 3 }}
                        barPercentage={selectedMovie?.details?.progress}
                    />
                </View>

                {/* button */}
                <TouchableOpacity
                    style={{
                        height: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom:
                            Platform.OS === "ios" ? SIZES.padding * 2 : 0,
                        backgroundColor: theme.colors.primary,
                        borderRadius: 15,
                    }}
                >
                    <Text
                        style={{
                            color: theme.colors.white,
                            ...SIZES.h2,
                        }}
                    >
                        {selectedMovie?.details?.progress === "0%"
                            ? "Watch Now"
                            : "Continue Watching"}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                backgroundColor: theme.colors.black,
            }}
            style={{ backgroundColor: theme.colors.black }}
        >
            {/* header */}
            {renderHeaderSection()}
            {/* category&ratings */}
            {renderCategory()}

            {/* themoviedetails */}
            {renderMovieDetail()}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: SIZES.base,
        paddingHorizontal: SIZES.base,
        paddingVertical: 3,
        borderRadius: SIZES.base,
        backgroundColor: theme.colors.gray1,
    },
});

export default MovieDetail;