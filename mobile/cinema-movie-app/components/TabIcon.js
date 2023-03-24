import React from "react";

import { theme } from "../constants/theme";
import { View, Image } from "react-native";

const TabIcon = ({ focused, icon }) => {
    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused
                        ? theme.colors.primary
                        : theme.colors.gray,
                }}
            />
        </View>
    );
};

export default TabIcon;
