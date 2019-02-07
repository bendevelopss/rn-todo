import {
  createStackNavigator,
  createDrawerNavigator,
  DrawerItems
} from "react-navigation";
import HomeScreen from "../../screens/home";

import Login from "../../screens/login";
import DrawerComponent from "../../components/drawer";
import COLOR from "./styles";

export const LoginStack = createStackNavigator({
  Login: {
    screen: Login
  }
});

export const MainStack = createDrawerNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: "Home",
    contentComponent: DrawerComponent,
    contentOptions: {
      activeTintColor: COLOR.PANTOME
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);
