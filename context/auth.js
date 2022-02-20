import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../config";
import { useNavigation } from "@react-navigation/native";

// initial state

// create context
const AuthContext = createContext([{}, function () {}]);

// context provider
const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    token: "",
  });
  // navigation
  const navigation = useNavigation();
  // config axios
  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // handle expired token or 401 error
  axios.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function (error) {
      // force logout user
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        await AsyncStorage.removeItem("@auth");
        setState({ user: null, token: "" });
        navigation.navigate("Signin");
      }
    }
  );

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const as = JSON.parse(data);
      setState({ ...state, user: as.user, token: as.token });
    };
    loadFromAsyncStorage();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
