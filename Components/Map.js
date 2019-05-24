import React from "react";
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { MapView, Location, Permissions } from "expo";
import Icon from "react-native-vector-icons/Entypo";

class Map extends React.Component {
  state = {
    location: null,
    erroMessage: null
  };
  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "La géolocalisation ne fonctionne pas sur le simulateur Android, tu peux tester sur ton device !"
      });
    } else {
      this.getLocationAsync();
    }
  }
  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission refusée"
      });
    } else {
      const location = await Location.getCurrentPositionAsync({});

      this.setState({
        location
      });
    }
  };
  render() {
    console.log("prop here", this.props.location);
    if (this.state.location !== null) {
      return (
        <View style={{ paddingVertical: 30 }}>
          <MapView
            showsUserLocation={true}
            style={{ flex: 1, height: 300 }}
            initialRegion={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: this.props.location[1],
                longitude: this.props.location[0]
              }}
              title={this.props.title}
            >
              <Icon
                name="location-pin"
                size={30}
                color="#ff5960"
                onPress={this.handleOnPress}
              />
            </MapView.Marker>
          </MapView>
        </View>
      );
    } else {
      return null;
    }
  }
}

export default Map;
