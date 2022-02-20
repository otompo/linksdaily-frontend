import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext, useEffect } from "react";
import { View } from "react-native";
import Text from "@kaloraat/react-native-text";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { AuthContext } from "../context/auth";

function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // context
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post(`/api/signup`, {
        name,
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
      } else {
        setState(data);
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        setEmail("");
        setName("");
        setPassword("");
        setLoading(false);
        alert("Signup successfull");
        navigation.navigate("Home");
      }
    } catch (err) {
      alert("Signup failed, try again");
      console.log(err);
      setLoading(false);
    }
  };

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
          Sign Up
        </Text>
        <UserInput
          name="NAME"
          value={name}
          setValue={setName}
          autoCapitalize="words"
          autoCorrect={false}
        />
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
          title="Sign Up"
          handleSubmit={handleSubmit}
          loading={loading}
        />
        <Text center>
          Already Joined?{" "}
          <Text onPress={() => navigation.navigate("Signin")} color="#ff0000">
            Sign In
          </Text>
        </Text>
        {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

export default Signup;
