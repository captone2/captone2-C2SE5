import { Provider } from "react-native-paper";
import { theme } from "./constants/theme";
import Navigation from "./navigations/index";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBack: require("./assets/fonts/Roboto-Black.ttf"),
    RobotoBackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoBoldItallic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
    ...FontAwesome.font,
  });
  return (
    <Provider theme={theme}>
      {!loaded && <SplashScreen />}
      {loaded && <Navigation />}
    </Provider>
  );
}
