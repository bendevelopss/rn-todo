<script src="http://localhost:8097" />;
import React, { Component } from "react";
import { View, Text, Button, icon } from "react-native";
// import Root from "./screens/root";
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import HomeScreen from "./screens/home";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/register";

import Icon from "react-native-vector-icons/Ionicons";

/**
 * - AppSwitchNavigator
 *    - WelcomeScreen
 *      - Login Button
 *      - Sign Up Button
 *    - AppDrawerNavigator
 *          - Dashboard - DashboardStackNavigator(needed for header and to change the header based on the                     tab)
 *            - DashboardTabNavigator
 *              - Tab 1 - FeedStack
 *              - Tab 2 - ProfileStack
 *              - Tab 3 - SettingsStack
 *            - Any files you don't want to be a part of the Tab Navigator can go here.
 */

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Login"
          onPress={() => this.props.navigation.push('Dashboard')}
        />
        <Button title="Sign Up" onPress={() => alert('button pressed')} />
      </View>
    );
  }
}



// const DashboardTabNavigator = createBottomTabNavigator(
//   {
//     HomeScreen,
//     LoginScreen
//   },
//   {
//     navigationOptions: ({ navigation }) => {
//       const { routeName } = navigation.state.routes[navigation.state.index];
//       return {
//         headerTitle: routeName
//       };
//     }
//   }
// );

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: HomeScreen
    // DashboardTabNavigator: LoginScreen,
    //     LoginScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="ios-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen
  },
  { backBehavior: "yes" } //drawer options
);

const AppSwitchNavigator = createSwitchNavigator({
  Dashboard: { screen: LoginScreen },
  Register: { screen: RegisterScreen }
});

const AppContainer = createAppContainer(AppSwitchNavigator);
