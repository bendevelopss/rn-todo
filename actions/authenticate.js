import { AsyncStorage } from "react-native";
// import { DATA_SESSION } from "../config/global";
import axios from "axios";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESTORE_SESSION,
  RESTORE_REQUEST,
  RESTORE_FAILED
} from "../config/action-type/type";
// import baseUrl from "../utilities/global";

export function login(email, password) {
  return async dispatch => {
    // dispatch(loginRequest());
    const data = { email: email.trim(), password: password };
    try {
      const response = await axios.post(`${baseUrl}/login`, data);
      console.log(response);
      if (response.status == 200) {
        const session = { token: response.data.data.token, email: email };
        await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(session));
        // dispatch(loginSuccess(session));
      } 
    //   else dispatch(loginFailed("Authentication Failed"));
    } catch (err) {
        console.log(err);
    }
  };
}
