import React, { FC, ReactNode } from "react";
import { ScrollView, SafeAreaView } from "react-native";

type ContainerProps = {
  theme: any;
  onScroll: (x: number) => {};
  children: ReactNode;
  transparency: boolean;
};

const Container: FC<ContainerProps> = ({
  theme,
  onScroll,
  children,
  transparency,
}) => (
  <SafeAreaView
    style={{
      flex: 1,
      backgroundColor: !transparency ? theme.background : "rgba(0, 0, 0, 0.7)",
    }}
  >
    <ScrollView
      scrollEventThrottle={1}
      onScroll={({ nativeEvent }) => onScroll(nativeEvent.contentOffset.y)}
      style={{ flex: 1 }}
    >
      {children}
    </ScrollView>
  </SafeAreaView>
);

export default Container;
