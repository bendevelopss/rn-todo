import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import bgImage from "../images/235194710-elementary-os-wallpapers-pack.jpg";
import logo from "../images/logo.png";
import Icon from "react-native-vector-icons/Ionicons";
import { postLogin } from "../utilities/api";

const { width: WIDTH } = Dimensions.get("window");

export default class LoginScreen extends Component {
  static navigationOptions = { title: "", header: null };
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      username: "",
      password: "",
      showProgress: false,
      error: ""
    };
    console.log(this.props);
  }

  msgAlert = () => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

  async login() {
    await this.setState({ showProgress: true });
    await this.setState({ error: "" });
    console.log(this.state);

    const loginData = {
      username: this.state.username,
      password: this.state.password
    };
    try {
      const response = await postLogin(loginData);
      console.log(response);
      if (response) {
        await AsyncStorage.setItem("token", response);
        await this.setState({ showProgress: false });
      }
      console.log(1, AsyncStorage.getItem("token"));
    } catch (err) {
      console.log(err);
      if (err.status != 200) {
        await this.setState({ error: err.message });
        await this.setState({ showProgress: false });
      }
    }
  }

  showPass = () => {
    if (!this.state.press) this.setState({ showPass: false, press: true });
    else this.setState({ showPass: true, press: false });
  };

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>REACT TODO</Text>

          <Text style={styles.error}>{this.state.error}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon
            style={styles.inputIcon}
            name={"ios-person"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
          />
          <TextInput
            placeholder={"Username"}
            value={this.state.username}
            onChangeText={value => this.setState({ username: value })}
            style={styles.input}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            style={styles.inputIcon}
            name={"ios-lock"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
          />
          <TextInput
            placeholder={"Password"}
            value={this.state.password}
            onChangeText={value => this.setState({ password: value })}
            style={styles.input}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity
            onPress={this.showPass.bind(this)}
            style={styles.btnEye}
          >
            <Icon
              name={!this.state.press ? "ios-eye" : "ios-eye-off"}
              size={26}
              color={"rgba(255,255,255, 0.7)"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btnLogin}
          onPress={this.login.bind(this)}
          disabled={
            this.state.username == "" && this.state.password == ""
              ? true
              : false
          }
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        {this.state.showProgress ? (
          <ActivityIndicator
            size="large"
            color="#a6cfdc"
            style={styles.activityIndicator}
          />
        ) : (
          <Text />
        )}

        <Text
          style={styles.signupText}
          onPress={() => {
            this.props.navigation.navigate("Register");
          }}
        >
          No Account? Sign Up
        </Text>
      </ImageBackground>
    );
  }
}

// export default connect(
//   state => ({state: state.authenticate}),
//   dispatch => ({
//     actions: bindActionCreators(authActions, dispatch)
//   })
// )(Login)

const styles = StyleSheet.create({
  loader: {
    marginTop: 0
  },
  signupText: {
    color: "#e5e5e5",
    fontSize: 15
  },
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 120,
    height: 120
  },
  logoContainer: {
    alignItems: "center"
    // marginBottom: 20
  },
  logoText: {
    color: "#e5e5e5",
    fontSize: 45,
    fontWeight: "900",
    marginTop: 0
  },
  input: {
    width: WIDTH - 55,
    height: 38,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(0,0,0,0.35)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25
  },
  inputContainer: {
    marginTop: 10
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 37
  },
  logo: {
    width: 200,
    height: 250
  },
  btnEye: {
    position: "absolute",
    top: 8,
    right: 37
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 20
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center"
  },
  error: {
    color: "#e50000",
    fontWeight: "bold",
    fontSize: 18
    // marginBottom: 35
  },
  activityIndicator: {
    marginTop: 25
  }
});
