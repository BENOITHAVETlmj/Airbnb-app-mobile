import React from "react";
import { Button, StyleSheet, Text, AsyncStorage } from "react-native";
import { Location, Permissions, MapView } from "expo";
import Icon from "react-native-vector-icons/Entypo";

class MapScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null
  };
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
      />
    );
  }
}

export default MapScreen;
