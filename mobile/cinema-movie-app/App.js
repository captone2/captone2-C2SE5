import Navigation from "./navigations/index";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { MovieContext } from "./utils/Context";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "react-native";

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
        <MovieContext>
            <StripeProvider publishableKey="pk_test_51JEFpUSByXQZwLeJlP8yozoVPaknL6iXC2LgEAdRbtzAdrjrAjwdtWLblrx1iu5eP5mBeRVOCkHtPOkDYWSUTksZ00h0vpZ2Cg">
                {!loaded && <SplashScreen />}
                {loaded && <Navigation />}
                <StatusBar style="auto" />
            </StripeProvider>
        </MovieContext>
    );
}
