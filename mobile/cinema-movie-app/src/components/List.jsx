import React from "react";
import PropTypes from "prop-types";
import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
import { withTheme } from "../../constants";
import Text from "./Text";

const propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  subtitle: PropTypes.string,
  onViewAllPress: PropTypes.func,
  title: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
};

const defaultProps = {
  data: [],
  subtitle: null,
  onViewAllPress: null,
};

const List = ({
  data,
  title,
  theme,
  subtitle,
  renderItem,
  keyExtractor,
  onViewAllPress,
}) => {
  const { textContainer, containerContentStyle } = styles;

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={textContainer}>
        <View style={{ flex: 1 }}>
          <Text color={theme.primaryColor} large>
            {title}
          </Text>
          {subtitle && <Text small>{subtitle}</Text>}
        </View>
        {onViewAllPress && (
          <View>
            <TouchableOpacity
              onPress={onViewAllPress}
              style={{ paddingVertical: 5 }}
            >
              <Text small>View all</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <FlatList
        data={data}
        horizontal
        renderItem={renderItem}
        style={{ marginTop: 10 }}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={containerContentStyle}
        ItemSeparatorComponent={() => <View style={{ marginEnd: 20 }} />}
      />
    </View>
  );
};

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default withTheme(List);

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  containerContentStyle: {
    paddingLeft: 16,
    paddingRight: 6,
  },
});
