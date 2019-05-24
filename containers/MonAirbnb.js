import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  AsyncStorage,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/Entypo";

class MonAirbnb extends React.Component {
  state = {
    rooms: [],
    isLoading: true
  };

  handleOnPress = id => {
    this.props.navigation.navigate("Offer", { id: id });
  };

  LogOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Authentication");
  };

  renderStars(item) {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < item.ratingValue) {
        stars.push(<Icon key={i} name="star" size={30} color="gold" />);
      } else {
        stars.push(<Icon key={i} name="star" size={30} color="grey" />);
      }
    }
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {stars}
        <Text style={styles.reviews}>{item.reviews} reviews</Text>
      </View>
    );
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room?city=paris"
    );

    this.setState({
      rooms: response.data.rooms
    });
  }

  render() {
    if (this.state.rooms === null) {
      return <ActivityIndicator size="large" color="red" />;
    } else {
      return (
        <ScrollView style={styles.container}>
          <View>
            <View style={styles.topbar}>
              <Text style={{ color: "#ffff", marginTop: 20, fontSize: 30 }}>
                MonAirbnb
              </Text>
            </View>

            <Button title="Déconnexion" onPress={this.LogOut} />

            <View style={styles.rooms}>
              <FlatList
                data={this.state.rooms}
                keyExtractor={item => String(item._id)}
                renderItem={({ item }) => (
                  <>
                    <TouchableOpacity
                      style={styles.box}
                      onPress={() => this.handleOnPress(item._id)}
                    >
                      <ScrollView horizontal={true}>
                        <ImageBackground
                          style={{ width: 400, height: 200 }}
                          source={{ uri: item.photos[0] }}
                        >
                          <Text style={styles.boxprice}>
                            <Text style={styles.price}>{item.price} €</Text>
                          </Text>
                        </ImageBackground>
                      </ScrollView>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          marginVertical: 10,
                          borderBottomColor: "grey",
                          borderBottomWidth: 1,
                          marginBottom: 20
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.title} numberOfLines={1}>
                            {item.title}
                          </Text>
                          {this.renderStars(item)}
                        </View>
                        <Image
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 70 / 2,
                            marginBottom: 10
                          }}
                          source={{ uri: item.user.account.photos[0] }}
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              />
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff"
  },
  topbar: {
    height: 100,
    backgroundColor: "#ff5960",
    alignItems: "center",
    justifyContent: "center"
  },
  rooms: {
    paddingHorizontal: 20
  },
  price: {
    color: "#ffff",
    fontSize: 30
  },
  boxprice: {
    backgroundColor: "black",
    width: 100,
    height: 50,
    padding: 8,
    textAlign: "center",
    marginBottom: 5,
    marginLeft: 3,
    position: "absolute",
    bottom: 0,
    left: 0
  },
  title: {
    fontSize: 18,
    marginVertical: 10
  },
  reviews: {
    fontSize: 18,
    color: "grey",
    flexDirection: "row",
    marginVertical: 10
  }
});
export default MonAirbnb;
