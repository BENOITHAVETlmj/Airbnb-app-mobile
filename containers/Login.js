import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import axios from "axios";

class Login extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  state = {
    email: "",
    password: "",
    token: ""
  };

  signIn = async () => {
    console.log("SignIn Called");
    const response = await axios.post(
      "https://airbnb-api.now.sh/api/user/log_in",
      {
        email: this.state.email,
        password: this.state.password
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // console.log(response.data);
    this.setState({
      token: response.data.token
    });
    this.signInStorage();
  };

  signInStorage = async () => {
    await AsyncStorage.setItem("userToken", this.state.token);
    this.props.navigation.navigate("List");
    console.log("yooooo-----", this.state);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.container}>
            <Icon name="home" size={120} style={styles.logo} />
            <Text style={styles.welcome}>Welcome</Text>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              style={styles.email}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="password"
              secureTextEntry={true}
              style={styles.password}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />

            <TouchableOpacity
              style={styles.submit}
              onPress={() => this.signIn()}
            >
              <Text style={styles.textbutton}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff5960",
    alignItems: "center",
    justifyContent: "center"
  },
  email: {
    width: 300,
    marginBottom: 30,
    borderBottomColor: "#ffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 20,
    padding: 12,
    marginBottom: 15,
    color: "#ffff"
  },
  password: {
    width: 300,
    marginBottom: 30,
    borderBottomColor: "#ffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 20,
    padding: 12,
    color: "#ffff",
    marginBottom: 15
  },
  welcome: {
    fontSize: 50,
    color: "#ffff",
    marginBottom: 50
  },
  logo: { color: "#ffff", marginTop: 50 },
  submit: {
    marginTop: 40,
    backgroundColor: "#ffff",
    width: 150,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30
  },
  textbutton: {
    fontSize: 25,
    color: "#ff5960"
  }
});
export default Login;
