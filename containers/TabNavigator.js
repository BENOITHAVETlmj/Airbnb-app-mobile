import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import MonAirbnb from "./MonAirbnb";
import MapScreen from "./MapScreen";
import Icon from "react-native-vector-icons/Entypo";

const TabNavigator = createBottomTabNavigator(
  {
    List: MonAirbnb,
    Map: MapScreen
    // Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case "List":
            iconName = "home";

            break;
          case "Settings":
            iconName = "settings";

            break;
          case "Map":
            iconName = "map";

            break;
          default:
            iconName = null;
        }

        return (
          <Icon
            name={iconName}
            size={20}
            color={tintColor}
            style={{ marginTop: 10 }}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle;

  switch (routeName) {
    case "MonAirbnb":
      headerTitle = "Page d'accueil";
      break;
    case "Settings":
      headerTitle = "Paramètres";
      break;
    default:
      headerTitle = routeName;
  }

  return {
    headerTitle
  };
};

export default TabNavigator;
