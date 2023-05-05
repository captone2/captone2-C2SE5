import {
  NavigationContext,
  NavigationScreenProp,
  NavigationRoute,
  NavigationParams,
} from "react-navigation";
import { useContext } from "react";

const useNavigation = () => {
  return useContext(NavigationContext) as NavigationScreenProp<
    NavigationRoute,
    NavigationParams
  >;
};
