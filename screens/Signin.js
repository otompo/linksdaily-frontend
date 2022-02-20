import React, { useState, useContext } from "react";
import { View } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { API } from "../config";
import axios from "axios";
import { AuthContext } from "../context/auth";

function Signin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // context
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const { data } = await axios.post(`/api/signin`, {
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
      } else {
        // console.log(data);
        // set save in context
        setState(data);
        // save response in async storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setEmail("");
        setPassword("");
        setLoading(false);
        alert("Signin successfull");
        // redirect
        navigation.navigate("Home");
      }
    } catch (err) {
      alert("Signup failed, try again");
      console.log(err.data);
      setLoading(false);
    }
  };
  // const loadFromAsyncStorage = async () => {
  //   let data = await AsyncStorage.getItem("@auth");
  //   console.log("FROM ASYNC STORAGE", data);
  // };
  // loadFromAsyncStorage();
  return (
    <KeyboardAwareScrollView
      // extraScrollHeight={100} // (when scroll)to have extra height between keyboard and text input
      enableOnAndroid={true}
      // extraHeight={80} // make some height so the keyboard wont cover other component
      contentContainerStyle={{ flexGrow: 1 }} // make the scrollView full screen
    >
      <View style={{ marginVertical: 100 }}>
        <CircleLogo />
        <Text title center large color="#333">
          Sign In
        </Text>
        <UserInput
          name="EMAIL"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="PASSWORD"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
        <SubmitButton
          title="Sign In"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text small center>
          Not yet registered?{" "}
          <Text onPress={() => navigation.navigate("Signup")} color="#ff0000">
            Sign Up
          </Text>
        </Text>
        <Text
          onPress={() => navigation.navigate("ForgotPassword")}
          small
          center
          color="orange"
          style={{ marginTop: 15 }}
        >
          Forgot Password?
        </Text>
        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Signin;
