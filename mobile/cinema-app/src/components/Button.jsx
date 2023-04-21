import { Animated, StyleSheet, Text, View } from "react-native";
import React from "react";

const Button = ({ style, title, onPress }) => {
    return (
        <View style={styles.container}>
            <Animated.Button style={style} onPress={onPress}>
                {title}
            </Animated.Button>
        </View>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
});
