import Login from "./containers/Login";
import MonAirbnb from "./containers/MonAirbnb";
import AuthLoadingScreen from "./containers/AuthLoadingScreen";
import Offerdetails from "./containers/Offerdetails";
import TabNavigator from "./containers/TabNavigator";
import { StatusBar } from "react-native";

StatusBar.setBarStyle("light-content");

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

const ListStack = createStackNavigator(
  { Tab: TabNavigator, List: MonAirbnb, Offer: Offerdetails },
  { headerMode: "none" }
);
const AuthStack = createStackNavigator({
  Login: Login
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      List: ListStack,
      Authentication: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
