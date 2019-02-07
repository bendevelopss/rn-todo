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
  AsyncStorage,
  Alert
} from "react-native";

import bgImage from "../images/235194710-elementary-os-wallpapers-pack.jpg";
import logo from "../images/logo.png";
import Icon from "react-native-vector-icons/Ionicons";
import { postRegister } from "../utilities/api";

const { width: WIDTH } = Dimensions.get("window");

export default class RegisterScreen extends Component {
  // static navigationOptions = { title: "Welcome", header: null };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      showProgress: false,
      error: ""
    };
  }

  msgAlert = (msg) => {
    Alert.alert(
      // title,
      msg,
      [
        {
          text: "Okay",
          onPress: () =>  this.props.navigation.goBack()
        }
      ],
      { cancelable: false }
    );
  };

  async register() {
    await this.setState({ showProgress: true });
    await this.setState({ error: "" });
    console.log(this.state);

    const registerData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.confirmPassword
    };
    console.log(registerData);

    try {
      const response = await postRegister(registerData);
      console.log(response);
      if (response.token) {
        await this.msgAlert.bind(this, 'Register Successful')
        await this.setState({ showProgress: false });
      }
    } catch (err) {
      console.log(err);
      if (err.status != 200) {
        await this.setState({ error: err.message });
        await this.setState({ showProgress: false });
      }
    }
  }

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>REGISTER</Text>

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
            name={"ios-person"}
            size={28}
            color={"rgba(255,255,255,0.7)"}
          />
          <TextInput
            placeholder={"E-mail"}
            value={this.state.email}
            onChangeText={value => this.setState({ email: value })}
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
            secureTextEntry={true}
            onChangeText={value => this.setState({ password: value })}
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
            placeholder={"Confirm Password"}
            value={this.state.confirmPassword}
            secureTextEntry={true}
            onChangeText={value => this.setState({ confirmPassword: value })}
            style={styles.input}
            placeholderTextColor={"rgba(255,255,255,0.7)"}
            underlineColorAndroid="transparent"
          />
        </View>

        <TouchableOpacity
          style={styles.btnLogin}
          onPress={this.register.bind(this)}
          disabled={
            this.state.username == "" &&
            this.state.password == "" &&
            this.state.email
              ? true
              : false
          }
        >
          <Text style={styles.text}>Register</Text>
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
