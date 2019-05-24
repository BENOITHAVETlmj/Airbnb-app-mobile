import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator
} from "react-native";

import Icon from "react-native-vector-icons/Entypo";
import Map from "../Components/Map";
import axios from "axios";

export default class Offerdetails extends React.Component {
  state = {
    room: {},
    isLoading: true
  };

  handleOnPress = () => {
    this.props.navigation.navigate("List");
  };

  async componentDidMount() {
    const id = this.props.navigation.state.params.id;
    const response = await axios.get(
      `https://airbnb-api.now.sh/api/room/${id}`
    );
    console.log("response", response.data);
    this.setState({
      room: response.data,
      isLoading: false
    });
  }
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

  render() {
    console.log("yoooooo", this.state.room.loc);

    if (this.state.isLoading === true) {
      return <ActivityIndicator size="large" color="red" />;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.topbar}>
            <Icon
              name="back"
              size={30}
              style={styles.logo}
              onPress={this.handleOnPress}
            />
            <Text
              style={{
                color: "#ffff",
                fontSize: 25,
                marginTop: 23
              }}
            >
              Appartement
            </Text>
          </View>
          <ImageBackground
            style={{ width: 400, height: 300 }}
            source={{ uri: this.state.room.photos[0] }}
          >
            <Text style={styles.boxprice}>
              <Text style={styles.price}>{this.state.room.price} €</Text>
            </Text>
          </ImageBackground>
          <ScrollView style={styles.container}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginVertical: 10,
                marginBottom: 20
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={1}>
                  {this.state.room.title}
                </Text>
                {this.renderStars(this.state.room)}
              </View>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 70 / 2
                }}
                source={{ uri: this.state.room.user.account.photos[0] }}
              />
            </View>
            <Text style={styles.description} numberOfLines={3}>
              {this.state.room.description}
            </Text>
            <Map location={this.state.room.loc} title={this.state.room.title} />
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    paddingHorizontal: 25
  },
  topbar: {
    height: 100,
    backgroundColor: "#ff5960",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  logo: {
    color: "#fff",
    position: "absolute",
    top: 50,
    left: 0,
    paddingLeft: 10
  },
  bottomcontainer: {
    padding: 20
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
    marginBottom: 15,
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
  },
  description: {
    fontSize: 20,
    fontWeight: "200"
  }
});
